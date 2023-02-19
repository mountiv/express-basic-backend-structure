# Basic Backend Structure using Express, MongoDB, Node.js

This project aimed to build simple blog website backend using Node.js and MongoDB.
Take care in your package.json to make sure this project can run successfully on your Node.js and MongoDB versions.

### Basic structure of this project

```
project
|—— node_modules
|
|—— src
|   |—— config
|   |   |—— db.config.js
|   |
|   |—— controllers
|   |   |—— auth.controller.js
|   |   |—— user.controller.js
|   |   |—— post.controller.js
|   |
|   |—— middleware
|   |   |—— index.js
|   |   |—— auth.middleware.js
|   |
|   |—— models
|   |   |—— index.js
|   |   |—— user.model.js
|   |   |—— post.model.js
|   |
|   |—— routes
|   |   |—— routes.js
|   |   |—— auth.router.js
|   |   |—— user.router.js
|   |   |—— post.router.js
|   |
|   |—— index.js
|
|—— test
|   |—— auth.js
|   |—— user.js
|   |—— post.js
|
|—— .env
|—— .env.example
|—— .gitignore
|—— package-lock.json
|—— package.json
|—— README.md
```

### Type simple command in your terminal

- starting development server with `npm run dev`

![rundevserver](https://user-images.githubusercontent.com/121834775/218337207-2b704f3e-8fa7-48bc-b879-b4f758dd7bed.png)

- starting unit test with `npm run test`

![rununittest](https://user-images.githubusercontent.com/121834775/218337229-89ff1a1b-8100-4315-888e-7c2d3e125a42.png)

API Guide is [here](https://github.com/mountiv/express-basic-backend-structure-apis).

### Versions

- OS: Windows 10

- Node.js: node-v18.13.0-x64.msi

- MongoDB: mongodb-windows-x86_64-6.0.4-signed.msi

## Author

© me
