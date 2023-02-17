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

- starting unit test with `npm run test`

API Guide is [here](https://github.com/mountiv/express-basic-backend-structure-apis).

## Author

© me
