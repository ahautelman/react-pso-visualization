import React, { useRef, useState, useContext } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [solutionSpace, setSolutionSpace] = useState();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const prepareCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 9 / 10;
        canvas.height = window.innerHeight * 4 / 5;

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        contextRef.current = context;
    }

    const startDrawing = ({ nativeEvent }, brushStrength, brushSize) => {
        let strength = 255 - 50 * brushStrength;
        contextRef.current.strokeStyle = `rgb(255, ${strength}, ${strength})`;
        contextRef.current.lineWidth = brushSize;

        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        setIsDrawing(false)
        contextRef.current.closePath();
    }

    const draw = ({nativeEvent}) => {
        if(!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const getCanvasImage = () => {
        let canvas = canvasRef.current;
        let context = contextRef.current;
        let image = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log(image);
        return image;
    }

    const drawImageOnCanvas = (image) => {
        if (image === null || image === undefined) {
            clearCanvas();
            return;
        }
        contextRef.current.putImageData(image, 0, 0);
    }

    // TODO: optimize somehow
    const randomizeCanvas = () => {
        let canvas = canvasRef.current;
        let context = contextRef.current;

        // picked a prime number cus i dont want the widt/height of the canvas to be divisible by this number
        for (let x = 0; x < canvas.width - 31; x += 31) {
            for (let y = 0; y < canvas.height - 31; y += 31) {
                // color that will be added to the next 31 x 31 pixels portion 
                let randomColor = Math.random() * 60 - 30;
                for (let dx = x; dx < x + 31 ; dx++) {
                    for (let dy = y; dy < y + 31; dy++) {
                        // get color of individual pixel
                        let pixelColor = context.getImageData(dx, dy, 1, 1).data;
                        // randomize only if the pixel has been drawn
                        if (pixelColor[0] !== 0) {
                            context.fillStyle = `rgb(${pixelColor[0]}, 
                                ${pixelColor[1] + randomColor},
                                ${pixelColor[2] + randomColor})`;
                            context.fillRect(dx, dy, 1, 1);
                        }
                        
                    }
                }
            }
        }

        // do the same thing but starting at bottom right for more diversity
        for (let x = canvas.width; x > 31; x -= 31) {
            for (let y = canvas.height; y > 31; y -= 31) {
                // color that will be added to the next 31 x 31 pixels portion 
                let randomColor = Math.random() * 60 - 30;
                for (let dx = x; dx > x - 31; dx--) {
                    for (let dy = y; dy > y - 31; dy--) {
                        // get color of individual pixel
                        let pixelColor = context.getImageData(dx, dy, 1, 1).data;
                        if (pixelColor[0] !== 0) {
                            context.fillStyle = `rgb(${pixelColor[0]}, 
                                ${pixelColor[1] + randomColor},
                                ${pixelColor[2] + randomColor})`;
                            context.fillRect(dx, dy, 1, 1);
                        }
                    }
                }
            }
        }
        
    }

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                draw,
                clearCanvas,
                randomizeCanvas,
                getCanvasImage,
                drawImageOnCanvas,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);