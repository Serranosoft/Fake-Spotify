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

function App() {

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

  // Context de Firebase con los métodos DAO
  const { setFavoriteSong, getFavoriteSongs, getAuthUser, removeFavoriteSong, getUserName } = useContext(FirebaseContext)

  function playSong(id) {
    changeSong(id)
  }

  function openSignInModal() {
    handleSignInModal(true)
  }

  function closeModal() {
    handleSignInModal(false)
  }

  // Verifica si una canción ya esta en favoritos o no
  function checkIfIsFavorite(songId) {
    let flag = false;
    favoriteSongs.forEach(element => {
      if (element.songId === songId) {
        flag = true;
      }
    });
    return flag;
  }

  // Coloca o elimina una canción de favoritos
  function handleFavorite(songId) {
    if (authUserRef) {
      if (!checkIfIsFavorite(songId)) {
        setFavoriteSong(authUserRef.uid, songId, handleFavorites)
      } else {
        removeFavoriteSong(authUserRef.uid, songId, handleFavorites)
      }
    } else {
      openSignInModal()
    }
  }

  // Obtiene el usuario autenticado cuando el componente termina de montarse
  useEffect(() => {
    getAuthUser(handleAuthUser)
  }, [])

  // Cuando obtiene el usuario autenticado también obtiene sus canciones favoritas
  useEffect(() => {
    if (authUserRef != "" && authUserRef != null) {
      getFavoriteSongs(authUserRef.uid, handleFavorites)
    }
  }, [authUserRef])

  // Cuando el usuario es autenticado, obtiene su nombre de usuario
  useEffect(() => {
    getUserName(authUserRef.uid, setUserName);
}, [authUserRef])

  // Temp
  const findAlbum = (id) => Albums.find(element => element.id === id);

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
        <BrowserRouter>
          <Menu />
          <Switch>
            <ContentWrapper>
              <Route exact path="/" component={Home}>
                <Home
                  authUser={authUserRef}
                  userName={userName}
                  openSignInModal={openSignInModal}
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
              <Route exact path="/lista/:albumId" render={(routeProps) => (
                <SongList
                  album={{ ...findAlbum(parseInt(routeProps.match.params.albumId)) }}
                  playSong={playSong}
                  handleFavorite={handleFavorite}
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