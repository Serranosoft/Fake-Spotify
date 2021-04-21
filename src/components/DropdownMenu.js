import React, { useContext } from "react";
import styled from "@emotion/styled"
import { AuthContext } from './Firebase/AuthDAO';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';


function DropdownMenu({ openSignInModal }) {

    const { authUser, signOut } = useContext(AuthContext);
    const history = useHistory();

    return (
        <DropdownMenuWrapper>
            <span>{authUser ? authUser.email : "Iniciar Sesión"} &raquo;</span>
            <DropdownContent>
                {authUser ?
                    "" :
                    <DropdownOption onClick={openSignInModal}>Iniciar Sesión</DropdownOption>
                }
                {authUser ?
                    <DropdownOption onClick={() => signOut(history)}>Cerrar Sesión</DropdownOption>
                    :
                    ""
                }
                {authUser ?
                    <LinkWrapper to="/profile">
                        <DropdownOption>Perfil</DropdownOption>
                    </LinkWrapper>
                    :
                    ""
                }
            </DropdownContent>
        </DropdownMenuWrapper>
    )
}

export default DropdownMenu;

const DropdownMenuWrapper = styled.div`
    display: inline-block;
    align-self: flex-end;
    padding: 8px 16px;
    border-radius: 15px;
    border: 1px solid gray;
    cursor: pointer;
    background-color: #191919;
    color: white;
    margin: 8px 24px;
    &:hover > div {
        display: block;
    }
`

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    margin: 8px 0;
    background-color: #191919;
    box-shadow: 0px 8px 16px 0px black;
    z-index: 1;
    & > span:hover, link:hover {
        background-color: #333333;
    }
`

const DropdownOption = styled.span`
    padding: 16px 16px;
    display: block;
`

const LinkWrapper = styled(Link)`
    color: white;
    text-decoration: none;
    & > span:hover {
        background-color: #333333;
    }
`