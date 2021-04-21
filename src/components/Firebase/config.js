import app from 'firebase/app';

export const config = {
    apiKey: "AIzaSyBymqTBl4yQpFkM9g8zkAEUudisl5MhgB0",
    authDomain: "fakespotify-eaf60.firebaseapp.com",
    databaseURL: "https://fakespotify-eaf60-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fakespotify-eaf60",
    storageBucket: "fakespotify-eaf60.appspot.com",
    messagingSenderId: "1019456825580",
    appId: "1:1019456825580:web:4be9f9aefe3d5c706b1dc9"
};

app.initializeApp(config);

export const auth = app.auth();
export const db = app.database();