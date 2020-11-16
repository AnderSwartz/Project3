import './App.css';
import Spotify from 'spotify-web-api-js';
import React, { Component } from 'react';

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
          names: response.items[0].name +", " + response.items[1].name +", " + 
          response.items[2].name +", " + response.items[3].name +", " + 
          response.items[4].name +", " + response.items[5].name +", " + 
          response.items[6].name +", " + response.items[7].name +", " + 
          response.items[8].name +", " + response.items[9].name,
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
    spotifyWebApi.createPlaylist(['playlist title'])
    .then((response) =>{
      console.log(response)
      this.setState({
        newPlaylist:{
          tracks: response.tracks[0].name
        }
      })
    })
  }



  //fetch('https://api.spotify.com/v1/me/playlists',){
    
 // }


 /*


  getArtists(){
    spotifyWebApi.getFollowedArtists()
    console.log(response.artists)
    .then(res => res.json())
    .then((response)=> {
      this.setState({
        followedArtists: {
          names: response.artists
        }
      })
    })
  }
  */
  /*
  getNowPlayingMyWay(){
    var request = new XMLHttpRequest();
    request.open("GET","https://api.spotify.com/v1/me/player/currently-playing",true);
    console.log(res)
    request.send();
    request.onload = function(){
      var data = JSON.parse(this.response);
      console.log(data)
        //var trackName = respon.item.name    
    }
    request.send();
  }
*/

 


  render() {
    return (
     
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: {this.state.nowPlaying.name }
          
        </div>
       
        <div>
        Fav artists: {this.state.favArtists.names}
        {this.state.favArtists.uri}
        
        </div>

        <div>
        Recommendations: {this.state.newTracks.tracks}
        
        </div>
       
        <div>
          <img src={this.state.nowPlaying.image} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
          
        }
 
        { this.state.loggedIn &&
          <button onClick={() => this.getFavorites()}>
            Check fav artists
          </button>
        }

        { this.state.loggedIn &&
          <button onClick={() => this.getSongsForPlaylist()}>
            Recommendations 
          </button>
        }
        
      </div>
     
    );
  }
}

export default App;