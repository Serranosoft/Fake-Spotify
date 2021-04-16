import React from "react";
import styled from "@emotion/styled"
import SongModel from "../models/SongModel"

function SongList({album, playSong, handleFavorite}) {
    const songsQty = album.songs.length;

    return (
        <>
            <SongListHeader>
                <h1>{album.name}</h1>
                <span>Este albúm tiene {songsQty} canciones</span>
            </SongListHeader>
            <SongListContainer>
                {album.songs.map((el => {
                    return <SongModel key={el.id} playSong={playSong} handleFavorite={handleFavorite} {...el} />
                }))}

            </SongListContainer>
        </>
    )
}

export default SongList;


const SongListHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 24px 16px;
    & > h1 {
        color: white;
    }
    & > span {
        color: white;
    }
`

const SongListContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 24px;
    background-color: #333333;
`