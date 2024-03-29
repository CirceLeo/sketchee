import Header from './Admin/Header'
import Footer from "./Admin/Footer"
import RecentDrawingDisplay from "./Drawing and other User Displays/RecentDrawingDisplay"

import {useState, useEffect, useContext} from 'react'
import { UserContext } from "../context/user"
import ChallengeDisplay from "./Challenges/ChallengeDisplay"
import Loader from './Admin/Loader'

function WelcomePage(props) {

    const [user, setUser] = useContext(UserContext)

    const [recentPics, setRecentPics] = useState([])
    const [recentChallenges, setRecentChallenges]= useState([])


    useEffect(() => {
        fetch('/drawings')
        .then(resp => resp.json())
        .then(data => setRecentPics(data))

        fetch('/challenges')
        .then(resp => resp.json())
        .then(data => setRecentChallenges(data))
    }, [])

    
    return (
        <div id="welcome-page">
            <Header />
            <div id="welcome-grid">

                <div id="welcome-spacer"></div>

                <div id="welcome-text">
                    <h1 className='lineUp'>Welcome {user.username ? "back" : null} to <em>Sketchee!</em></h1>
                </div>
                
                <div className="display-explain">
                    <h4>Please peruse our 15 most recent creations:</h4>
                    <em>Hover over them to see the inspiration behind the piece!</em>
                </div>
                { recentPics.length > 0  ? 
                    <>
                        <RecentDrawingDisplay artistDetails={true} displayPics={recentPics} /> 
                    </>
                    : <>
                        <h4 className='display-explain'>Look's like we don't have any drawings yet!</h4>
                        <Loader />
                    </>}
                    <div className="display-explain">
                        <h4>Check out our Trending Challenges: </h4>
                        <em>Try to make a better drawing of the same picture!</em>
                        {recentChallenges.length > 0 ? <ChallengeDisplay challenges={recentChallenges}/> : <h4 >No one's made any challenges yet!</h4>}
                    </div>

            </div>
            <div className='gallery-spacer'>
            </div>
            <Footer />
        </div>
    )
}
export default WelcomePage

//REMOVED CODE:
{/* <button onClick={()=> play}>tick!</button> */}
// import SignUpForm from "./User stuff/SignUpForm"
// import LoginForm from "./User stuff/LoginForm"

    // const [modalOpen, setModalOpen] = useState(false);
    // const [modalDisplay, setModalDisplay] = useState('')

// function openLoginModal(e) {
//     setModalOpen(true)
//     setModalDisplay("login")
// }

// function openSichallgnupModal(e) {
//     setModalOpen(true)
//     setModalDisplay("signup")
// }

// function closeModal(){
//     setModalOpen(false)
// }

// useEffect(()=> {
//     if(modalOpen)
//     {document.body.style.overflow = 'hidden';}
//     else {
//         document.body.style.overflow = 'visible'}
// }, [modalOpen])

// const [play] = useSound(ticking)
{/* { user.username ? 
    null
    :
    <div id="login-text">
        <button onClick={openLoginModal}>login?</button>
        {
            modalOpen && (
                <>
                <div className="overlay" onClick={closeModal}></div>
                <div className="modal">
                    { modalDisplay==="login" ? <LoginForm closeModal={closeModal} /> : null}
                    { modalDisplay==="signup" ? <SignUpForm closeModal={closeModal} /> : null}
                </div>
                </>
            )
        }
        <p>New user? Click <button onClick={openSignupModal}>here</button> to sign up or head <a href='/play'>here</a> to play as a guest!</p>
    </div>
} */}