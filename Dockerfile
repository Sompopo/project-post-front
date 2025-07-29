# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Comando para iniciar en modo desarrollo
CMD ["npm", "run", "dev"]