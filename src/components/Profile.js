import React from "react"
import styled from "@emotion/styled"
import DropdownMenu from "./DropdownMenu";

function Profile({ authUser, openSignInModal, openRecoverPasswordModal }) {


    return (
        <HomeContainer>
            <DropdownMenu openSignInModal={openSignInModal} authUser={authUser} />
            <ProfileInfoWrapper>
                <ProfileImg />
                <ProfileName>{authUser.email}</ProfileName>
            </ProfileInfoWrapper>
            <ProfileOptionsWrapper>
                <ProfileOption onClick={openRecoverPasswordModal}>Actualizar contraseña</ProfileOption>
            </ProfileOptionsWrapper>
        </HomeContainer>
    )
}


export default Profile;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    padding: 24px;
`

const ProfileInfoWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 16px 0;    
`

const ProfileImg = styled.img`
    width: 230px;
    height: 230px;
    border-radius: 50%;
    border: 1px solid red;
`

const ProfileName = styled.h1`
    word-break: break-all;
    width: 70%;
    color: white;
    font-weight: bold;
    font-size: 48px;
`

const ProfileOptionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProfileOption = styled.button`
    padding: 8px 24px;
    border: 0.5px solid lightgray;
    border-radius: 30px;
    background: #191919;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: #333333;
    }
`