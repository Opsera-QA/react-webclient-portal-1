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

## Deployment:
1. Check out or copy the Master branch to a temp server path or locally on a workstation or jumpserver.  This can also be done from the dev workstation as it creates a new /build folder.
2. Install or update dependencies at root of project file: `sudo npm update` (or `sudo npm install` on first setup)
3. Build project: `npm run build:staging` or `npm run build:production`

### Apache Setup
4. Remove existing contents of the current Build folder EXCEPT for `.htaccess` as that file MUST stay for the ReactApp to route properly. (common path: `/var/www/html`) 
5. Copy contents of `/build` folder into the root web path for the server (common path: `/var/www/html`)
6. Making sure `.htaccess` is still in the `/var/www/html` folder, restart apache:
```
$ sudo service apache2 restart
```

### Tomcat Setup
4. Upload contents of `/build` folder to `/home/ec2-user/client-build/MM-DD-YYYY/` (Creating a new folder based on the Release Date of the build.  This ensures that we keep a copy of all released builds in the "client-build" folder in case of rollback requirements. These are never deleted.)
5. SSH to sever, perform: 
6. Navigate to Tomcat WebAps folder: `/var/lib/apache-tomcat-8.5.35/webapps`
7. Remove contents of `/ROOT` folder, leaving the `/WEB-INF` folder in place as you must preserve the `web.xml` file.  Then transfer new content into place: 
```
$ sudo su -
$ cd /var/lib/apache-tomcat-8.5.35/webapps
$ find ./ROOT -mindepth 1 ! -regex '^./ROOT/WEB-INF\(/.*\)?' -delete
$ cp -a /home/ec2-user/client-build/MM-DD-YYYY/. ROOT/
```
8. Follow commands below to restart Tomcat:

**To Start Tomcat Server**
SSH to the Server Instance and run these commands:
```
$ sudo su -
$ cd /var/lib/apache-tomcat-<version>/bin
$ ./startup.sh
```

The `web.xml` in `/ROOT/WEB-INF` tells Apache/Tomcat how to handle React Apps.  React Apps generate URL's that are not real so the default response of the web server is to return a 404.  This web.xml tells the web server to instead route users to index.html (the default document for the React App.)