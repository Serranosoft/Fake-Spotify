import React, { useContext, useState } from "react";
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faBook } from '@fortawesome/free-solid-svg-icons'
import { FirebaseContext } from "./Firebase";

function Menu({ authUser, albums, openSignInModal }) {

    const [albumName, handleAlbumName] = useState("");


    const handleChange = (e) => {
        handleAlbumName(e.target.value)
    }

    const { addAlbum } = useContext(FirebaseContext)

    return (
        <MenuContainer>
            <Nav>
                <LinkWrapper to="/">
                    <FontAwesomeIcon icon={faHome} size="1x" />
                    <MenuItem>Inicio</MenuItem>
                </LinkWrapper>

                <LinkWrapper to="/">
                    <FontAwesomeIcon icon={faSearch} size="1x" />
                    <MenuItem>Buscar</MenuItem>
                </LinkWrapper>

                <LinkWrapper to="/">
                    <FontAwesomeIcon icon={faBook} size="1x" />
                    <MenuItem>Tu biblioteca</MenuItem>
                </LinkWrapper>
                <Separator />
                <LinkWrapper to={`/lista/${0}`}>
                    <MenuItem>Descubrimiento semanal</MenuItem>
                </LinkWrapper>
                <LinkWrapper to={`/lista/${1}`}>
                    <MenuItem>Canciones que te gustan</MenuItem>
                </LinkWrapper>
                <Separator style={{ borderBottom: "0.5px solid gray" }} />

                <AddAlbumWrapper>
                    <AlbumInput
                        type="text"
                        value={albumName}
                        onChange={handleChange}
                        placeholder="Crea tu propio albúm" />
                    <AddAlbum onClick={() => {authUser != null ? addAlbum(authUser.uid, albumName) : openSignInModal()}}>+</AddAlbum>
                </AddAlbumWrapper>

                {authUser ?
                    albums.map((el => {
                        return <LinkWrapper key={el.id} to={`/lista/${el.id}`}>
                            <MenuItem>
                                {el.albumName}
                            </MenuItem>
                        </LinkWrapper>

                    }))
                    :
                    ""

                }
            </Nav>

        </MenuContainer>

    )
}

export default Menu;


const MenuContainer = styled.div`
    width: 18%;
    height: 85%;
    background: black;
    overflow-y: scroll;
    overflow-x: hidden;
`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 24px 16px;    
    
    & > a {
        text-decoration: none;
        
    }
`

const LinkWrapper = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    color: lightgray;
    & > p {
        margin: 0 8px;
    }
    padding: 8px 0;
    border-radius: 5px;

`

const MenuItem = styled.p`
    font-size: 17px;
    color: lightgray;
    cursor: pointer;
    word-break: break-all;
    &:hover {
        color: white;
    }
`

const Separator = styled.div`
    width: 100%;
    margin: 16px 0;
`

const AddAlbumWrapper = styled.div`
    width: 100%;
    display: flex;
    font-size: 18px;
`

const AlbumInput = styled.input`
    width: 100%;
    display: block;
    padding: 5px 8px;
    margin: 8px 0;
    background-color: #212121;
    color: white;
    border: 0;
`

const AddAlbum = styled.button`
    padding: 5px 8px;
    background-color: transparent;
    color: white;
    font-size: 15px;
    border: none;
    cursor: pointer;
`