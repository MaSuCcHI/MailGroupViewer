FROM 'nginx:latest'

COPY ./docker/nginx/ /etc/nginx/conf.d/
COPY ./application/build /var/www/build

# #CMD ['nginx',-g','daemon off;']

