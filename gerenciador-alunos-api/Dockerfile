FROM node:14.18-alpine

# Create app directory, this is in our container/in our image
WORKDIR /gerenciador-alunos-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN chmod +x wait-for
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]