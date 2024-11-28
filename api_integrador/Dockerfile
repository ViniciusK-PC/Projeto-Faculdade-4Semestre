# Exemplo do Dockerfile na pasta api_exemplo
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

RUN rm -rf node_modules
# Instale as dependências
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcryptjs


RUN echo 'DATABASE_URL="mysql://root:84471814@db:3306/texttp"'> .env

# Copie o restante dos arquivos, incluindo o schema.prisma
COPY prisma/schema.prisma ./prisma/schema.prisma
# Realiza a migração
#RUN npx prisma migrate dev --name tabelas_com_docker

# Copie o restante do código
COPY . .

# Comando para iniciar sua aplicação
CMD ["npm", "run", "dev"]
