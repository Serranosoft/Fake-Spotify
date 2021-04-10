import React, { useState } from "react"
import { Global, css } from '@emotion/react'
import styled from "@emotion/styled"
import Menu from "./components/Menu";
import FriendsList from "./components/FriendsList";
import MediaPlayer from "./components/MediaPlayer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SongList from "./components/SongList";
import { Albums } from "./resources/Albums";


function App() {

  const [songId, changeSong] = useState(0);

  function playSong(id) {
    changeSong(id)
  }


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

      <MainContent>
        <BrowserRouter>
          <Menu />
          <Switch>
            <ContentWrapper>
              <Route exact path="/" component={Home}>
                <Home />
              </Route>
              <Route exact path="/lista/:albumId" render={(routeProps) => (
                <SongList
                  album={{ ...findAlbum(parseInt(routeProps.match.params.albumId))}}
                  playSong={playSong}
                />
              )}>
              </Route>
            </ContentWrapper>
          </Switch>

          <FriendsList playSong={playSong} />
          <MediaPlayer songId={songId} />

        </BrowserRouter>
      </MainContent>

    </>
  );
}

export default App;

const MainContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 64%;
    height: 85%;
    background-color: #333333;
    overflow-y: scroll;
`