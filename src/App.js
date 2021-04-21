import React, { useContext, useEffect, useState } from "react"
import { Global, css } from '@emotion/react'
import styled from "@emotion/styled"
import Menu from "./components/Menu";
import FriendsList from "./components/FriendsList";
import MediaPlayer from "./components/MediaPlayer";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import SongList from "./components/SongList";
import { AuthContext } from './components/Firebase/AuthDAO';
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import DropdownMenu from "./components/DropdownMenu";
import { DBContext } from "./components/Firebase/UserDAO";
import { checkIfIsFavorite, findAlbum } from "./components/Utils/Utils"

function App() {

  // Estado de la canción global reproduciéndose.
  const [songId, changeSong] = useState(0);

  // Estado del modal de Inicio de Sesión
  const [signInActive, handleSignInModal] = useState(false)

  // Revisar si toda la información ha sido recogida
  const [dataFetched, checkData] = useState(false)

  // Context de Firebase con los métodos DAO
  const { authUser } = useContext(AuthContext)
  const { setFavoriteSong, favoriteSongs, removeFavoriteSong, albums, userName } = useContext(DBContext)

  function playSong(id) {
    changeSong(id)
  }

  function openSignInModal() {
    handleSignInModal(true)
  }

  function closeModal() {
    handleSignInModal(false)
  }

  // Coloca o elimina una canción de favoritos
  function handleFavorite(song) {
    if (authUser) {
      if (!checkIfIsFavorite(song)) {
        setFavoriteSong(authUser.uid, song)
      } else {
        removeFavoriteSong(authUser.uid, song)
      }
    } else {
      openSignInModal()
    }
  }

  // Verifica si todos los datos se han obtenido o no
  useEffect(() => {
    if (authUser) {
      if (albums && userName && favoriteSongs) {
        checkData(true)
      } else {
        checkData(false)
      }
    } else {
      checkData(true)
    }

  }, [albums, authUser, userName, favoriteSongs])

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
        />
      }

      <MainContent signInActive={signInActive}>
        {dataFetched ?
          <>
            <BrowserRouter>
              <Menu
                openSignInModal={openSignInModal}
              />
              <Switch>
                <ContentWrapper>
                  <DropdownMenu openSignInModal={openSignInModal} />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/profile">
                    <Profile
                      openSignInModal={openSignInModal}
                    />
                  </Route>
                  <Route exact path="/lista/:id" render={(routeProps) => (
                    <SongList
                      album={{ ...findAlbum(routeProps.match.params.id, favoriteSongs, albums) }}
                      playSong={playSong}
                    />
                  )}>
                  </Route>
                </ContentWrapper>
              </Switch>
              {authUser ?
                <FriendsList playSong={playSong} /> : ""
              }
              <MediaPlayer
                songId={songId}
                handleFavorite={handleFavorite}
              />

            </BrowserRouter>
          </>
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