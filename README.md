# Application to upload and watch videos.

# Teck Stack
- Typescript
- React
- Redux
- SASS
- Node.js
- Express
- Prisma

# Features
- Upload and Play Videos (Streams)
- Background Upload   
  
# Getting started with the Media Library APP

## Prerequisites 

A recent version Node.js
A PostgreSQL database server running
Android Studio if you want to run the app from the emulator or an android device

## API

Create your database with the name media-library

Update the DATABASE_URL (server/prisma/.env) according to your database connection settings  

Create a folder called uploads (inside the server folder) if you don't have one

### run `npm install`

### run `npx prisma migrate dev --name init --schema='server/prisma/schema.prisma'`

This command does 2 things: -Create a new SQL migration file for this migration
                            -Run the SQL migration file against the database

## Client

### go to the client folder `cd client`

### run `npm install`

### go back to the root folder `cd ..`

### run `npm run dev`

## Tests

To run the api tests go to the root folder and run `npm test` 
To run the client tests go to the client folder `cd client` and run `npm test` 
