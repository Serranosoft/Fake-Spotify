import { db } from "./config"
import { useState, createContext, useEffect, useContext } from 'react';
import { AuthContext } from "./AuthDAO";

export const DBContext = createContext()

export const UserDAO = ({ children }) => {

    const { authUser } = useContext(AuthContext)

    // Obtener username
    const [userName, handleUserName] = useState("")

    // Canciones favoritas del usuario
    const [favoriteSongs, handleFavorites] = useState([])

    // Albumes creados por el usuario
    const [albums, handleAlbums] = useState([])

    // Cuando obtiene el usuario autenticado también obtiene sus canciones favoritas, usuario y albums
    useEffect(() => {
        if (authUser != "" && authUser != null) {
            getFavoriteSongs(authUser.uid)
            getAlbums(authUser.uid)
            getUserName(authUser.uid);
        } else {
            handleAlbums([])
            handleFavorites([])
            handleUserName("")
        }
    }, [authUser])

    // Get user reference
    const getUserRef = (uid) => db.ref(`users/${uid}`);

    // Create user on databasae
    const createUser = (id, user) => getUserRef(id).set(user)

    function getUserName(id) {
        getUserRef(id).child("userNameInput").once("value", snapshot => {
            handleUserName(snapshot.val())
        })
    }

    // Get favorite songs from a user
    function getFavoriteSongs(id) {
        getUserRef(id).child("favorite-songs").on("value", snapshot => {
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
    function setFavoriteSong(id, song) {
        getUserRef(id).child("favorite-songs").push({ "song": song })
            .then(() => {
                getFavoriteSongs(id)
            }).catch((error) => {
                console.log(error);
            })
    };


    // Remove favorite song from a user
    function removeFavoriteSong(id, song) {
        getUserRef(id).child("favorite-songs").once("value", snapshot => {
            const snap = snapshot.val();
            const usersList = Object.keys(snap).map(key => ({
                ...snap[key],
                key: key,
            }));
            usersList.forEach((el => {
                if (el.song.id === song.id) {
                    getUserRef(id).child(`favorite-songs/${el.key}`).remove()
                        .then(() => {
                            getFavoriteSongs(id)
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            }))

        })
    }

    // Add album
    function addAlbum(id, albumName) {
        if (albumName != "" && albumName != undefined) {
            getUserRef(id).child("albums").push({
                "albumName": albumName
            }).then((response) => {

            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // Get all albums from a user
    function getAlbums(id) {
        getUserRef(id).child("albums").on("value", snapshot => {
            const snap = snapshot.val();
            const snapValues = Object.keys(snapshot.val()).map(key => ({
                ...snap[key],
                id: key
            }))
            handleAlbums(snapValues)
        })
        return albums;
    }

    // Add a specific song to a specific album from a user
    function addSongToAlbum(id, albumId, song) {
        // Check if exist
        getUserRef(id).child("albums").child(albumId).once("value", snapshot => {
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
                    getUserRef(id).child("albums").child(albumId).child("songs").push(song)
                        .then((response) => {
                            getAlbums(id)
                            exist = true;
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            } else {
                getUserRef(id).child("albums").child(albumId).child("songs").push(song)
                    .then((response) => {
                        getAlbums(id, handleAlbums)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
    }

    

    return (
        <DBContext.Provider
            value={
                {
                    userName,
                    albums,
                    favoriteSongs,
                    createUser,
                    setFavoriteSong,
                    removeFavoriteSong,
                    addAlbum,
                    addSongToAlbum,
                }
            }>
            {children}
        </DBContext.Provider>
    )
}