
# 💸 Microserviço de Transações Bancárias

## 📘 Descrição do Projeto

Este repositório contém o **microserviço de transações bancárias** do sistema bancário distribuído.  
Ele é responsável por **gerenciar transações financeiras entre usuários**, permitindo:

- **Criar uma transação** (`POST /api/transaction`)
- **Listar todas as transações de um usuário** (`GET /api/transaction/user/:userId`)

O projeto foi desenvolvido com foco em **segurança, consistência e boas práticas de arquitetura**, garantindo que cada operação seja **atômica** e **auditável**.

---

## 🧩 Arquitetura e Tecnologias Utilizadas

### 🧠 Clean Architecture
A aplicação segue o padrão **Clean Architecture**, isolando as **regras de negócio** das **camadas de infraestrutura e aplicação**.  
Isso torna o código **mais modular, testável e de fácil manutenção**, permitindo evoluções sem comprometer a lógica principal.

### 🧱 NestJS
O framework **NestJS** foi escolhido pela sua **modularidade, injeção de dependência nativa** e **excelente integração com TypeScript**, o que garante uma estrutura de código escalável e de fácil leitura.

### 💻 TypeScript
O uso do **TypeScript** traz **segurança de tipos** e **intellisense avançado**, reduzindo erros em tempo de execução e facilitando a refatoração do código.

### 🐳 Docker + PostgreSQL
O banco de dados utilizado é o **PostgreSQL**, e ele pode ser facilmente iniciado via **Docker**, garantindo um ambiente padronizado para todos os desenvolvedores.

### 🧩 Prisma ORM
Foi utilizado o **Prisma ORM** para mapear e interagir com o banco de dados de forma segura e eficiente, aproveitando recursos de **transações atômicas** e **mapeamento tipado**.

### 🧹 Husky + Lint + Build Checks
O projeto conta com **Husky hooks** configurados para evitar commits com erros de **build** ou **ESLint**, garantindo qualidade de código desde o desenvolvimento local.

---

## 🧾 Commitlint e Padrão de Commits

O projeto possui um arquivo chamado `commitlint.config.js`, responsável por validar se as mensagens de commit seguem o padrão **Conventional Commits**.

🔒 Isso significa que **commits fora do padrão são automaticamente bloqueados**.

### 🧱 Exemplo de commit válido
```bash
:sparkles: feat: add endpoint to create user transactions
```

Outros exemplos de tipos válidos:
- `feat:` → nova funcionalidade
- `fix:` → correção de bug
- `chore:` → ajustes de build, configs ou dependências
- `docs:` → mudanças em documentação
- `refactor:` → refatoração de código sem alterar comportamento

---

## ⚙️ Endpoints Principais

| Método | Endpoint | Descrição |
|--------|-----------|-----------|
| `POST` | `/api/transaction` | Cria uma nova transação financeira |
| `GET` | `/api/transaction/user/:userId` | Retorna todas as transações associadas a um usuário (paginação disponível) |

---

## 🧠 Pré-requisitos para Rodar o Projeto (sem Docker)

Para executar o projeto localmente, você precisará ter instalados:

- [Node.js (20.12.2)](https://nodejs.org/)
- [npm (9.6.7)](https://www.npmjs.com/)
- [PostgreSQL (16)](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

## 🚀 Como Iniciar o Projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/lana2-2karla/banking-system-transactions-service.git
```

### 2️⃣ Acesse a pasta do projeto
```bash
cd banking-system-transactions-service
```

### 3️⃣ Instale as dependências
```bash
npm install
```

### 4️⃣ Configure o arquivo `.env`
Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://root:123456@localhost:5432/banking_transactions_db"
PORT=3007
JWT_SECRET=chave-super-secreta
```

### 5️⃣ Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

### 6️⃣ Inicie o servidor
```bash
npm run start ou npm run dev
```

A aplicação estará disponível em:  
👉 `http://localhost:3007`

---

## 🐳 Subindo o Banco de Dados com Docker

Se preferir usar o Docker apenas para o banco:

### 1️⃣ Existe o arquivo `docker-compose.yml`
```yaml
services:
  transactions_db:
    image: postgres:16
    container_name: transactions-service-db
    ports:
      - "5432:5432"
    volumes:
      - transactions_service_db_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
      - POSTGRES_DB=banking_transactions_db
    restart: always

volumes:
  transactions_service_db_data:
```

### 2️⃣ Suba o container
```bash
docker compose up -d
```

Isso iniciará um banco PostgreSQL local na porta `5432`.

---

## 🧩 Testando os Endpoints com Postman

Para testar os endpoints deste microserviço, recomendo o uso do [Postman](https://www.postman.com/downloads/).  

Na raiz do projeto, foi criada uma pasta chamada `postman`, que contém o arquivo `transaction-service.postman_collection.json`.  

### Como usar:

1. Baixe e instale o Postman, caso ainda não tenha.
2. Importe o arquivo `transaction-service.postman_collection.json` no Postman:
   - Abra o Postman.
   - Clique em **Import** no canto superior esquerdo.
   - Selecione **File** e escolha o arquivo `transaction-service.postman_collection.json`.
3. Após importar, você terá todos os endpoints prontos para testar.

