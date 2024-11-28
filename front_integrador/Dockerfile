# Use a imagem base do Node.js
FROM node:18

# Crie um diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Crie o arquivo .env.local com a URL da API
RUN echo 'NEXT_PUBLIC_URL_API="http://localhost:3004"' > .env.local

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que a aplicação irá usar (ex: 3000 para Next.js)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD npm run dev


