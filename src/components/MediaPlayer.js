import React from "react";
import styled from "@emotion/styled"
import ReactAudioPlayer from 'react-audio-player';
import {Albums} from "../resources/Albums"

function MediaPlayer(props) {

    const songFound = Albums[0].songs.find(element => element.id === props.songId);

    return (
        <PlayerContainer>
            <SongData>
                <h2>{songFound.author}</h2>
                <p>{songFound.title}</p>
            </SongData>
            <ReactAudioPlayer
                src={songFound.song}
                controls
                /* autoPlay */
                style={{width: "40%"}}
            />
            <SongData>
                <h2>Creado por</h2>
                <p>Manuel Scholz</p>
            </SongData>
        </PlayerContainer>
    )
}

export default MediaPlayer;


const PlayerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 15%;
    position: fixed;
    bottom: 0;
    padding: 8px;
    background: #191919;
`

const SongData = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    & > h2 {
        font-size: 18px;
    }
    & > p {
        font-size: 12px;
    }
`