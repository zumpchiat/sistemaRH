<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
        ['name' => 'Analista de Sistemas', 'salary' => 5500.00],
        ['name' => 'Desenvolvedor Full Stack', 'salary' => 4800.00],
        ['name' => 'Gerente de Projetos', 'salary' => 8500.00],
        ['name' => 'Designer UI/UX', 'salary' => 4200.00],
        ['name' => 'Estagiário de TI', 'salary' => 1500.00],
    ];

    foreach ($roles as $role) {
        \App\Models\Role::create($role);
    }
    }
}
