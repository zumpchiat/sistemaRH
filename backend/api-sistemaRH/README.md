# 🚀 Sistema  de Gestão de RH - Desafio Técnico

Esta API foi desenvolvida em **Laravel** para gerenciar o cadastro de cargos e funcionários. O sistema conta com validações avançadas de integridade, busca dinâmica por múltiplos critérios e regras de negócio alinhadas à legislação brasileira.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Laravel Framework 8.77.1 
* **Banco de Dados:** MySQL 5.7.17 x86
* **Servidor Local:** EasyPHP / Apache 2.4.43 x64 / (PHP 7.4.27 x64)
* **Bibliotecas:** 
    * `Carbon`: Manipulação inteligente de datas.
    * `Custom Rules`: Validação matemática de CPF.
    * `Localization`: Mensagens de erro em Português do Brasil (pt-BR).

## 📋 Funcionalidades Principais

### 👤 Funcionários (Employees)
* **Cadastro Completo:** Nome, CPF, Data de Nascimento, E-mail, Telefone e Endereço.
* **Validação de CPF:** Implementação de regra customizada que valida os dígitos verificadores (algoritmo real).
* **Regra de Idade:** Validação inteligente que permite campo nulo (`nullable`), mas exige idade mínima de **16 anos** caso a data seja informada.
* **Tratamento de Endereço (Padrão DRY):** O sistema recebe campos desmembrados (`street`, `number`, `neighborhood`, `city`, `state`) e os persiste como uma string formatada única, otimizando a estrutura do banco de dados.

### 💼 Cargos (Roles)
* **CRUD Completo:** Gestão de nomes de cargos e faixas salariais.
* **Segurança Financeira:** Validação rigorosa que impede a inserção de salários negativos (`min:0`) e garante a unicidade do nome do cargo.
* **Integração:** Endpoint disponível para popular elementos `<select>` em formulários de frontend.

### 🔍 Filtros e Relatórios
Busca dinâmica no endpoint de funcionários permitindo filtragem combinada por:
* **Nome** (Busca parcial via `LIKE`).
* **CPF** (Busca exata).
* **Cargo** (Filtro por ID do cargo).


## 📡 Endpoints da API

### 👤 Funcionários (`/api/employees`)

| Método | Endpoint | Parâmetros de Filtro (Query) | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/employees` | `name`, `cpf`, `role_id`, `page` | Lista funcionários com filtros dinâmicos e paginação. |
| **POST** | `/api/employees` | N/A | Cadastra um novo funcionário. |
| **GET** | `/api/employees/{id}` | N/A | Exibe detalhes de um funcionário com os dados do cargo. |
| **PUT** | `/api/employees/{id}` | N/A | Atualiza dados (Trata exceção de CPF único). |
| **DELETE** | `/api/employees/{id}` | N/A | Remove um funcionário do sistema. |

### 💼 Cargos (`/api/roles`)

| Método | Endpoint | Regras de Negócio | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/roles` | Paginação ativa | Lista todos os cargos cadastrados. |
| **POST** | `/api/roles` | `salary >= 0`, `name unique` | Cadastra um novo cargo com validação de valor positivo. |
| **PUT** | `/api/roles/{id}` | `salary >= 0` | Atualiza dados de um cargo existente. |
| **DELETE** | `/api/roles/{id}` | Proteção de integridade | Remove um cargo do sistema. |
