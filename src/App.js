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

  const [hasChanged, setHasChanged] = useState(false);
  const [nParticles, setNParticles] = useState(10);
  const [inertia, setInerita] = useState(0.9);
  const [maxVelocity, setMaxVelocity] = useState(20);
  const [cognitive, setCognitive] = useState(0.5);
  const [social, setSocial] = useState(0.5);
  const [range, setRange] = useState(nParticles);

  const [particles, setParticles] = useState(Particle.initParticles(nParticles));


  const changeNumberOfParticles = value => {
    setNParticles(value);
    if (nParticles < range) {
      setRange(value);
    }
  }

  console.log(range);


  useState(() => {

  }, [speed, isPlaying]);

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
              min={-50} max={50} defValue={brushStrength} step={5} 
              changeValue={setBrushStrength} />
            <Slider 
              text={"Brush Size"} 
              min={-50} max={50} defValue={brushSize} step={5}
              changeValue={setBrushSize} />
          </div>}
          <div className="buttons">
            <Button 
              text={isPlaying ? "Pause" : "Play"}
              // TODO: more stuff might need to go in here
              onClick={() => {
                setIsPlaying(!isPlaying)
                setShowEditSpace(false)
              }}
              color={isPlaying ? "white" : "#e84545"} />
            <Button 
              text={"Reset"} 
              onClick={() => {
                setParticles(Particle.initParticles(nParticles));
                setIsPlaying(true);
                setHasChanged(false);
                setShowEditSpace(false);
              }}
              color={hasChanged ? "#e84545" : "white"} />
            {!showEditSpace && 
            <Button 
              text={"Edit Solution Space"} 
              onClick={() => {
                setShowEditSpace(!showEditSpace)
                setIsPlaying(false)
              }} />
            }
            </div>
          {/* <Canvas nParticles={50} speed={speed} scale={scale} /> */}
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
