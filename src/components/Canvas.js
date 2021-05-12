import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const getOrthogonalVector = vect => {
    return [-vect[1], vect[0]]
}

const getVectorLength = vect => {
    return Math.sqrt(
            Math.pow(vect[0], 2) + Math.pow(vect[1], 2)
        )
}

const Canvas = ({ nParticles, speed, scale }) => {
    const [isDrawing, setIsDrawing] = useState(false)

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [particles, setParticles] = useState([])

    class Particle {
        constructor(maxWidth, maxHeight) {
            let posX = Math.random() * maxWidth
            let posY = Math.random() * maxHeight
            this.position = [posX, posY]
    
            // velocity is a random value in [-1, 1]
            let velX = Math.random() * 2 - 1
            let velY = Math.random() * 2 - 1
            this.velocity = [velX, velY]
        }
    
        // method draws a triangle around the particle's position, taking into consideration it's velocity (direction)
        // The triangle is isosceles and has sharpest angle at the particle's position
        // The direction of the particle's velocity (where it is going) is perpendicular to the triangle's base.
        // graphic description: https://i.imgur.com/N8GFHQT.png
        draw() { 
            let length = getVectorLength(this.velocity)
            // normalized velocity vector
            let normalized = this.velocity.map((dim) => dim / length)
            let base = [this.position[0] - 10 * scale * normalized[0],
                        this.position[1] - 10 * scale * normalized[1]]
            // direction of triangle's base
            let orthoVect = getOrthogonalVector(normalized)
    
            contextRef.current.fillStyle = "#002e4a"
            contextRef.current.beginPath();
            // start at current particle position
            contextRef.current.moveTo(this.position[0], this.position[1])
            // draw triangle edge
            contextRef.current.lineTo(base[0] - 3 * scale * orthoVect[0],
                        base[1] - 3 * scale * orthoVect[1])
            // draw triangle base
            contextRef.current.lineTo(base[0] + 3 * scale * orthoVect[0],
                        base[1] + 3 * scale * orthoVect[1])
            // draw the other edge (back to starting posistion)
            contextRef.current.lineTo(this.position[0], this.position[1])
            contextRef.current.fill()
        }
    }

    const initParticles = (maxWidth, maxHeight) => {
        for (let i = 0; i < nParticles; i++) {
            const newParticle = new Particle(maxWidth, maxHeight);
            setParticles([...particles, newParticle]);
        }
    }



    const drawParicles = () => {
        contextRef.current.fillStyle = "white"
        contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        let parts = []
        for (let i = 0; i < nParticles; i++) {
            parts.push(new Particle(canvasRef.current.width, canvasRef.current.height))
        }
        parts.forEach((particle) => particle.draw())
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

        let intervalId = setInterval(function() {
            console.log("draw")
            drawParicles()
        }, speed)

        return () => {
            clearInterval(intervalId)
            console.log("restarted drawing")
        }
    }, [speed])

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

Canvas.defaultProps = {
    nParticles: 50,
    scale: 2,
    speed: 5000, 
}

Canvas.propTypes = {
    nParticles : PropTypes.number,
    scale: PropTypes.number,
    speed: PropTypes.number,
}

export default Canvas






// import { useState, useRef, useEffect } from 'react'
// import PropTypes from 'prop-types'

// const Canvas = ({ nParticles, scale }) => {

//     const canvasRef = useRef()
//     const contextRef = useRef()

//     useEffect(() => {
//         const canvas = canvasRef.current
//         canvas.width = window.innerWidth * 2
//         canvas.height = window.innerHeight * 2

        // canvas.style.width = `${window.innerWidth}px`
//         canvas.style.height = `${window.innerHeight}px`

//         const context = canvas.getContext("2d")
//         context.scale(2, 2)

//         // TODO: change these to allow for drawing in solution space
//         context.lineCap = "round"
//         context.strokeStyle = "black"
//         context.lineWidth = 5
        
//         contextRef.current = context
//     }, [])

//     const initParticles = () => {
//         // const canvas = canvasRef.current
//         for (let i = 0; i < nParticles; i++) {
//             let newParticle = new Particle(800, 600)
//             setParticles([...particles, newParticle])
//         }
//     }

//     const [particles, setParticles] = useState([new Particle(), new Particle(), new Particle()])



//     const draw = () => {
//         const canvas = canvasRef.current
//         const ctx = canvas.getContext("2d")
//         ctx.clearRect(0, 0, canvas.width, canvas.height)
//         particles.forEach((particle) => particle.draw())
//     }

//     setInterval(function() {
//         initParticles()
//         draw()
//     }, 2000)