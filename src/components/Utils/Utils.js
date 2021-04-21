import { Albums } from "../../resources/Albums";

// Verifica si una canción ya esta en favoritos o no
function checkIfIsFavorite(favoriteSongs, song) {
    let flag = false;
    favoriteSongs.forEach(element => {
        if (element.id === song.id) {
            flag = true;
        }
    });
    return flag;
}

// Get album from ID
const findAlbum = (id, favoriteSongs, albums) => {
    switch (id) {
        case "0":
            return Albums.find(element => element.id === parseInt(id));
        case "1":
            let favoriteAlbum = {
                albumName: "Canciones que me gustan",
                id: 1,
                songs: favoriteSongs
            }
            return favoriteAlbum
    }
    return albums.find(element => element.id === id);
}


export {
    checkIfIsFavorite,
    findAlbum
}