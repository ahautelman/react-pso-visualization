import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Canvas = ({ }) => {
    const [isDrawing, setIsDrawing] = useState(false)

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const drawParicles = () => {
        contextRef.current.fillStyle = "white"
        contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

            // method draws a triangle around the particle's position, taking into consideration it's velocity (direction)
    // The triangle is isosceles and has sharpest angle at the particle's position
    // The direction of the particle's velocity (where it is going) is perpendicular to the triangle's base.
    // graphic description: https://i.imgur.com/N8GFHQT.png
    // draw() { 
    //     let length = getVectorLength(this.velocity)
    //     // normalized velocity vector
    //     let normalized = this.velocity.map((dim) => dim / length)
    //     let base = [this.position[0] - 10 * scale * normalized[0],
    //                 this.position[1] - 10 * scale * normalized[1]]
    //     // direction of triangle's base
    //     let orthoVect = getOrthogonalVector(normalized)

    //     contextRef.current.fillStyle = "#002e4a"
    //     contextRef.current.beginPath();
    //     // start at current particle position
    //     contextRef.current.moveTo(this.position[0], this.position[1])
    //     // draw triangle edge
    //     contextRef.current.lineTo(base[0] - 3 * scale * orthoVect[0],
    //                 base[1] - 3 * scale * orthoVect[1])
    //     // draw triangle base
    //     contextRef.current.lineTo(base[0] + 3 * scale * orthoVect[0],
    //                 base[1] + 3 * scale * orthoVect[1])
    //     // draw the other edge (back to starting posistion)
    //     contextRef.current.lineTo(this.position[0], this.position[1])
    //     contextRef.current.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 9 / 10;
        canvas.height = window.innerHeight * 4 / 5;

        const context = canvas.getContext("2d");
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = 5
        contextRef.current = context;

    }, [])

    const startDrawing = ({ nativeEvent }) => {
        const {offsetX, offsetY} = nativeEvent
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

    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    )
}

Canvas.defaultProps = { }

Canvas.propTypes = {
    // speed: PropTypes.number.isRequired,
    // scale: PropTypes.number.isRequired,
    
    // nParticles: PropTypes.number.isRequired,
    // inertia: PropTypes.number.isRequired,
    // maxVelocity: PropTypes.number.isRequired,
    // cognitive: PropTypes.number.isRequired,
    // social: PropTypes.number.isRequired,
    // range: PropTypes.number.isRequired,

    // reset: PropTypes.bool,
    // isEditting: PropTypes.bool
}

export default Canvas
