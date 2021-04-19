import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBymqTBl4yQpFkM9g8zkAEUudisl5MhgB0",
    authDomain: "fakespotify-eaf60.firebaseapp.com",
    databaseURL: "https://fakespotify-eaf60-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fakespotify-eaf60",
    storageBucket: "fakespotify-eaf60.appspot.com",
    messagingSenderId: "1019456825580",
    appId: "1:1019456825580:web:4be9f9aefe3d5c706b1dc9"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    // Create a authetication account
    register = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // Sign in
    login = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // Sign out
    SignOut = () => this.auth.signOut();

    // Reset password
    resetPassword = email => this.auth.sendPasswordResetEmail(email);

    // Update password
    updatePassword = password =>
        this.auth.currentUser.updatePassword(password);

    // Get authenticated user data
    getAuthUser = (handleUser) => {
        this.auth.onAuthStateChanged(authUser => {
            handleUser(authUser)
        })
    }

    // *** Database API ***

    // Get user reference
    getUserRef = uid => this.db.ref(`users/${uid}`);

    // Create user on databasae
    createUser = (id, user) => this.getUserRef(id).set(user);

    getUserName = (id, setUserName) => this.getUserRef(id).child("userNameInput").once("value", snapshot => {
        setUserName(snapshot.val())
    })

    // Get favorite songs from a user
    getFavoriteSongs = (id, handleFavorites) => {
        this.getUserRef(id).child("favorite-songs").on("value", snapshot => {
            const snap = snapshot.val();
            if (snap != null) {
                const snapValues = Object.keys(snapshot.val()).map(key => ({
                    ...snap[key].song
                }))
                handleFavorites(snapValues)
            } else {
                handleFavorites([])
            }
        })
    }

    // Set a favorite song to a user
    setFavoriteSong = (id, song, handleFavorites) => {
        this.getUserRef(id).child("favorite-songs").push({ "song": song })
            .then(() => {
                this.getFavoriteSongs(id, handleFavorites)
            }).catch((error) => {
                console.log(error);
            })
    };


    // Remove favorite song from a user
    removeFavoriteSong = (id, song, handleFavorites) => {
        this.getUserRef(id).child("favorite-songs").once("value", snapshot => {
            const snap = snapshot.val();
            const usersList = Object.keys(snap).map(key => ({
                ...snap[key],
                key: key,
            }));
            usersList.forEach((el => {
                if (el.song.id === song.id) {
                    this.getUserRef(id).child(`favorite-songs/${el.key}`).remove()
                        .then(() => {
                            this.getFavoriteSongs(id, handleFavorites)
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            }))

        })
    }

    // Add album
    addAlbum = (id, albumName) => {
        this.getUserRef(id).child("albums").push({
            "albumName": albumName
        }).then((response) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    // Get all albums from a user
    getAlbums = (id, handleAlbums) => {
        this.getUserRef(id).child("albums").on("value", snapshot => {
            const snap = snapshot.val();
            const snapValues = Object.keys(snapshot.val()).map(key => ({
                ...snap[key],
                id: key
            }))
            handleAlbums(snapValues)
        })
    }

    // Add a specific song to a specific album from a user
    addSongToAlbum = (id, albumId, song, handleAlbums) => {
        // Check if exist
        this.getUserRef(id).child("albums").child(albumId).once("value", snapshot => {
            const snap = snapshot.val();
            let exist = true;
            if (snap.songs) {
                let snapValues = Object.keys(snap.songs).map(key => ({
                    ...snap.songs[key]
                }))
                snapValues.some((el => {
                    if (el.id !== song.id) {
                        exist = false;
                    } else {
                        exist = true;
                    }
                    return exist === true;
                }))
                if (!exist) {
                    // Add song to album
                    this.getUserRef(id).child("albums").child(albumId).child("songs").push(song)
                        .then((response) => {
                            this.getAlbums(id, handleAlbums)
                            exist = true;
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            } else {
                this.getUserRef(id).child("albums").child(albumId).child("songs").push(song)
                    .then((response) => {
                        this.getAlbums(id, handleAlbums)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })

    }
}

export default Firebase;