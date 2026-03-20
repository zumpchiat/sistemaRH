<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $employees = [
    [
        'name' => 'Renan Silva',
        'cpf' => '30298426579', // Válido
        'role_id' => 1,
        'birth_date' => '1987-05-15',
        'email' => 'renan.dev@exemplo.com.br',
        'cep' => '21530000',
        'phone' => '21988887777',
        'street' => 'Rua General Mena Barreto',
        'number' => '150',
        'neighborhood' => 'Nilópolis',
        'city' => 'Nilópolis',
        'state' => 'RJ'
    ],
    [
        'name' => 'Ana Karla Sobral',
        'cpf' => '11017984751', // Válido
        'role_id' => 2,
        'birth_date' => '2005-10-20',
        'email' => 'ana.karla@jiujitsu.com',
        'cep' => '22750000',
        'phone' => '21977776666',
        'street' => 'Avenida das Américas',
        'number' => '500',
        'neighborhood' => 'Barra da Tijuca',
        'city' => 'Rio de Janeiro',
        'state' => 'RJ'
    ],
    [
        'name' => 'Marcos Carneiro',
        'cpf' => '66117158785', // Válido
        'role_id' => 3,
        'birth_date' => '1980-03-12',
        'email' => 'marcos.c@academia.com',
        'cep' => '20270001',
        'phone' => '2133221100',
        'street' => 'Rua São Francisco Xavier',
        'number' => '20',
        'neighborhood' => 'Maracanã',
        'city' => 'Rio de Janeiro',
        'state' => 'RJ'
    ],
    [
        'name' => 'Monique Silva',
        'cpf' => '09491196600', // Válido
        'role_id' => 2,
        'birth_date' => '1992-07-25',
        'email' => 'monique.coach@exemplo.com',
        'cep' => '21040000',
        'phone' => '21999881122',
        'street' => 'Rua Uranos',
        'number' => '1020',
        'neighborhood' => 'Bonsucesso',
        'city' => 'Rio de Janeiro',
        'state' => 'RJ'
    ],
    [
        'name' => 'Carlos Alberto',
        'cpf' => '72410453350', // Válido
        'role_id' => 4,
        'birth_date' => '1975-11-30',
        'email' => 'carlos.beto@empresa.com',
        'cep' => '01310000',
        'phone' => '11912345678',
        'street' => 'Avenida Paulista',
        'number' => '1000',
        'neighborhood' => 'Bela Vista',
        'city' => 'São Paulo',
        'state' => 'SP'
    ],
    [
        'name' => 'Juliana Mendes',
        'cpf' => '27213777793', // Válido
        'role_id' => 1,
        'birth_date' => '1995-01-05',
        'email' => 'juliana.m@ti.com.br',
        'cep' => '30140000',
        'phone' => '31988776655',
        'street' => 'Rua da Bahia',
        'number' => '450',
        'neighborhood' => 'Lourdes',
        'city' => 'Belo Horizonte',
        'state' => 'MG'
    ],
    [
        'name' => 'Ricardo Santos',
        'cpf' => '22414946407', // Válido
        'role_id' => 5,
        'birth_date' => '1988-08-18',
        'email' => 'ricardo.s@logistica.com',
        'cep' => '70040000',
        'phone' => '6133445566',
        'street' => 'SBN Quadra 2',
        'number' => 'S/N',
        'neighborhood' => 'Asa Norte',
        'city' => 'Brasília',
        'state' => 'DF'
    ],
    [
        'name' => 'Fernanda Lima',
        'cpf' => '38371731353', // Válido
        'role_id' => 3,
        'birth_date' => '1990-12-12',
        'email' => 'fernanda.lima@rh.com',
        'cep' => '80010000',
        'phone' => '41999001122',
        'street' => 'Rua XV de Novembro',
        'number' => '300',
        'neighborhood' => 'Centro',
        'city' => 'Curitiba',
        'state' => 'PR'
    ],
    [
        'name' => 'Paulo Souza',
        'cpf' => '44537800364', // Válido
        'role_id' => 4,
        'birth_date' => '1982-04-22',
        'email' => 'paulo.souza@vendas.com',
        'cep' => '40010000',
        'phone' => '7133224455',
        'street' => 'Avenida Sete de Setembro',
        'number' => '88',
        'neighborhood' => 'Vitória',
        'city' => 'Salvador',
        'state' => 'BA'
    ],
    [
        'name' => 'Beatriz Rocha',
        'cpf' => '42715564163', // Válido
        'role_id' => 2,
        'birth_date' => '1998-09-09',
        'email' => 'beatriz.rocha@design.com',
        'cep' => '60010000',
        'phone' => '85988771122',
        'street' => 'Rua Major Facundo',
        'number' => '55',
        'neighborhood' => 'Centro',
        'city' => 'Fortaleza',
        'state' => 'CE'
    ],
    [
        'name' => 'Lucas Oliveira',
        'cpf' => '62241203823', // Válido
        'role_id' => 1,
        'birth_date' => '1993-02-28',
        'email' => 'lucas.o@suporte.com',
        'cep' => '90010000',
        'phone' => '5132214455',
        'street' => 'Rua dos Andradas',
        'number' => '1200',
        'neighborhood' => 'Centro Histórico',
        'city' => 'Porto Alegre',
        'state' => 'RS'
    ],
    [
        'name' => 'Mariana Costa',
        'cpf' => '40291103200', // Válido
        'role_id' => 5,
        'birth_date' => '1985-06-14',
        'email' => 'mariana.costa@financeiro.com',
        'cep' => '50010000',
        'phone' => '81977665544',
        'street' => 'Rua da Aurora',
        'number' => '210',
        'neighborhood' => 'Boa Vista',
        'city' => 'Recife',
        'state' => 'PE'
    ],
    [
        'name' => 'Tiago Ferreira',
        'cpf' => '86445095003', // Válido
        'role_id' => 3,
        'birth_date' => '1989-10-10',
        'email' => 'tiago.f@operacoes.com',
        'cep' => '29010000',
        'phone' => '2733221199',
        'street' => 'Avenida Jerônimo Monteiro',
        'number' => '100',
        'neighborhood' => 'Centro',
        'city' => 'Vitória',
        'state' => 'ES'
    ],
    [
        'name' => 'Larissa Vieira',
        'cpf' => '08516310965', // Válido
        'role_id' => 4,
        'birth_date' => '1991-03-31',
        'email' => 'larissa.v@marketing.com',
        'cep' => '69010000',
        'phone' => '92988112233',
        'street' => 'Avenida Eduardo Ribeiro',
        'number' => '500',
        'neighborhood' => 'Centro',
        'city' => 'Manaus',
        'state' => 'AM'
    ],
    [
        'name' => 'André Martins',
        'cpf' => '83170424998', // Válido
        'role_id' => 1,
        'birth_date' => '1984-12-01',
        'email' => 'andre.m@infra.com',
        'cep' => '65010000',
        'phone' => '9832321122',
        'street' => 'Rua de Nazaré',
        'number' => '12',
        'neighborhood' => 'Centro',
        'city' => 'São Luís',
        'state' => 'MA'
    ]
];

      foreach ($employees as $data) {
    $fullAddress = sprintf(
        "%s, %s - %s, %s/%s",
        $data['street'], $data['number'], $data['neighborhood'], $data['city'], $data['state']
    );

    \App\Models\Employee::create([
        'name'       => $data['name'],
        'cpf'        => $data['cpf'],
        'role_id'    => $data['role_id'],
        'birth_date' => $data['birth_date'],
        'email'      => $data['email'],
        'cep'        => $data['cep'],
        'phone'      => $data['phone'],
        'address'    => $fullAddress,
    ]);
}
    }
}
