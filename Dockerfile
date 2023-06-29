FROM node:16-alpine3.17 as build
ARG build_env=kube-generic
RUN echo ${build_env}
RUN apk add curl
RUN rm -rf  /usr/src/app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV GENERATE_SOURCEMAP false
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY .npmrc /usr/src/app/.npmrc
RUN echo ${PACKAGE_MANAGER_URL_NPM}
ARG PACKAGE_MANAGER_URL_NPM
ENV PACKAGE_MANAGER_URL_NPM=${PACKAGE_MANAGER_URL_NPM}
ARG PACKAGE_MANAGER_NPM_BASIC_AUTH
ENV PACKAGE_MANAGER_NPM_BASIC_AUTH=${PACKAGE_MANAGER_NPM_BASIC_AUTH}
ARG PACKAGE_MANAGER_EMAIL
ENV PACKAGE_MANAGER_EMAIL=${PACKAGE_MANAGER_EMAIL}
RUN echo "PACKAGE_MANAGER_URL_NPM: ${PACKAGE_MANAGER_URL_NPM}"
RUN echo "PACKAGE_MANAGER_EMAIL: ${PACKAGE_MANAGER_EMAIL}"
RUN npm install --legacy-peer-deps --omit=dev
COPY . /usr/src/app
RUN npm run build:${build_env}
RUN mv build* code
RUN ls -lrt

FROM httpd:2.4.52-alpine
COPY apache-configs/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY apache-configs/my-htaccess /usr/local/apache2/htdocs/.htaccess
COPY --from=build /usr/src/app/code /usr/local/apache2/htdocs/
EXPOSE 80
