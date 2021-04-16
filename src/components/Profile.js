import React, { useContext, useState } from "react"
import styled from "@emotion/styled"
import DropdownMenu from "./DropdownMenu";
import SignIn from "./SignIn"
import ResetPassword from "./ResetPassword";
import { FirebaseContext } from "./Firebase";

function Profile({ authUser, openSignInModal, handleAuthUser, userName }) {

    const [resetPasswdActive, handleResetPasswdModal] = useState(false)
    
    function openResetPasswdModal() {
        handleResetPasswdModal(true)
    }

    function closeModal() {
        handleResetPasswdModal(false)
    }

    return (
        <>
            {resetPasswdActive &&
                <ResetPassword
                    show={true}
                    closeModal={closeModal}
                />
            }

            {authUser ?
                <HomeContainer>
                    <DropdownMenu openSignInModal={openSignInModal} authUser={authUser} />
                    <ProfileInfoWrapper>
                        <ProfileImg />
                        <ProfileName>{userName}</ProfileName>
                    </ProfileInfoWrapper>
                    <ProfileOptionsWrapper>
                        <ProfileOption onClick={openResetPasswdModal}>Actualizar contraseña</ProfileOption>
                    </ProfileOptionsWrapper>
                </HomeContainer>
                :
                <SignIn
                    closeModal={closeModal}
                    handleAuthUser={handleAuthUser}
                />
            }
        </>
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
    justify-content: space-around;
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
    color: white;
    font-weight: bold;
    font-size: 48px;
    text-align: center;
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