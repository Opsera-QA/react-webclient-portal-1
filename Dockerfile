FROM node:lts-alpine3.9 as build
ARG build_env=production
RUN echo ${build_env}
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run build:${build_env}
RUN mv build* build

FROM httpd:latest
COPY apache-configs/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY apache-configs/my-htaccess /usr/local/apache2/htdocs/.htaccess
COPY --from=build /usr/src/app/build /usr/local/apache2/htdocs/
EXPOSE 80