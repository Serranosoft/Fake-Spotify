import React from "react";
import styled from "@emotion/styled"
import banner from "../images/banner.png"
import spotifyLogo from "../images/spotifyLogo.png"
import { Link } from "react-router-dom";
import { Albums } from "../resources/Albums";

function Home({openSignInModal}) {
    return (
        <>
            <HomeContainer>
                <span onClick={openSignInModal}>Iniciar Sesión</span>
                <HomeBanner>
                    <Banner src={banner} />
                </HomeBanner>
                <h1>¡Buenas noches!</h1>
                <PlayListWrapper>
                    {Albums.map((el => {
                        return <PlayListCard to={`/lista/${el.id}`}>
                            <PlayListImg src={spotifyLogo} />
                            <PlayListDescr>{el.name}</PlayListDescr>
                        </PlayListCard>
                    }))}
                </PlayListWrapper>
            </HomeContainer>
        </>
    )
}

export default Home;


const HomeContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    padding: 24px;
    & > span {
        cursor: pointer;
    }
    & > span:hover {
        text-decoration: underline;
    }
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
    &:hover {
        background-color: rgba(255,255,255,0.2);
    }
`

const PlayListImg = styled.img`
    width: 100%;
    height: 100%;
    flex: 1 6 auto;
`

const PlayListDescr = styled.p`
    flex: 1 0 6;
    margin-left: 16px;
    color: white;
    font-weight: bold;
`