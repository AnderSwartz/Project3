import './App.css';
import Spotify from 'spotify-web-api-js';
import React, { Component } from 'react';
import styled from 'styled-components';

const spotifyWebApi = new Spotify();

class App extends Component {

  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyWebApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', image: '' },
      favArtists: {names:"",uri:''},
      newTracks:{tracks:[]},
      newPlaylist:{playlist:""}
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }


  
  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
        .then((response) => {
          console.log(response)
        this.setState({
          
          nowPlaying: { 
              name: response.item.name,
              image: response.item.album.images[0].url
            }
        })
      })
  }



  getFavorites(){
    spotifyWebApi.getMyTopArtists()
    
    .then((response) =>{
      console.log(response)
      this.setState({
        favArtists:{
          names: response.items[0].name +",\n " + response.items[1].name +",\n " + 
          response.items[2].name +",\n " + response.items[3].name +",\n " + 
          response.items[4].name +",\n " + response.items[5].name +",\n " + 
          response.items[6].name +",\n " + response.items[7].name +",\n " + 
          response.items[8].name +",\n " + response.items[9].name,
          uri1: response.items[0].uri.substring(15),
          uri2: response.items[1].uri.substring(15),
          uri3: response.items[2].uri.substring(15)
          //uriCleaned: this.state.favArtists.uri
          
        }
      })
    })
  }

  getSongsForPlaylist(){
    //spotifyWebApi.getRecommendations({seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu']})
    spotifyWebApi.getRecommendations({seed_artists: [this.state.favArtists.uri1,this.state.favArtists.uri2,this.state.favArtists.uri3]})
    .then((response) =>{
      console.log(response)
      this.setState({
        newTracks:{
          tracks: response.tracks[0].name
        }
      })
    })
  }
  

  makePlaylist(){
    spotifyWebApi.createPlaylist()
    .then((response) =>{
      console.log(response)
      this.setState({
        newPlaylist:{
          tracks: response.tracks[0].name,
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>          
         Spotify Information
        </h1>
        <button>
        <a href = 'http://localhost:8888'>Login to Spotify</a>
        </button>
       <h2>
        <div>
          Now Playing: {this.state.nowPlaying.name }
        <div>
          <img src={this.state.nowPlaying.image} style={{ height: 250, width: 250}}/>
        </div>
        </div>
        </h2>
       
        <div>
        Favorite Artists: {this.state.favArtists.names}
        {this.state.favArtists.uri}
        </div>
     
        <div>
        Recommendation: {this.state.newTracks.tracks}
        </div>

        <div>
        Playlist: {this.state.newTracks.track2}
        </div>

        <div>Tracks: {this.state.newTracks.newTracks}</div>
       
        
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
          
        }
 
        { this.state.loggedIn &&
          <button onClick={() => this.getFavorites()}>
            Check Favorite artists
          </button>
        }

        { this.state.loggedIn &&
          <button onClick={() => this.getSongsForPlaylist()}>
            Recommend Button
          </button>
        }

        </div>


        
    );
  }
  }


export default App;