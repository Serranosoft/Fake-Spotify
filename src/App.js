import React, { useContext, useEffect, useState } from "react"
import { Global, css } from '@emotion/react'
import styled from "@emotion/styled"
import Menu from "./components/Menu";
import FriendsList from "./components/FriendsList";
import MediaPlayer from "./components/MediaPlayer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SongList from "./components/SongList";
import { Albums } from "./resources/Albums";
import { FirebaseContext } from './components/Firebase';
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import DropdownMenu from "./components/DropdownMenu";

import { useHistory } from 'react-router-dom';

function App() {

  const history = useHistory();

  // Estado de la canción global reproduciéndose.
  const [songId, changeSong] = useState(0);

  // Estado del modal de Inicio de Sesión
  const [signInActive, handleSignInModal] = useState(false)

  // Usuario autenticado actual
  const [authUserRef, handleAuthUser] = useState("")

  // Obtener el username del usuario
  const [userName, setUserName] = useState("");

  // Canciones favoritas del usuario
  const [favoriteSongs, handleFavorites] = useState([])

  // Albumes creados por el usuario
  const [albums, handleAlbums] = useState([])

  // Revisar si toda la información ha sido recogida
  const [dataFetched, checkData] = useState(false)

  // Context de Firebase con los métodos DAO
  const { setFavoriteSong, getFavoriteSongs, getAuthUser, removeFavoriteSong, getUserName, getAlbums } = useContext(FirebaseContext)

  function playSong(id) {
    changeSong(id)
  }

  function openSignInModal() {
    handleSignInModal(true)
  }

  function closeModal() {
    handleSignInModal(false)
    /* history.push("/") */
  }

  // Verifica si una canción ya esta en favoritos o no
  function checkIfIsFavorite(song) {
    let flag = false;
    favoriteSongs.forEach(element => {
      console.log(element);
      if (element.id === song.id) {
        flag = true;
      }
    });
    return flag;
  }

  // Coloca o elimina una canción de favoritos
  function handleFavorite(song) {
    if (authUserRef) {
      if (!checkIfIsFavorite(song)) {
        setFavoriteSong(authUserRef.uid, song, handleFavorites)
      } else {
        removeFavoriteSong(authUserRef.uid, song, handleFavorites)
      }
    } else {
      openSignInModal()
    }
  }

  // Obtiene el usuario autenticado cuando el componente termina de montarse
  useEffect(() => {
    getAuthUser(handleAuthUser)
  }, [])

  // Cuando obtiene el usuario autenticado también obtiene sus canciones favoritas, usuario y albums
  useEffect(() => {
    if (authUserRef != "" && authUserRef != null) {
      getFavoriteSongs(authUserRef.uid, handleFavorites)
      getAlbums(authUserRef.uid, handleAlbums)
      getUserName(authUserRef.uid, setUserName);
    }
  }, [authUserRef])

  // Verifica si todos los datos se han obtenido o no
  useEffect(() => {
    if (authUserRef) {
      if (albums && userName && favoriteSongs) {
        checkData(true)
      } else {
        checkData(false)
      }
    } else {
      checkData(true)
    }

  }, [albums, authUserRef, userName, favoriteSongs])

  // Get album from ID
  const findAlbum = (id) => {

    switch (id) {
      case "0":
        console.log(Albums.find(element => element.id === parseInt(id)));
        return Albums.find(element => element.id === parseInt(id));
      case "1":
        let favoriteAlbum = {
          albumName: "Canciones que me gustan",
          id: 1,
          songs: favoriteSongs
        }
        return favoriteAlbum
    }

    return albums.find(element => element.id === id);
  }

  return (
    <>
      <Global
        styles={css`
                *,*::after,*::before {
                    box-sizing: border-box;
                    margin: 0;
                    padding:0;
                }
                
                html {
                    font-family: 'Inter', sans-serif;
                    height: 100%;
                }
                body {
                    background: #f1f1f1;
                    color: #1c1c1c;
                    
                }`
        }
      />

      {signInActive &&
        <SignIn
          closeModal={closeModal}
          handleAuthUser={handleAuthUser}
        />
      }

      <MainContent signInActive={signInActive}>
        {dataFetched ?
          <BrowserRouter>
            <Menu
              authUser={authUserRef}
              albums={albums}
            />
            <Switch>
              <ContentWrapper>
                <DropdownMenu authUser={authUserRef} openSignInModal={openSignInModal} />
                <Route exact path="/" component={Home}>
                  <Home
                    authUser={authUserRef}
                    userName={userName}
                    albums={albums}
                  />
                </Route>
                <Route exact path="/profile" component={Profile}>
                  <Profile
                    authUser={authUserRef}
                    userName={userName}
                    openSignInModal={openSignInModal}
                    handleAuthUser={handleAuthUser}
                  />
                </Route>
                <Route exact path="/lista/:id" render={(routeProps) => (
                  <SongList
                    authUser={authUserRef}
                    album={{ ...findAlbum(routeProps.match.params.id) }}
                    playSong={playSong}
                    handleFavorite={handleFavorite}
                    favoriteSongs={favoriteSongs}
                    albums={albums}
                    handleAlbums={handleAlbums}
                  />
                )}>
                </Route>
              </ContentWrapper>
            </Switch>
            <FriendsList playSong={playSong} />
            <MediaPlayer
              songId={songId}
              handleFavorite={handleFavorite}
              favoriteSongs={favoriteSongs}
            />
          </BrowserRouter>
          :
          <Loading />
        }
      </MainContent>
    </>
  );
}

export default App;

const MainContent = styled.div`
  display: flex;
  flexDirection: row;
  width: 100%;
  height: 100vh;
  filter: ${props => props.signInActive ? `blur(2px)` : ``};
  pointer-events: ${props => props.signInActive ? `none` : `all`};
  background-color: #333333;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 64%;
    height: 85%;
    background-color: #333333;
    overflow-y: scroll;
    overflow-x: hidden;
`