# Heroku live Demo [here](https://radiology-report.herokuapp.com/)

# Hack.Diversity MERN Stack Template (Server Only)

### Client directory was generated by Create-react-app

## Getting Started

There are server and clinet folders as follows:

- [server](server/README.md)
- [client](client/README.md)

### Development Workflow

_Note_: If you are getting set up for the first time, please read the readmes in the client and server folders! You'll need to set up MongoDB to get the app working properly.

- In the root directory of the project, run `yarn install` to install all the dependencies.
- In one of those windows/tabs, navigate to the `client` directory and run `yarn start`. It can be two separate commands or one command joined by `&&`.

  ```sh
  cd client/ && yarn start
  ```

- In another one of your terminals, navigate to the `server` directory and run `yarn server`

  ```sh
  cd server/ && yarn server
  ```

- You should then see the frontend of the app by navigating to `http://localhost:3000/` in a web browser
- You can also ping the server directly at `http://localhost:8000/`, such as `http://localhost:8000/patients`

## FAQ

**What is the MERN stack?**

MERN stands for MongoDB, Express, React, Node which are the technologies
used in this template.
