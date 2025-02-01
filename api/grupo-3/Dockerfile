FROM node:23.6-alpine

#Vamos criar o diretório raiz do projeto node no container para que possamos
#copiar os arquivos do projeto para dentro do container
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

#Vamos definir o diretório de trabalho do container
WORKDIR /home/node/app

#Vamos copiar os arquivos do projeto para dentro do container
COPY --chown=node:node package*.json ./

#Definir o usuário para instalação
USER node

#Instalar as dependências do projeto
RUN npm install
RUN npm install axios
RUN npm install multer

#Copiar os arquivos do projeto para dentro do container
COPY --chown=node:node . .

#Vamos expor a porta 8080 do container
EXPOSE 3003

CMD ["node", "server.js"]
