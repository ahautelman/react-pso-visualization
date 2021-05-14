import './App.css';
import Header from './components/Header'
import Slider from './components/Slider'
import Button from './components/Button'
import Canvas from './components/Canvas';
import { useState, useRef } from 'react'
import { useCanvas } from './components/CanvasContext';
import { useParticles } from './components/ParticlesContext';

function App() {
  const {
    clearCanvas,
    randomizeCanvas,
  } = useCanvas();

  const {
    initParticles,
  } = useParticles();

  const [speed, setSpeed] = useState(500);
  const [scale, setScale] = useState(2);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEditSpace, setShowEditSpace] = useState(false);
  const [brushStrength, setBrushStrength] = useState(3);
  const [brushSize, setBrushSize] = useState(10);

  const [hasChanged, setHasChanged] = useState(false);
  const [nParticles, setNParticles] = useState(10);
  const [inertia, setInerita] = useState(0.9);
  const [maxVelocity, setMaxVelocity] = useState(20);
  const [cognitive, setCognitive] = useState(0.5);
  const [social, setSocial] = useState(0.5);
  const [range, setRange] = useState(nParticles);

  useRef(() => {
    initParticles(nParticles);
  }, [])

  const changeNumberOfParticles = value => {
    setNParticles(value);
    if (nParticles < range) {
      setRange(value);
    }
  }

  return (
    <>
      <Header />

      <div className="body">
        <div className="slider">
          <Slider text={"Speed"} 
            min={100} max={2000} defValue={speed} step={100} 
            changeValue={setSpeed} />
          <Slider 
            text={"Particle Size"} 
            min={1} max={4} defValue={scale} step={1} 
            changeValue={setScale} />
        </div>

        <div className="container">
          {showEditSpace && 
          <div className="space-edit" >
            <Slider 
              text={"Brush Strength"} 
              min={0} max={5} defValue={brushStrength} 
              changeValue={setBrushStrength} />
            <Slider 
              text={"Brush Size"} 
              min={5} max={50} defValue={brushSize} step={5}
              changeValue={setBrushSize} />
            <Button
              text="Randomize"
              onClick={randomizeCanvas} />
          </div>}
          <div className="buttons">
            <Button 
              text={isPlaying ? "Pause" : "Play"}
              // TODO: more stuff might need to go in here
              onClick={() => {
                setIsPlaying(!isPlaying);
                setShowEditSpace(false);
              }}
              color={isPlaying ? "white" : "#e84545"} />
            <Button 
              text={"Reset"} 
              onClick={() => {
                setIsPlaying(false);
                initParticles(nParticles);
                setIsPlaying(true);
                setHasChanged(false);
                setShowEditSpace(false);
              }}
              color={hasChanged ? "#e84545" : "white"} />
            {!showEditSpace && 
            <Button 
              text={"Edit Solution Space"} 
              onClick={() => {
                setShowEditSpace(true)
                setIsPlaying(false)
              }} />
            }
            </div>
          
          <Canvas 
            brushSize={brushSize} 
            brushStrength={brushStrength} 
            showEditSpace={showEditSpace}
            isPlaying={isPlaying}
            speed={speed} 
            scale={scale} />
        </div>

        <div className="slider">
          <Slider 
            text={"Number of Particles"} 
            min={5} max={50} defValue={nParticles}
            changeValue={changeNumberOfParticles}
            change={setHasChanged} />
          <Slider 
            text={"Inertia"} 
            min={0.1} max={1} defValue={inertia} step={0.05}
            changeValue={setInerita}
            change={setHasChanged} />
          <Slider 
            text={"Max Velocity"} 
            min={1} max={20} defValue={maxVelocity}
            changeValue={setMaxVelocity}
            change={setHasChanged} />
        </div>

        <div className="slider">
          <Slider 
            text={"Cognitive Component"} 
            min={0} max={1} defValue={cognitive} step={0.05}
            changeValue={setCognitive}
            change={setHasChanged} />
          <Slider 
            text={"Social Component"} 
            min={0} max={1} defValue={social} step={0.05}
            changeValue={setSocial}
            change={setHasChanged} />
          <Slider 
            text={"Range"} 
            min={1} max={nParticles} defValue={range}
            changeValue={setRange}
            change={setHasChanged} />
        </div>
      </div>
    </>
  );
}

export default App;
