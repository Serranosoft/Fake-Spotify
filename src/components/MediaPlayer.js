import React, { createRef, useEffect, useContext } from "react";
import styled from "@emotion/styled"
import ReactAudioPlayer from 'react-audio-player';
import { Albums } from "../resources/Albums"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons'
import { DBContext } from "./Firebase/UserDAO";

function MediaPlayer({songId, handleFavorite}) {
    
    

    const {favoriteSongs} = useContext(DBContext)
    const songFound = Albums[0].songs.find(element => element.id === songId);

    let isFavorite = false;
    favoriteSongs.forEach((el => {
        if(el.id === songFound.id) isFavorite = true
    }))

    const player = createRef();
    useEffect(() => {
        //player.current.audioEl.current.play();
    }, [songFound])

    return (
        <PlayerContainer>
            <SongData>
                <ActionWrapper>
                    <h2>{songFound.title}</h2>
                    {isFavorite ? 
                    <FontAwesomeIcon
                        icon={faHeartSolid}
                        size="1x"
                        onClick={() => handleFavorite(songFound)}
                    />
                    :
                    <FontAwesomeIcon
                        icon={faHeartRegular}
                        size="1x"
                        onClick={() => handleFavorite(songFound)}
                    />
                }
                </ActionWrapper>
                <p>{songFound.author}</p>
            </SongData>
            <ReactAudioPlayer
                ref={player}
                src={songFound.song}
                controls
                style={{ width: "40%" }}
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
    
    & > p {
        font-size: 12px;
    }
`

const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    & > h2 {
        font-size: 18px;
        margin-right: 16px;
    }
`