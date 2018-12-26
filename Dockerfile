FROM nginx
COPY dist/game-of-three/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf