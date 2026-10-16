FROM node:20-alpine

WORKDIR /usr/src/app

# Copiamos solo los archivos de dependencias primero
COPY package*.json ./

# Instalamos dependencias dentro del contenedor (aislado de tu proxy local)
RUN npm install

# Copiamos el resto del código
COPY . .

EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]