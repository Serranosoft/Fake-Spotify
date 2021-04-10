import houseParty from "../songs/dj_koy_house_party.ogg";
import blackBrownWhite from "../songs/freeky_kleen_black_brown_white.ogg";
import justLikeHer from "../songs/michael_ellis_just_like_her.ogg";


const discoverAlbum = {
    id: 0,
    name: "Descubrimiento semanal",
    songs: [
        { id: 0, title: "Black, Brown and White", author: "Freeky Cleen", album: "Album Testing 1", duration: 2.41, song: blackBrownWhite },
        { id: 1, title: "House Party", author: "DJ KOI", album: "Album Testing 2", duration: 3.22, song: houseParty },
        { id: 2, title: "Just Like Her", author: "Michael Ellis", album: "Album Testing 3", duration: 2.32, song: justLikeHer },
    ]
}

const Album1 = {
    id: 1,
    name: "Favoritas de la radio",
    songs: [
        { id: 0, title: "House Party", author: "DJ KOI", album: "Album Testing 2", duration: 3.22, song: houseParty },
        { id: 1, title: "Black, Brown and White", author: "Freeky Cleen", album: "Album Testing 1", duration: 2.41, song: blackBrownWhite },
        { id: 2, title: "Just Like Her", author: "Michael Ellis", album: "Album Testing 3", duration: 2.32, song: justLikeHer },
    ]
}

const Album2 = {
    id: 2,
    name: "Lista de reproducción 1",
    songs: [
        { id: 0, title: "Just Like Her", author: "Michael Ellis", album: "Album Testing 3", duration: 2.32, song: justLikeHer },
    ]
}

const Albums = [
    discoverAlbum,
    Album1,
    Album2,
]



export {
    Albums
}