# OpsERA ReactJS Client Portal

This project is a ReactJS SPA bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and integrated with the 
[Okta React SDK](https://www.npmjs.com/package/@okta/okta-react) and using [React Bootstrap](https://react-bootstrap.github.io) as well as 
[React FontAwesome](https://www.npmjs.com/package/react-fontawesome).  This project is designed to be the customer facing portal (client) 
for the OpsERA platform


## Configuration Variables:
This React App uses [dotenv](https://www.npmjs.com/package/dotenv) natively, although it's a paired down instance.  Any Environment variables 
used MUST be prefixed with the string "REACT_APP_" in order for them to be accessible in the application.  At this time the configuraiton 
variables are used for basic API Host/DNS and Okta configurations which may vary based on Deployment stages: development (localhost), 
Staging (dev.opsera.io) and Production (portal.opsera.io).

Four ".env" files are included in this project:
* .env contains defaults shared across all environments.
* .env.development adds values specific to the `NODE_ENV=development`
* .env.development matches the keys used in .development and .production, but to map the client for use as `NODE_ENV=staging`
* .env.production is used for `NODE_ENV=production`

When running the App locally for development, it runs on http://localhost:8080.


## Server Paths:
* Staging Server: `/var/www/html`
* Production Server: `/var/www/html`


## Deployment:
1. Check out or copy the Master branch to a "build server" path (locally or on a jumpserver).  This can also be done from the dev workstation as it creates a new /build folder. For the interim time until TeamCity is deployed, the builds will be done on a dev workstation and the following steps will be performed:
2. Install or update dependencies at root of project file: `sudo npm update` (or `sudo npm install` on first setup)
3. Build project: `npm run build:staging` or `npm run build:production`

### Apache Setup
4. Upload contents of local `/build` folder to `/var/www/release-builds/MM-DD-YYYY/` (Creating a new folder based on the Release Date of the build.  This ensures that we keep a copy of all released builds in the "client-build" folder in case of rollback requirements. These are never deleted.)
4. Remove existing contents of the current `/var/www/html` folder EXCEPT for `.htaccess` as that file MUST stay for the ReactApp to route properly. 
5. Copy contents of `/var/www/release-builds/MM-DD-YYYY/` folder into the root web path for the server (`/var/www/html`)
```
$ cd /var/www
$ find ./html -mindepth 1 ! -regex '^./html/.htaccess\(/.*\)?' -delete
$ cp -a /var/www/release-builds/MM-DD-YYYY/. html/
```

Note: React Apps generate URLs that are not real so the default response of the web server is to return a 404.  This `.htaccess` file tells the web server to instead route users to index.html (the default document for the React App.)

Optional Apache Restart Command:
```
$ sudo service apache2 restart
```