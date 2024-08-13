# Usar uma imagem base do Node
FROM node:14

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código da aplicação para o contêiner
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Instalar o servidor estático para servir a aplicação
RUN npm install -g serve

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["serve", "-s", "build"]
