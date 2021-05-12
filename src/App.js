import './App.css';
import Header from './components/Header'
import Slider from './components/Slider'
import Button from './components/Button'
import Particle from './objects/Particle'
import VectorUtil from './objects/VectorUtil'
import Canvas from './components/Canvas';
import { useState } from 'react'

function App() {
  const [speed, setSpeed] = useState(500);
  const [scale, setScale] = useState(2);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEditSpace, setShowEditSpace] = useState(false);
  const [brushStrength, setBrushStrength] = useState(10);
  const [brushSize, setBrushSize] = useState(10);

  const [hasChanged, setHasChanged] = useState(false)
  const [nParticles, setNParticles] = useState(20)
  const [inertia, setInerita] = useState(0.9)
  const [maxVelocity, setMaxVelocity] = useState(20)
  const [cognitive, setCognitive] = useState(0.5)
  const [social, setSocial] = useState(0.5)
  const [range, setRange] = useState(nParticles)

  const [particles, setParticles] = useState()



  useState(() => {

  }, [speed, isPlaying])

  return (
    <>
      <Header />

      <div className="body">
        <div className="slider">
          <Slider text={"Speed"} min={100} max={2000} defValue={speed} step={100} changeValue={setSpeed} change={setHasChanged} />
          <Slider text={"Particle Size"} min={1} max={4} defValue={scale} step={1} changeValue={setScale} change={setHasChanged} />
        </div>

        <div className="container">
          {showEditSpace && 
            <div className="space-edit" >
            <Slider text={"Brush Strength"} min={-50} max={50} defValue={brushStrength} step={5} />
            <Slider text={"Brush Size"} min={-50} max={50} defValue={brushSize} step={5} />
          </div>}
          <div className="buttons">
            <Button text={"Play"} />
            <Button text={"Reset"} 
              onClick={() => {
                setParticles(Particle.initParticles(nParticles));
                setIsPlaying(true);
              }}
              color={hasChanged ? "#e84545" : "white"} />
            <Button text={showEditSpace ? "Finish Edit" : "Edit Solution Space"} 
              onClick={() => setShowEditSpace(!showEditSpace)} 
              color={showEditSpace ? "#e84545" : "white"} />
            </div>
          {/* <Canvas nParticles={50} speed={speed} scale={scale} /> */}
        </div>

        <div className="slider">
          <Slider text={"Number of Particles"} min={5} max={50} defValue={nParticles} />
          <Slider text={"Inertia"} min={0.1} max={1} defValue={inertia} step={0.05} />
          <Slider text={"Max Velocity"} min={1} max={20} defValue={maxVelocity} />
        </div>

        <div className="slider">
          <Slider text={"Cognitive Component"} min={0} max={1} defValue={cognitive} step={0.05} />
          <Slider text={"Social Component"} min={0} max={1} defValue={social} step={0.05} />
          <Slider text={"Range"} min={1} max={nParticles} defValue={range} />
        </div>
      </div>
    </>
  );
}

export default App;
