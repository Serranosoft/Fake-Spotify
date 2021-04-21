import React from "react";
import styled from "@emotion/styled"
import SongModel from "../models/SongModel"

function SongList({ album, playSong }) {

    function objectLength(obj) {
        var result = 0;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                result++;
            }
        }
        return result;
    }

    return (
        <>
            <SongListHeader>
                <h1>{album.albumName}</h1>
                <span>Este albúm tiene {album.songs ? objectLength(album.songs) : "0"} canciones</span>
            </SongListHeader>
            <SongListContainer>
                {album.songs &&
                    Object.keys(album.songs).map(key => ({
                        ...album.songs[key]
                    })).map((el => {
                        return <SongModel
                            key={el.id}
                            playSong={playSong}
                            song={el}
                        />
                    }))
                }
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