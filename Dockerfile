ARG APP_HOME='/usr/src/app'

FROM node:18.2.0
WORKDIR /usr/src/app
COPY ./application ./
RUN npm install && \
    npm run build;

FROM 'nginx:latest'

COPY ./docker/nginx/ /etc/nginx/conf.d/
#COPY ./application/build /var/www/build
RUN ln -s /usr/src/app/build /var/www/build

#CMD ['nginx',-g','daemon off;']

