# SUA Logistics API V1

## Description

An API that fosters the delivery of items (orders) from various business owners (partners) pickup points to their customers delivery point via logistics transporters (riders).

The challenge and the solution to this challenge can be found in [the project-plan.md file](project-plan.md).

[Nodemon](https://www.npmjs.com/package/nodemon) is required to run the `dev` script. You can install it globally.

Once the application is run, starting from the roote url, that is '/', the description of the app and documentation of the API routes can be easily located and comprehended.

## Required Environemnt Variables

NODE_ENV: to determine the Node environment => development, test, production.
MONGO_DEV_DATABASE_URL: for mongodb url connection
RSA_PRIVATE_KEY: for token encryption

## Getting Started

The live version of this app can be found at [sua-logistics-app.herokuapp.com](https://sua-logistics-app.herokuapp.com/).

The credentials for the initial **admin** are:
- email: **test_master@tmail.com**
- password: **Password1234**
