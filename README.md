# Getting started with the Media Library APP

## Prerequisites 

A recent version Node.js (mine is 20.11.1)
A PostgreSQL database server running
Android Studio if you want to run the app from the emulator or an android device

## API

Create your database with the name media-library

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

## Capacitor:

I used android to develop the app.

You need Android Studio to run the app in an emulator or to connect to a native device.
Download: https://developer.android.com/studio

The approach I would recommend is to open Android Studio and import the android directory (inside the client folder) as an Android Studio project. Useful guides: https://capacitorjs.com/docs/android

All needed capacitor dependencies should be already installed when you did npm install in the client folder

### Run `cd client`
### Run `npm run build`
### As there is already an existing android folder, there no need to create a new one, so just run `npx cap sync`
### If your Android Studio is not open then run `npx cap open android`
### Go back to the root folder `cd ..`
### Run `npm run dev`
### Run the application in Android Studio


## Considerations: 

Although this repo is just a home work. I tried to use all the best practices to make a modular, scalable and clean code. I used patterns, separation of concerns and a folder structure that are commonly used in the field so it is easy to understand and maintain.

In the client I am using Redux for global state management. Since it follows the flux pattern, I believe it makes the application more scalable and easy to maintain. Since it has a very clear flow, it also makes it more predictable which is a good thing. What I am not storing in the redux is the upload function (that sends the video file in a post request) since it's not recommended to store, in Redux, data that are not serializable. In order to keep displaying the upload progress bar even when the user navigates to play other videos, the same instance of this function (together with its returning data) needs to be shared among the components. To achieve this goal I implemented the useUpload custom hook that is used by the UploadContext. The context shares the same instance of the upload function, progress... with the components. In this particular navigation scenario we have, if each component directly called the useUpload hook then, the instance would not be the same and it would not work properly.

For persistance I am using a PostgreSQL database to store video data like name, mimetype, date of creation and so on.
The only thing that is not stored in the db is the file itself. Since we are talking about videos (that can be very big files), storing it as blob/bytea/binaryData in the database could generate big performance issues while fetching a list of videos for example. So to solve this issue I am using disk storage (server/uploads). Of course in a production scenario this solution could be improved by having the destination folder in a cloud storage for example.

For the database interaction I used Prisma. It is a very powerful ORM solution that makes the features like db interaction, migration and data representation very simple. It also has a very rich documentation so in case you have any issues on the database part just check: https://www.prisma.io/

For linting I am using biome.

Please note there are env var files, in this particular case I didn't add those in .gitignore so it's easier to setup everything. 

