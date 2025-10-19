# Use Node.js LTS leve
FROM node:20.12.2-alpine

# Diretório da aplicação
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe porta padrão do NestJS
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
