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
    register = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // Sign in
    login = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // Sign out
    SignOut = () => this.auth.signOut();

    // Reset password
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    // Update password
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // Get authenticated user data
    getUserData = (handleUser) => {
        this.auth.onAuthStateChanged(authUser => {
            handleUser(authUser)
        })
    }
}

export default Firebase;