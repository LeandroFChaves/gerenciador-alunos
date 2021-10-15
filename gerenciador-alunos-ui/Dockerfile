FROM node:14.18-alpine as build
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run ng -- build --prod --base-href=/alunos/

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=build app/dist/gerenciador-alunos-ui /usr/share/nginx/html/alunos
COPY ./nginx-conf/nginx.conf /etc/nginx/conf.d/default.conf
