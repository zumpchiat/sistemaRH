# 🏥 Sistema de Gestão de RH - Assim  (Front-end)

Este projeto é o front-end de uma aplicação de gestão de Recursos Humanos, desenvolvida como parte de um processo de avaliação técnica.
## 🚀 Tecnologias e Ferramentas

* **React 18**: Biblioteca base para construção da interface baseada em componentes.
* **TypeScript**: Adicionado para garantir segurança de tipos e evitar erros em tempo de execução (como o tratamento de objetos nulos no CRUD).
* **Vite**: Ferramenta de build de última geração para um desenvolvimento rápido.
* **Tailwind CSS**: Framework utilitário para estilização moderna, limpa e responsiva.

## 📦 Bibliotecas Principais

| Biblioteca | Utilidade |
| :--- | :--- |
| **Node** | v24.14.0 |
| **Axios** | Cliente HTTP para consumo da API REST em Laravel. |
| **React Router Dom** | Gerenciamento de rotas (Navegação entre Cargos e Funcionários). |
| **React Hot Toast** | Sistema de notificações flutuantes (Feedback de sucesso/erro/loading). |


## 🛠️ Funcionalidades Implementadas (Cargos)

### 🔍 Busca e Listagem Dinâmica
* Campo de pesquisa por nome do cargo com integração em tempo real com o back-end.
* Tabela de resultados com suporte a dados paginados vindos do Laravel.
* Seleção de registro por clique na linha da tabela para carregamento de dados.

### 📝 Gestão de Registros (CRUD)
* **Modo Híbrido**: O formulário alterna automaticamente entre "Inclusão" e "Edição" baseado no estado do componente.
* **Persistência**: Integração com métodos `POST` (Cadastro), `PUT` (Atualização) e `DELETE` (Exclusão) via Axios.
* **Validação de Interface**: Bloqueio de envio de campos vazios e confirmação de exclusão.
* **UX Reativa**: A listagem é atualizada automaticamente após qualquer alteração no banco, sem necessidade de recarregar a página (F5).

## 🔧 Configuração de Ambiente

1.  **Instalação de dependências**:
    ```bash
    npm install
    ```
2.  **Configuração da API**:
    Certifique-se de que o arquivo `src/services/api.ts` aponta para a URL correta do seu servidor Laravel (Ex: `http://localhost:8000/api`).
3.  **Execução**:
    ```bash
    npm run dev
    ```

---