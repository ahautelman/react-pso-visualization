import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCanvas } from './CanvasContext'
import { useParticles } from './ParticlesContext'

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


const Canvas = ({ brushSize, brushStrength, 
    showEditSpace, isPlaying, speed, scale, 
    inertia, maxVelocity, cognitive, social, range }) => {    
    
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
        getCanvasImage,
        drawImageOnCanvas,
    } = useCanvas();

    const [solutionSpace, setSolutionSpace] = useState();

    useEffect(() => {
        prepareCanvas();
    }, []);   

    // Method draws a triangle around the particle's position, taking into consideration it's velocity (direction)
    // The triangle is isosceles and has sharpest angle at the particle's position
    // The direction of the particle's velocity (where it is going) is perpendicular to the triangle's base.
    // graphic description: https://i.imgur.com/N8GFHQT.png
    const drawParticle = (particle, canvasWidth, canvasHeight) => {
        const context = contextRef.current;

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

    // TODO: this could go into CanvasContext
    const drawParticles = () => {
        let canvasWidth = canvasRef.current.width;
        let canvasHeight = canvasRef.current.height;

        particles.current.forEach((particle) => drawParticle(particle, canvasWidth, canvasHeight));
    }

    const updateSolutionSpace = () => {
        setSolutionSpace(getCanvasImage);
    }

    const drawSolutionSpaceOnCanvas = () => {
        drawImageOnCanvas(solutionSpace);
    }

    useEffect(() => {
        let intervalID = setInterval(() => {
            if (isPlaying) {
                drawSolutionSpaceOnCanvas();
                drawParticles();
                updateParticles(solutionSpace, inertia, maxVelocity, cognitive, social, range);
            }
        }, speed);

        return () => {
            clearInterval(intervalID);
        }
    }, [isPlaying, speed, scale, solutionSpace]);

    useEffect(() => {
        if (showEditSpace) {
            drawImageOnCanvas(solutionSpace);
        }

        return () => {
            if (showEditSpace) {
                updateSolutionSpace()
            }
        }
    }, [showEditSpace])

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

Canvas.propTypes = {
    brushSize: PropTypes.number.isRequired,
    brushStrength: PropTypes.number.isRequired,
    showEditSpace: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    inertia: PropTypes.number.isRequired,
    maxVelocity: PropTypes.number.isRequired,
    cognitive: PropTypes.number.isRequired,
    social: PropTypes.number.isRequired,
    range: PropTypes.number.isRequired,
}

export default Canvas
