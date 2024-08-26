This project contains a backend express server database with rest assured tests.

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed on your machine

## Setting up the server

From root directory:
   ```bash
   cd my_database
   node server.js
   ```
Open [http://localhost:3002](http://localhost:3002)
   
## Running the tests

From root directory:
  ```bash
  cd test
  mvn clean install
  mvn test
  ```
  
