DESCRIPTION:

This project is a demonstration of Spotify's API authentication feature. By logging in with your Spotify credentials, the program can display your current song if you're listening to one, display your top 10 most listened to artists recently, and generate a new playlist within your account based on these artists.

The template used for this code comes from https://github.com/jonnyk20/spotify-node-react-starter-kit

We mainly modified the App.js file, which is found in clientFinalVersion/src/App.js so that it displays top artists and makes a playlist. We also had to add authentication scopes as we needed access to different parts of the user's account. This was done inside app.js, which is found auth-server/authorization_code/app.js

