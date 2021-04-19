import React, { useContext } from "react";
import styled from "@emotion/styled"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { Albums } from "../resources/Albums"
import { FirebaseContext } from '../components/Firebase';

function SongModel({ authUser, playSong, handleFavorite, song, favoriteSongs, albums, handleAlbums }) {

    const { addSongToAlbum } = useContext(FirebaseContext)
    let isFavorite = false;
    if (song.id != "-1") {
        const songFound = Albums[0].songs.find(element => element.id === song.id);
        favoriteSongs.forEach((el => {
            if (el.id === songFound.id) isFavorite = true
        }))
    }

    return (
        <SongContainer>
            <FontAwesomeIcon
                icon={faPlayCircle}
                size="2x"
                style={{ cursor: "pointer" }}
                onClick={() => { playSong(song.id) }} />
            {isFavorite ?
                <FontAwesomeIcon
                    icon={faHeartSolid}
                    size="1x"
                    onClick={() => handleFavorite(song)}
                />
                :
                <FontAwesomeIcon
                    icon={faHeartRegular}
                    size="1x"
                    onClick={() => handleFavorite(song)}
                />
            }
            <SongData>
                <h2>{song.title}</h2>
                <span>{song.author}</span>
            </SongData>
            <SongAlbum>{song.album}</SongAlbum>
            <span>{song.duration}</span>
            <AddToAlbumWrapper>
                <FontAwesomeIcon
                    icon={faEllipsisH}
                    size="1x"
                />

                <AddToAlbumContent>
                    {albums.map((el => {
                        return <AddToAlbumOption
                            key={el.id}
                            onClick={() => addSongToAlbum(authUser.uid, el.id, song, handleAlbums)}>
                            Añadir a {el.albumName}
                        </AddToAlbumOption>
                    }))}
                </AddToAlbumContent>
            </AddToAlbumWrapper>

        </SongContainer>

    )
}

export default SongModel;

const SongContainer = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    background-color: transparent;
    padding: 8px;
    margin: 8px 0;
    color: white;
    &:hover {
        background-color: rgba(255,255,255,0.3);
    }
`

const SongData = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    width: 30%;
    & > h2 {
        font-size: 15px;
    }
    & > span {
        font-size: 12px;
    }
`

const SongAlbum = styled.span`
    width: 30%;
    color: white;
`

const AddToAlbumWrapper = styled.div`
    display: inline-block;
    align-self: flex-end;
    padding: 8px 16px;
    cursor: pointer;
    &:hover > div {
        display: block;
    }
`

const AddToAlbumContent = styled.div`
    display: none;
    position: absolute;
    margin: 8px 0;
    background-color: #191919;
    box-shadow: 0px 8px 16px 0px black;
    z-index: 1;
    & > span:hover, link:hover {
        background-color: #333333;
    }
`

const AddToAlbumOption = styled.span`
    padding: 16px 16px;
    display: block;
`
