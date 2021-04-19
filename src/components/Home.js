import React from "react";
import styled from "@emotion/styled"
import banner from "../images/banner.png"
import spotifyLogo from "../images/spotifyLogo.png"
import { Link } from "react-router-dom";

function Home({ authUser, userName, albums }) {

    return (
        <>
            <HomeContainer>
                <HomeBanner>
                    <Banner src={banner} />
                </HomeBanner>
                <h1 style={{ fontSize: "24px" }}>{authUser ? `¡Hola, ${userName}, ¡Aquí aparecerán las listas que has creado!` : `¡Hola!, Inicia sesión para utilizar todas las funciones!`}</h1>
                <PlayListWrapper>
                    {albums.map((el => {
                        return <PlayListCard key={el.id} to={`/lista/${el.id}`}>
                            <PlayListImg src={spotifyLogo} />
                            <PlayListDescr>{el.albumName}</PlayListDescr>
                        </PlayListCard>
                    }))}
                </PlayListWrapper>
            </HomeContainer>
        </>
    )
}

export default Home;


const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    padding: 24px;
`

const HomeBanner = styled.div`
    display: flex;
    width: 100%;
    height: 250px;    
`

const Banner = styled.img`
    width: 50%;
    height: 100%;
    margin: 0 auto;
`

const PlayListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    margin: 32px auto;
    
`

const PlayListCard = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgba(255,255,255,0.08);
    cursor: pointer;
    text-decoration: none;
    word-break: break-all;
    &:hover {
        background-color: rgba(255,255,255,0.2);
    }
`

const PlayListImg = styled.img`
    width: 40%;
    height: 100%;
`

const PlayListDescr = styled.p`
    width: 60%;
    padding: 8px;
    color: white;
    font-weight: bold;
`