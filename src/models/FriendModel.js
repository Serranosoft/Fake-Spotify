import React from "react";
import styled from "@emotion/styled"
import {Albums} from "../resources/Albums"

function FriendModel(el) {
    console.log(Albums);
    const songFound = Albums[0].songs.find(element => element.id === el.songPlaying);
    return (
        <FriendContainer>
            <SongPlay onClick={() => {el.playSong(el.songPlaying)}}>PLAY</SongPlay>
            <SongData>
                <h2>{el.name}</h2>
                <p>{songFound.title}</p>
            </SongData>
        </FriendContainer>

    )
}

export default FriendModel;

const FriendContainer = styled.header`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: transparent;
    padding: 8px;
    margin: 8px 0;
    color: white;
    &:hover {
        background-color: rgba(255,255,255,0.3);
    }
`

const SongPlay = styled.button`
    color: white;
    background-color: transparent;
    padding: 8px;
    border-radius: 50%;
    align-self: center;
`

const SongData = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    margin: 0 8px;
    & > h2 {
        font-size: 16px;
    }
    & > p {
        font-size: 12px;
    }
`
