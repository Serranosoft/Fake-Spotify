import React from "react";
import styled from "@emotion/styled"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons'

function SongModel(el) {

    return (
        <SongContainer>
            <FontAwesomeIcon
                icon={faPlayCircle}
                size="2x"
                style={{ cursor: "pointer" }}
                onClick={() => { el.playSong(el.id) }} />
            <FontAwesomeIcon
                icon={faHeartRegular}
                size="1x"
            />
            <SongData>
                <h2>{el.title}</h2>
                <span>{el.author}</span>
            </SongData>
            <SongAlbum>{el.album}</SongAlbum>
            <span>{el.duration}</span>
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
    width: 50%;
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
