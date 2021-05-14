import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCanvas } from './CanvasContext'
import { useParticles } from './ParticlesContext'
import VectorUtil from './../objects/VectorUtil'

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

    const resetSolutionSpace = () => {
        let canvas = canvasRef.current;
        let context = contextRef.current;
        let image = context.getImageData(0, 0, canvas.width, canvas.height);
        setSolutionSpace(image);
    }

    const [solutionSpace, setSolutionSpace] = useState(null);

    useEffect(() => {
        prepareCanvas();
        resetSolutionSpace();
        console.log(solutionSpace);
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
        let position = VectorUtil.multiply(particle.position, scalingVector);
        let velocity = VectorUtil.multiply(particle.velocity, scalingVector);

        // draw particle on canvas
        velocity = VectorUtil.normalizeVector(velocity);
        let base = [position[0] - 10 * scale * velocity[0],
                    position[1] * 10 * scale * velocity[1]];
        let orthoVect = VectorUtil.getOthogonalVector(velocity);

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

        contextRef.current.fillStyle = "#002e4a";
        particles.current.forEach((particle) => drawParticle(particle, canvasWidth, canvasHeight));
    }

    useEffect(() => {
        resetSolutionSpace();
        console.log("solutionSpace")
        console.log(solutionSpace);

        let intervalId = setInterval(() => {
            if (isPlaying) {
                drawImageOnCanvas(solutionSpace);
                drawParticles();
                updateParticles(solutionSpace);
            }
        }, speed)

        return () => {
            clearInterval(intervalId);
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
