FROM node:lts-alpine3.9 as build
ARG build_env=production
RUN echo ${build_env}
RUN apk add curl
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV GENERATE_SOURCEMAP false
COPY package.json /usr/src/app/package.json
COPY .npmrc /usr/src/app/.npmrc
COPY development_dependencies /usr/src/app/development_dependencies
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run build:${build_env}
RUN mv build* code
RUN ls -lrt

FROM httpd:2.4.52-alpine
COPY apache-configs/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY apache-configs/my-htaccess /usr/local/apache2/htdocs/.htaccess
COPY --from=build /usr/src/app/code /usr/local/apache2/htdocs/
EXPOSE 80