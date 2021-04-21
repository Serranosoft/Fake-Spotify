import React from "react";
import styled from "@emotion/styled"
import friends from "../resources/Friends"
import FriendModel from "../models/FriendModel";

function FriendsList({playSong}) {

    
    return (
        <FriendsContainer>
            {friends.map((el => {
                return <FriendModel key={el.id} el={el} playSong={playSong} />
            }))}
        </FriendsContainer>

    )
}

export default FriendsList;


const FriendsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 18%;
    height: 85%;
    background: black;
    overflow-y: scroll;
`

