import React from "react";
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faBook } from '@fortawesome/free-solid-svg-icons'

function Menu() {
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
                <MenuItem>Crear playlist</MenuItem>
                <MenuItem>Canciones que te gustan</MenuItem>
                <Separator style={{ borderBottom: "0.5px solid gray" }} />


                <Link to={`/lista/${0}`}>
                    <MenuItem>Descubrimiento semanal</MenuItem>
                </Link>



                <MenuItem>Favoritas de la radio</MenuItem>
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
    margin: 7px 0;
    cursor: pointer;
    &:hover {
        color: white;
    }
`

const Separator = styled.div`
    width: 100%;
    margin: 16px 0;
`