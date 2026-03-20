<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

use App\Rules\Cpf;
use Carbon\Carbon;

class EmployeeController extends Controller
{

    public function index(Request $request)
    {
    $query = Employee::with('role');


    if ($request->filled('name') || $request->filled('cpf')) {
        
        $query->where(function($q) use ($request) {
            
            if ($request->filled('name')) {
                $q->where('name', 'like', '%' . $request->name . '%');
            }

         
            if ($request->filled('cpf')) {
                $cpfLimpo = preg_replace('/[^0-9]/', '', $request->cpf);
                $q->orWhere('cpf', 'like', '%' . $cpfLimpo . '%');
            }
        });
    }

    if ($request->filled('role_id')) {
        $query->where('role_id', $request->role_id);
    }

    
    $employees = $query->orderBy('name', 'asc')->paginate(100);


    
    $employees->transform(function ($employee) {
        if ($employee->address) {
            
            if (preg_match('/^(.*),\s(.*)\s-\s(.*),\s(.*)\/(.*)$/', $employee->address, $matches)) {
                $employee->street = $matches[1];
                $employee->number = $matches[2];
                $employee->neighborhood = $matches[3];
                $employee->city = $matches[4];
                $employee->state = $matches[5];
            }
        }
        return $employee;
    });

    return response()->json($employees);

    }

    private function validaETransforma(Request $request, $id = null)
    {
         $idadeMinima = Carbon::now()->subYears(16)->format('Y-m-d');

         $rules = [
        'name'         => 'required|string|max:255',
        'cpf'          => ['required', 'digits:11', "unique:employees,cpf,{$id}", new Cpf],
        'role_id'      => 'required|exists:roles,id',
        'birth_date'   => ['nullable', 'date', 'before_or_equal:' . $idadeMinima],
        'email'        => 'nullable|email',
        'cep'          => 'nullable|string|max:9', 
        'phone'        => 'nullable|string',
        'street'       => 'nullable|string',
        'number'       => 'nullable|string',
        'neighborhood' => 'nullable|string',
        'city'         => 'nullable|string',
        'state'        => 'nullable|string',
        ];

        $validated = $request->validate($rules);

        $fullAddress = null;

        if ($request->filled('street')) {
            $fullAddress = sprintf(
                "%s, %s - %s, %s/%s",
                $request->street,
                $request->number,
                $request->neighborhood,
                $request->city,
                $request->state
            );
        }

        unset($validated['street'], $validated['number'], $validated['neighborhood'], $validated['city'], $validated['state']);
    
        $validated['address'] = $fullAddress;


        return $validated;

    }

    public function store(Request $request)
    {
        $validated = $this->validaETransforma($request);
        $employee = Employee::create($validated);
        return response()->json($employee, 201);
    }

 
    public function show($id)
    {
       return Employee::with('role')->findOrFail($id);
    }

   
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $validated = $this->validaETransforma($request, $id);
        $employee->update($validated);
        return response()->json($employee);
    }



    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        return response()->json(['message' => 'Empregado deletado com sucesso!!!']);
    }


    public function report(Request $request)
    {
        $query = Employee::with('role');

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('role')) {
            $query->whereHas('role', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->role . '%');
            });
        }

        return $query->orderBy('name')->get();
    }
}
