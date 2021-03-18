FROM node:14-alpine AS alpine

# Create a new working directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json .

## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install

# Copy the contents of the project to the image
COPY . .

EXPOSE 3000
ENV DEBUG=*
# Run 'npm start' when the container starts.
CMD ["npm", "run", "start"]