# Opsera Client Portal via ReactJS

This project is a ReactJS SPA bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and integrated with the 
[Okta React SDK](https://www.npmjs.com/package/@okta/okta-react) and using [React Bootstrap](https://react-bootstrap.github.io) as well as 
[React FontAwesome](https://www.npmjs.com/package/react-fontawesome).  This project is designed to be the customer facing portal (client) 
for the OpsERA platform

---
#####Legacy Library Install Issue:

If you run into a problem performing npm install on the project, you will need to use the syntax:

`npm install --legacy-peer-deps`

It is also advised that you remove your package-lock.json file that's local before running this command.  This is due to 
a version incompatibility with the latest NPM verions and some older libraries in use in this project.
---

## Configuration Variables:
This React App uses [dotenv](https://www.npmjs.com/package/dotenv) natively, although it's a paired down instance.  Any Environment variables 
used MUST be prefixed with the string "REACT_APP_" in order for them to be accessible in the application.  At this time the configuraiton 
variables are used for basic API Host/DNS and Okta configurations which may vary based on Deployment stages: development (localhost), 
Staging (dev.opsera.io) and Production (portal.opsera.io).

Four ".env" files are included in this project:
* .env contains defaults shared across all environments.
* .env.development adds values specific to the `NODE_ENV=development` (localhost development)
* .env.development matches the keys used in .development and .production, but to map the client for use as `NODE_ENV=staging`
* .env.kube-test is used for test.opsera.io platform
* .env.kube-prod is used for `NODE_ENV=production` (portal.opsera.io)

When running the App locally for development, it runs on http://localhost:8080.


## Local Development:
1. Clone repository to local workstation (following GIT standards)
2. In project root directory, install npm libraries: `npm install`
3. Start Project: in project root directory, run  `npm run start-linux-mac` or `npm run start-windows`

