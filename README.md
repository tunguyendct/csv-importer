# Stengg mini project

## Problem Statement
Create a React/Svelte frontend in Typescript and NodeJS web backend in Typescript/Javascript with the following functionalities.

1. Upload a CSV file with appropriate feedback to the user on the upload progress.

2. List the data uploaded with pagination.

3. Search data from the uploaded file. The web application should be responsive while listing of data and searching of data.

## Submission Requirement

In your submission, must include the following:  

1. Use this [csv file](data.csv) as the sample  

2. Include unit tests with complete test cases including edge cases.  

3. Provide a git repository for us to assess your submission.  

4. Provide a readme in the git repository on how to setup and run the project.

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

1. Folder `server`: Backend

2. Folder `client`: Frontend

## Install

**1. Clone repo**

```bash
git clone git@github.com:tunguyendct/stengg-mini-project.git && cd stengg-mini-project
```

**2. Add `.env` files**

**Server**

- Create `/server/.env` file

- Copy content in file `.env` from my email into `/server/.env`

**Client**

- Create `/client/.env` file

- Copy content in `/client/.env.example` into `/client/.env`

**3. Install**

**Server**

```bash
npm install
```

**Client**

```bash
npm run install:client
```

## Run project

**Server**

```bash
npm run start
```

**Client**

Open another terminal in folder `stengg-mini-project` and run

```bash
npm run start:client
```
