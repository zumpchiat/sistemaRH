<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //use HasFactory;
protected $fillable = [
    'name', 'birth_date', 'address', 'cpf', 'email', 'cep', 'phone', 'role_id'
];
    public function role()
    {
        return $this->belongsTo(Role::class);
    }


}
