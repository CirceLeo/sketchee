import './styling/App.css';
import './styling/App.css';
import './styling/game.css';
import './styling/welcome.css';
import './styling/end-game.css';
import './styling/modal.css'
import './styling/userAdmin.css'
import './styling/Gallery.css'
import './styling/drawingDisplay.css'
import './styling/challenges.css'


import React, {useEffect, useState, useRef, useContext} from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WelcomePage from './components/WelcomPage';
import GamePage from './components/Game/GamePage';
import UserPage from './components/User stuff/UserPage';

import { UserContext, userObject } from "./context/user";
import Gallery from './components/Gallery/Gallery';
import GalleryChallengePage from './components/Gallery/GalleryChallengePage';


function App() {
  const [user, setUser] = useContext(UserContext)

  useEffect( () => {
    fetch("/me")
    .then(res => {
      if (res.ok) {
        res.json().then(recievedUser => {setUser(recievedUser)})
      }
      else {
        console.log("couldn't find a saved user")
      }
    })}, []) 

  // if(process.env.NODE_ENV === 'production'){
  //   //set static folder
  //   app.use(express.static('client/build'));
  // }
  // app.get('*',(req, res) => {
  //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<WelcomePage />} >
            <Route index element={<WelcomePage/>}/>
          </Route>
          <Route path='*' element={<WelcomePage />} />

          <Route path='/me' element={<UserPage />} />

          <Route path='/play' element={<GamePage challenges={false}/>} >
            <Route index element={<GamePage/>}/>
            <Route path='/play/challenge/:id' element={<GamePage challenges={true} />} />
          </Route>

          <Route path='/gallery' element={<Gallery/>} >
            {/* <Route index element={<Gallery/>}/> */}
          </Route>
            <Route path='/gallery/challenges' element={<Gallery/>} >
              {/* <Route index element={<Gallery/>}/> */}
            </Route>
            <Route path='/gallery/challenges/:id' element={<GalleryChallengePage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
