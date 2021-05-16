import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCanvas } from './CanvasContext'
import { useParticles } from './ParticlesContext'
import VectorUtil from '../objects/VectorUtil'

const getOrthogonalVector = (vect) => {
    return [-vect[1], vect[0]]
}
  
const getVectorLength = (vect) => {
    return Math.sqrt(
        Math.pow(vect[0], 2) + Math.pow(vect[1], 2)
    )
}

const multiplyVectors = (vect1, vect2) => {
    return [vect1[0] * vect2[0],
            vect1[1] * vect2[1]];
}

const normalizeVector = (vect) => {
    let length = getVectorLength(vect);
    return [vect[0] / length,
            vect[1] / length]
}

const Canvas = ({ brushSize, brushStrength, showEditSpace, isPlaying, speed, scale,  }) => {    
    const {
        particles,
        updateParticles,
    } = useParticles();

    const {
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        drawImageOnCanvas,
    } = useCanvas();

    const [solutionSpace, setSolutionSpace] = useState(null);

    const resetSolutionSpace = () => {
        let canvas = canvasRef.current;
        let context = contextRef.current;
        let image = context.getImageData(0, 0, canvas.width, canvas.height);
        setSolutionSpace(image);
    }

    useEffect(() => {
        console.log("Canvas.js init use Effect")
        prepareCanvas();
        resetSolutionSpace();

        let pixelColor = contextRef.current.getImageData(10, 10, 1, 1).data;
        console.log(pixelColor);
    }, []);   

    // Method draws a triangle around the particle's position, taking into consideration it's velocity (direction)
    // The triangle is isosceles and has sharpest angle at the particle's position
    // The direction of the particle's velocity (where it is going) is perpendicular to the triangle's base.
    // graphic description: https://i.imgur.com/N8GFHQT.png
    const drawParticle = (particle, canvasWidth, canvasHeight) => {
        const context = contextRef.current;
        // context.fillStyle = "#002e4a"

        // scale particle dims
        let scalingVector = [canvasWidth / 100, canvasHeight / 100];
        let position = multiplyVectors(particle.position, scalingVector);
        let velocity = multiplyVectors(particle.velocity, scalingVector);

        // draw particle on canvas
        velocity = normalizeVector(velocity);
        let base = [position[0] - 10 * scale * velocity[0],
                    position[1] - 10 * scale * velocity[1]];
        let orthoVect = getOrthogonalVector(velocity);

        contextRef.current.fillStyle = "#002e4a";
        context.beginPath();
        // start at current particle position
        context.moveTo(position[0], position[1])
        // draw triangle edge
        context.lineTo(base[0] - 3 * scale * orthoVect[0],
                       base[1] - 3 * scale * orthoVect[1])
        // draw triangle base
        context.lineTo(base[0] + 3 * scale * orthoVect[0],
                       base[1] + 3 * scale * orthoVect[1])
        // draw the other edge (back to starting posistion)
        context.lineTo(position[0], position[1])
        contextRef.current.fill()
    }

    const drawParticles = () => {
        let canvasWidth = canvasRef.current.width;
        let canvasHeight = canvasRef.current.height;

        particles.current.forEach((particle) => drawParticle(particle, canvasWidth, canvasHeight));
    }



    // useEffect(() => {

    // })





    useEffect(() => {
        let intervalId = setInterval(() => {
            if (isPlaying) {
                drawImageOnCanvas(solutionSpace);

                let canvasWidth = canvasRef.current.width;
                let canvasHeight = canvasRef.current.height;

                particles.current.forEach((particle) => drawParticle(particle, canvasWidth, canvasHeight));
                
                updateParticles(solutionSpace);
            }
        }, speed)

        return () => {
            console.log(isPlaying);
            clearInterval(intervalId);
            if (!isPlaying) {
                resetSolutionSpace();
            }
            drawImageOnCanvas(solutionSpace);
        }
    }, [isPlaying, speed, scale]);

    const canvasStartDrawing = ({ nativeEvent }) => {
        if (showEditSpace) {
            startDrawing({nativeEvent}, brushStrength, brushSize)
        }
    }
    return (
        <canvas
            onMouseDown={canvasStartDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    )
}

Canvas.defaultProps = { }

Canvas.propTypes = {
    brushSize: PropTypes.number.isRequired,
    brushStrength: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
}

export default Canvas
