# 🔗 Shortly - Encurtador de URLs

Um encurtador de URLs simples e eficiente construído com Next.js, Prisma e TailwindCSS.

## 📋 Sobre o Projeto

Shortly é uma aplicação web que permite aos usuários encurtar URLs longas em links mais curtos e fáceis de compartilhar. A aplicação oferece uma interface amigável para gerenciar links encurtados, visualizar estatísticas de acesso e personalizar slugs.

## ✨ Funcionalidades

- ✂️ Encurtamento de URLs longas
- 📊 Rastreamento de visitas para cada link
- 🔄 Redirecionamento automático para a URL original
- ✏️ Edição de slugs personalizados
- 🗑️ Exclusão de links
- 🌓 Suporte a tema claro/escuro

## 🛠️ Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React com renderização híbrida
- **[React 19](https://react.dev/)** - Biblioteca para construção de interfaces
- **[Prisma](https://www.prisma.io/)** - ORM para acesso ao banco de dados
- **[TailwindCSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[SQLite](https://www.sqlite.org/)** - Banco de dados leve e embutido

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm, yarn ou pnpm

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/Shortly.git
   cd Shortly
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Configure o banco de dados:
   ```bash
   # Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
   DATABASE_URL="file:./prisma/dev.db"
   
   # Execute as migrações do Prisma
   npx prisma migrate dev
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 📝 Uso

1. Na página inicial, insira a URL que deseja encurtar no campo de texto
2. Clique no botão "Encurtar"
3. Copie o link encurtado gerado e compartilhe
4. Gerencie seus links na tabela abaixo do formulário

## 🧪 Estrutura do Projeto

```
Shortly/
├── prisma/                  # Configuração do Prisma e migrações
│   ├── schema.prisma        # Modelo de dados
│   └── migrations/          # Migrações do banco de dados
├── public/                  # Arquivos estáticos
├── src/
│   ├── app/                 # Rotas e componentes da aplicação
│   │   ├── [slug]/          # Rota dinâmica para redirecionamento
│   │   ├── api/             # Rotas da API
│   │   └── page.tsx         # Página principal
│   └── lib/                 # Utilitários e configurações
│       └── prisma.ts        # Cliente Prisma
└── package.json             # Dependências e scripts
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
