# How-to Backend Server

This is the backend server for the How-to project.

[Technical Design Document](https://docs.google.com/document/d/1-PyCnS_z0tpPOpsk8uSG-0ZPBWNjkNzCvtlJoW-CyEk/edit)

[ ] Add seeded data (1 user to login with).
[ ] TODO change backend URL in heroku 'howto-tldr'.

## Getting started

Install dependencies:

```
npm install
```

Run database migrations:

```
npx knex migrate:latest
```

Run database seeds:

```
npx knex seed:run
```

Run the tests:

```
npm test
```

Start the server:

```
npm start
```
