import React, {useEffect, useState, useRef} from 'react';
import {CirclePicker, GithubPicker, BlockPicker} from 'react-color';
import CanvasDraw from 'react-canvas-draw';


function GameCanvas({setDrawingData, gameActive, canvasRef}) {
    
    const [brushColor, setBrushColor] = useState('#B80000')
    const [brushSize, setBrushSize] = useState(3)

    const handleColorChange = (e) => {
        setBrushColor(e.hex)
    }

    const handleSizeChange = (e) => {
        // setBrushSize(e.target.value)
        setBrushSize(parseInt(e.target.value, 10))
    }

    const handleUndo = () => {
        canvasRef.current.undo()
    }

    const handleEraseAll = () => {
        canvasRef.current.eraseAll()
    }

    const canvas =  <CanvasDraw 
        className='canvas'
        brushColor={brushColor}
        hideGrid
        hideInterface
        brushRadius={brushSize}
        lazyRadius={2}
        ref={canvasRef}
        disabled={!gameActive}
        // imgSrc={picUrl} <- try out both ways? would look cleaner
    />


    return (
        <>
        <div id="canvas-controls">
            <button
                onClick={handleUndo}
                className='game-button'
                >
                ↶ undo
            </button>
            <button
                className='game-button'
                onClick={handleEraseAll}
                >
                ⌫ clear canvas
            </button>
            <br/> 
            <label>Brush size</label>
            <div id="brush-size-radio">
                <input 
                    type="radio"
                    name='brush-size'
                    id = 'brush-radio-small'
                    value={2}
                    onClick={handleSizeChange}
                    />
                <input 
                    type="radio"
                    name='brush-size'
                    id = 'brush-radio-med'
                    value={5}
                    onClick={handleSizeChange}
                    />
                <input 
                    type="radio"
                    name='brush-size'
                    id = 'brush-radio-large'
                    value={10}
                    onClick={handleSizeChange}
                    />
        </div>
        <div className='color-picker'>

            <label>Brush color</label>
            <GithubPicker 
                triangle='hide' 
                onChange={handleColorChange} 
                colors ={ [ 
                            "#c91e1e",  //red
                            "#cc6414",  //orange
                            "#FFFF00",  //yellow
                            "#2c9c1a",  //green
                            "#1a459c",  //blue
                            "#601199",  //purple
                            "#4b2d0b",  //brown
                            "#000000",  //black
                            "#FFC0CB",  //pink
                            "#fed8b1",  //light orange
                            "#ffffbf",  //light yellow
                            "#90ee90",  //light green
                            "#00bcd4",  //light blue
                            "#a865c9",  //light purple
                            "#ffffff",  //white
                            "#808080",  //grey
                        ]}
            />
            {/* <CirclePicker 
                circleSize={20}
                circleSpacing={12}
                colors ={ ["#ffffff", "#000000", "#c91e1e", "#cc6414", "#FFFF00", "#2c9c1a", "#1a459c", "#00bcd4", "#601199"]}
            /> */}
        </div>
        </div>
            {canvas}

        </>
    )
}
export default GameCanvas


///LEGACY CODE IN CASE THINGS REALLY BREAK
    // const handleSaveDrawing = () => {
    //     const currentCanvas = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    //     setDrawingData(currentCanvas);
    // }

        // const [currentDrawing, setCurrentDrawing] = useState('')
    // const canvasRef = useRef(null)

    // useEffect(() => {
    //     if(!gameActive){
    //         // console.log("save the pic tho")
    //         handleSaveDrawing()
    //     }
    // }, [gameActive])