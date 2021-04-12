import React, { useContext } from "react";
import styled from "@emotion/styled"
import banner from "../images/banner.png"
import spotifyLogo from "../images/spotifyLogo.png"
import { Link } from "react-router-dom";
import { Albums } from "../resources/Albums";
import { FirebaseContext } from './Firebase';

function Home({ openSignInModal, authUser }) {

    const { SignOut } = useContext(FirebaseContext);

    return (
        <>
            <HomeContainer>
                <DropdownMenu>
                    <span>{authUser ? authUser.email: "Iniciar Sesión"} &raquo;</span>
                    <DropdownContent>
                        <DropdownOption onClick={openSignInModal}>Iniciar Sesión</DropdownOption>
                        <DropdownOption onClick={SignOut}>Cerrar Sesión</DropdownOption>
                    </DropdownContent>
                </DropdownMenu>
                <HomeBanner>
                    <Banner src={banner} />
                </HomeBanner>
                <h1 style={{fontSize: "24px"}}>{authUser ? `¡Hola, ${authUser.email}!`:`¡Hola, bivenenido a Fake Spotify!`}</h1>
                <PlayListWrapper>
                    {Albums.map((el => {
                        return <PlayListCard key={el.id} to={`/lista/${el.id}`}>
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


const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    padding: 24px;
`

const DropdownMenu = styled.div`
    display: inline-block;
    align-self: flex-end;
    padding: 8px 16px;
    border-radius: 15px;
    border: 1px solid gray;
    cursor: pointer;
    &:hover > div {
        display: block;
    }
`

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    margin: 8px 0;
    background-color: #242424;
    box-shadow: 0px 8px 16px 0px black;
    z-index: 1;
    & > span:hover {
        background-color: #333333;
    }
`

const DropdownOption = styled.span`
    padding: 16px 16px;
    display: block;
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
    width: 40%;
    height: 100%;
`

const PlayListDescr = styled.p`
    width: 60%;
    padding: 8px;
    color: white;
    font-weight: bold;
`