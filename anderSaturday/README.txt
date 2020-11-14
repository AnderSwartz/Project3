go into Client --> src --> App.js
this is where essentially all of the code I've done is

The only other file that needs to be edited sometimes is the app.js inside auth-server --> authorization_code --> public --> app.js 
on line 49, you need to add in certain "scopes" which can be found on spotify's documentation site

You have to install node.js if you havent already. 

To run these, first cd into auth-server. Then in the terminal inside of visual studio code (it probably works other places but this is what I have been using) enter: 
npm install
or
npx install
If neither of these work, it might be because you have to install node.js. I can't rememeber how I did that tho :/

enter in auth-server
node authorization_code/app.js
you will know it works when it says listening on localhost:8888

start a new terminal and cd into client
run npm start

if localhost:8888 doesn't automatically open in a new window, trying searching it
this should word, but I would'nt be surprised if I'm forgetting some of the steps I took since it was so long ago. 
