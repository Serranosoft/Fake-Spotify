import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBymqTBl4yQpFkM9g8zkAEUudisl5MhgB0",
    authDomain: "fakespotify-eaf60.firebaseapp.com",
    projectId: "fakespotify-eaf60",
    storageBucket: "fakespotify-eaf60.appspot.com",
    messagingSenderId: "1019456825580",
    appId: "1:1019456825580:web:4be9f9aefe3d5c706b1dc9"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    // *** Auth API ***

    // Create account
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // Sign in
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // Sign out
    doSignOut = () => this.auth.signOut();

    // Reset password
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    // Update password
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;