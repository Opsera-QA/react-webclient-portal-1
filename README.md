# Opsera Client Portal via ReactJS

This project is a ReactJS SPA bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and integrated with the 
[Okta React SDK](https://www.npmjs.com/package/@okta/okta-react) and using [React Bootstrap](https://react-bootstrap.github.io) as well as 
[React FontAwesome](https://www.npmjs.com/package/react-fontawesome).  This project is designed to be the customer facing portal (client) 
for the OpsERA platform

---
## Environment Variables:
In order to be able to pull the external libraries from Nexus, you must follow Karthik's guide here:
https://opsera.atlassian.net/wiki/spaces/OI/pages/1882292225/Node+Local+Development+-+Configure+NPM+Registry+Environment+Variables

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

