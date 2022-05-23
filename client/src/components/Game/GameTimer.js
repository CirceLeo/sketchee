import { useState, useEffect } from "react";

function GameTimer(props) {
    const {gameActive, handleGameEnd} = props
    const [timeLeft, setTimeLeft] = useState(90) 

    useEffect(() => {
        if(gameActive){
        const interval = setInterval(() => {
            setTimeLeft(timeLeft =>  timeLeft - 1)
        }, 1000);
        return () => clearInterval(interval)
    }
}, [gameActive])

useEffect(() => {
        if (timeLeft === 0) {
            console.log("time's up!")
            handleGameEnd()
        }
    }, [timeLeft])

const secondsLeft = Math.abs(timeLeft % 60)
    
    return (
        <>
            <h2 style={{color: timeLeft < 60 ? "red" : "black"}}>{Math.floor(timeLeft / 60) }:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</h2>
            {/* <h2 style={{color: timeLeft < 60 ? "red" : "black"}}>{timeLeft}</h2> */}
        </>
    )
}
export default GameTimer

            // if (seconds > 0){
                //     console.log(timeLeft.seconds)
                //     setTimeLeft({...timeLeft, seconds: timeLeft.seconds - 1})
                // }
            // setSeconds(seconds => seconds +1);

// const {seconds, minutes} = timeLeft
// console.log(timeLeft.seconds)
    // useEffect(() => {
    //     // let interval = null;
    //     if (isActive) {
    //         // interval = setInterval(() => {
    //         //     setTimeLeft(seconds => seconds + 1)
    //         // })
    //     }
    // }, [])


    // function handleStart(){
        // setIsActive(true)
        // console.log("start timer")
        // console.log(isActive)
        // setInterval(() => {
        //     // const {seconds, minutes} = timeLeft
    
        //     if (timeLeft.seconds > 0) {
        //         (console.log(timeLeft.seconds))
        //         setTimeLeft({...timeLeft, seconds: timeLeft.seconds - 1})
        //     }
    
        //     if (timeLeft.seconds === 0){
        //         if (timeLeft.minutes === 0) {
        //             console.log("TIME!")
        //         } else {
        //             setTimeLeft({minutes: timeLeft.minutes - 1, seconds: 59})
        //         }
        //     }
        // }, 1000)