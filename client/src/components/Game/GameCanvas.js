import React, {useEffect, useState, useRef} from 'react';
import {CirclePicker, GithubPicker} from 'react-color';
import CanvasDraw from 'react-canvas-draw';


function GameCanvas({setDrawingData, handleExport}) {

    const [brushColor, setBrushColor] = useState('#B80000')
    const [brushSize, setBrushSize] = useState(3)
    const canvasRef = useRef(null)

    const handleColorChange = (e) => {
        setBrushColor(e.hex)
    }

    const handleSizeChange = (e) => {
        setBrushSize(parseInt(e.target.value, 10))
    }

    const handleSaveImg = () => {
        const currentCanvas = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
        setDrawingData(currentCanvas);
        // handleExport()
    }

    const handleUndo = () => {
        const currentCanvas = canvasRef.current.canvasContainer.childNodes[1]
        console.log(currentCanvas)
        // currentCanvas.undo()
    }

    const canvas =  <CanvasDraw 
        className='canvas'
        brushColor={brushColor}
        hideGrid
        hideInterface
        brushRadius={brushSize}
        lazyRadius={2}
        ref={canvasRef}
        // imgSrc={picUrl} <- try out both ways? would look cleaner
    />

    return (
        <>
            {canvas}
            <GithubPicker triangle='hide' onChange={handleColorChange} />
            <button
                onClick={handleUndo}
            >
                undo
            </button>
        <button
            onClick={() => {
                handleSaveImg()
            // handleExport()
            }}
        >
            save
        </button>
        <label>Brush size</label>
        <input 
            type="number" 
            value={brushSize}
            min={2}
            max={50}
            onChange={handleSizeChange}
        />
        </>
    )
}
export default GameCanvas