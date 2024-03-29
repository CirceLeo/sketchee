import React, {useEffect, useState, useRef, useContext} from 'react';
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../../context/user";

import Header from '../Admin/Header'
import Footer from '../Admin/Footer';
import Loader from '../Admin/Loader';

import {FaPlay} from 'react-icons/fa'

import GameCanvas from './GameCanvas';
import GameSettings from './GameSettings';
import GameTimer from './GameTimer';
import GameEndScreen from './GameEndScreen';
import PlayableChallenges from './PlayableChallenges';

function GamePage({}) {

    localStorage.setItem("everVisited", true)
    const [user] = useContext(UserContext)

    const navigate = useNavigate()

    const params = useParams()
    const challengeId = params.id
    const [challenge, setChallenge] = useState({})

    const [modalOpen, setModalOpen] = useState(false);
    const [challengeModalOpen, setChallengeModalOpen] = useState(false)
    
    const [gameStarted, setGameStarted] = useState(false)
    const [gameActive, setGameActive] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [picLoaded, setPicLoaded] = useState(false)
    const [newDrawingId, setNewDrawingId] = useState(0)

    const [picUrl, setPicUrl] = useState('')
    const [drawingData, setDrawingData] = useState()
    
    const [playTime, setPlayTime] = useState(45)
    const [imageTerm, setImageTerm] = useState('dog')

    const canvasRef = useRef(null)

    const client_id = 'dixX_GB7IbetuPLpQS9-JATQ8GI3j7nJlA3udPSmDZw'

    useEffect(() => {
        if (challengeId){
                fetch(`/challenges/${challengeId}`)
                .then(resp => resp.json())
                .then(data => {
                    setChallenge(data)
                    const drawing = data.drawing
                    setPicUrl(drawing.origin_pic_url)
                    setPlayTime(drawing.play_time)
                    setImageTerm(drawing.subject_category)
                })
        }
        else {
            // setPicUrl("data:image/jpeg;base64,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")
            if (!modalOpen){loadImg()}
        }
    }, [modalOpen, challengeId])

    function openModal(e) {
        setModalOpen(true)
    }

    function closeModal(){
        setModalOpen(false)
    }

    useEffect(()=> {
        if(modalOpen)
        {document.body.style.overflow = 'hidden';}
        else {
            document.body.style.overflow = 'visible'}
    }, [modalOpen])

    function loadImg(){
        const url = `https://api.unsplash.com/photos/random?query=${imageTerm}&client_id=${client_id}`
        fetch(url)
        .then( res => res.json())
        .then(data => {setPicUrl(data.urls.raw)})
        .catch( error => console.log(error.message));
    }

    function openChallengeModal(){
        setChallengeModalOpen(true)
    }

    function closeChallengeModal(){
        setChallengeModalOpen(false)
    }

    function handleStart(){
        setIsShown(true)
        setGameActive(true) 
        window.scrollTo(0, 155)
        setGameStarted(true)
    }

    function handleContinue(){
        setIsShown(true)
        setGameActive(true)
    }

    function prepNewGame(){
        if(challengeId){
            navigate('/play')
        }
        canvasRef.current.eraseAll()
        setIsShown(false)
        setGameStarted(false)
        closeModal()
    }

    function handlePause(){
        setGameActive(false)
        setIsShown(false)
    }

    function handleGameEnd(){
        setGameActive(false)
        setIsShown(false)
        const currentCanvas = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
        setDrawingData(currentCanvas);
        handleExport(currentCanvas)
        setModalOpen(true)
    }

    const handleExport = (canvasData) => {
        console.log("trying to post this drawing")
        let tempUserID = 1 
    
        if (user.username){
            tempUserID = user.id
        }
        console.log(tempUserID)

        if (challengeId){
            // console.log(challengeId, challenge)
            const newAttempt = {
                challenge_id: challenge.id,
                user_id: tempUserID,
                attempt_data_url: canvasData,
            }
            // console.log("attempt data:",newAttempt)
            fetch(`/attempts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(newAttempt)
            })
            .then( res => res.json())
            .then( data => setNewDrawingId(data.id))
            .catch( error => console.log(error.message));
        }
        else {
            fetch(`/drawings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    user_id: tempUserID,
                    data_url: canvasData,
                    origin_pic_url: picUrl,
                    subject_category: imageTerm,
                    play_time: playTime
                })
            })
            .then( res => res.json())
            .then( data =>{
                setNewDrawingId(data.id)
            })
            .catch( error => console.log("idk why something is wrong", error.message));
        }
    };

    return (
        <div id="game-page">
            <Header />
            {/* <GameEndScreen prepNewGame={prepNewGame} picUrl={picUrl} closeModal={closeModal} drawingData={drawingData} newDrawingId={newDrawingId} challenge={challenge} /> */}
            {
                modalOpen && (
                    <>
                    {/* TODO:Refactor: change this to a separate const that gets inserted here - protect from fake game over */}
                        <div className="overlay" onClick={closeModal}></div>
                        <div className="modal">
                            { gameStarted ? 
                                <GameEndScreen prepNewGame={prepNewGame} picUrl={picUrl} closeModal={closeModal} drawingData={drawingData} newDrawingId={newDrawingId} challenge={challenge}/>
                                : <GameSettings closeModal={closeModal} setImageTerm={setImageTerm} setPlayTime={setPlayTime}/>
                            }
                        </div>
                    </>
                )
            }
            {
                challengeModalOpen && (
                    <>
                        <div className="overlay" onClick={closeChallengeModal}></div>
                        <div className="modal">
                            <PlayableChallenges close={closeChallengeModal} />
                        </div>
                    </>
                )
            } 
            <div id='game-grid'>
                <h3 className='game-type-header'>{challengeId ? 'Sketchee Challenge Mode!' : 'Sketchee Random Play!'}</h3>
                {gameStarted ? <div >
                            <GameTimer picLoaded={picLoaded} handleGameEnd={handleGameEnd} gameActive={gameActive} playTime={playTime} gameStarted={gameStarted} />
                        </div> : null}
                <div id='goal-and-canvas' className='lineUp'>
                    <div id='goal-and=-btn'>
                        <div id='goal-pic-div'>
                            {!picLoaded && gameStarted ? <><Loader/> </> : null}
                            { isShown ? <img src={picUrl} onLoad={()=>{setPicLoaded(true)}} /> : <>{gameActive ? <p>Hover over me to see goal picture!</p> :  <p>{ gameStarted ?  "" : "Try to draw what you see here!"}</p>}</>}
                        </div>
                        <div id='current-game-info'>
                        {gameStarted ? 
                            null
                            :
                            <>
                            <div id="current-settings">
                                <strong>Current Settings</strong>
                                <p>Drawing subject: {imageTerm}</p>
                                <p>Time to draw: {playTime} sec</p>
                                { challengeId ? <strong>Challenge mode: settings cannot be changed</strong> : <button className='game-button' onClick={openModal}>Change Settings?</button>}
                            </div> 
                            </>
                        }
                        <div className='game-button-container'>
                        {/* { gameStarted ? null : <button onClick={openChallengeModal} className='game-button challenge-pick-button'>{challengeId ? 'Choose a different challenge?' : 'Play challenge instead of random mode?'}</button>} */}
                            { gameActive ?    
                                <>
                                    <button className='game-button pause-button' onClick={handlePause}>⏸Pause</button> 
                                </>
                                : 
                                <>{gameStarted ? 
                                    <button className='game-button continue-button' onClick={handleContinue}>resume</button> 
                                    : 
                                    <button className='game-button start-button' onClick={handleStart}> <FaPlay /> start</button>
                                }</>
                                
                            }
                            {gameStarted ? <button className='game-button game-end-button' onClick={handleGameEnd}>end game?</button> : null}
                        </div>
                        </div>
                    </div>
                    <div 
                        id="game-canvas" 
                        onMouseEnter={() => {if(gameActive){setIsShown(false)}}}
                        onMouseLeave={() => {if(gameActive){setIsShown(true)}}}
                    >
                        <GameCanvas setDrawingData={setDrawingData} gameActive={gameActive} canvasRef={canvasRef} picURL={picUrl} />
                    </div>
                </div>
            </div>
            <div className='gallery-spacer'>

            </div>
            <Footer />
        </div>
    )
}
export default GamePage