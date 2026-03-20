<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{

    private function validaETrasforma(Request $request, $id = null)
    {
        return $request->validate([            
            'name'   => 'required|string|max:255|unique:roles,name,' . $id,
            'salary' => 'required|numeric|min:0',
        ], [
            'salary.min' => 'O salário não pode ser um valor negativo.',
            'salary.numeric' => 'O salário deve ser um número válido.',
            'name.unique' => 'Este cargo já está cadastrado.'
        ]);
    }


    public function index(Request $request)
    {
        $query = Role::query();

        if($request->has('search')){
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->paginate(15));
    }


    public function store(Request $request)
    {   
        $validated = $this->validaETrasforma($request);
        $role = Role::create($validated);

        return response()->json($role, 201);
    }


    public function show($id)
    {
        $role = Role::findOrFail($id);

        return response()->json($role);
    }


    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $validated = $this->validaETrasforma($request, $id);
        $role->update($validated);

        return response()->json($role);
    }


    public function destroy($id)
    {
        $role = Role::findOrFail($id);

        if ($role->employees()->count() > 0) {
            return response()->json([
                'error' => 'Integridade Referencial',
                'message' => 'Não é possível excluir este cargo. Existem funcionários ativos vinculados a ele.',
                'count' => $role->employees()->count()
            ], 422);
        }

        $role->delete();
        
        return response()->json(['message' => 'Cargo deletado com sucesso!!'], 200);
    }
}
