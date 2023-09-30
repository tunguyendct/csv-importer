# Stengg mini project

## Problem Statement
Create a React/Svelte frontend in Typescript and NodeJS web backend in Typescript/Javascript with the following functionalities.

1. Upload a CSV file with appropriate feedback to the user on the upload progress.

2. List the data uploaded with pagination.

3. Search data from the uploaded file. The web application should be responsive while listing of data and searching of data.

## Tech Stack
**MERN Stack** (MongoDB, Express.js, React.js, and Nodejs)
- [Nodejs](https://nodejs.org/en): Backend
- [Express.js](https://expressjs.com/): Backend framework
- [MongoDB Atlas Database](https://www.mongodb.com/atlas/database): Database
- [React](https://react.dev/): Frontend library
- [Prisma](https://www.prisma.io): ORM
- [TailwindCSS](https://tailwindcss.com): CSS framework

Utilities:
- [React Hot Toast](https://react-hot-toast.com/)
- [React Paginate](https://github.com/AdeleD/react-paginate)

## Stucture
1. `server` folder: Backend
2. `client` folder: Frontend

## Install
**1. Clone repo**

```bash
git clone git@github.com:tunguyendct/stengg-mini-project.git & cd stengg-mini-project
```

**2. Rename `.env` files**

- Rename file `/server/.env.example` to `/server/.env`
- Rename file `/client/.env.example` to `/client/.env`

**3. Install**

Server

```bash
npm install
```

Client
```bash
npm run install:client
```

**5. Start Project**

Server
```bash
npm run start
```

Client

```bash
npm run start:client
```