FROM nginx:stable

## Copy our default nginx config
COPY apps/frontend/nginx/default.conf.template /etc/nginx/templates/default.conf.template

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY dist/apps/frontend/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
