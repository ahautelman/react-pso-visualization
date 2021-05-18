import './App.css';
import Header from './components/Header';
import Slider from './components/Slider';
import Button from './components/Button';
import Canvas from './components/Canvas';
import Formula from './components/Formula';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
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
  const [range, setRange] = useState(100);

  const sexyRed = "#e84545";

  useEffect(() => {
    console.log("App.js use effect")
    initParticles(nParticles);
  }, [])

  const setColorOnElement = ( id, color ) => {
    console.log("hovering");
    let span = document.getElementById(id);
    console.log(span);
    span.style.backgroundColor = color;
  }

  return (
    <>
      <Header />

      <div className="body">
        <div className="slider">
          <Slider text={"Delay"} 
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
            scale={scale} 
            inertia={inertia} 
            maxVelocity={maxVelocity}
            cognitive={cognitive}
            social={social}
            range={range} />
        </div>

        <div className="slider">
          <Slider 
            text={"Number of Particles"} 
            min={1} max={50} defValue={nParticles}
            changeValue={setNParticles}
            change={setHasChanged} />
          <Slider 
            text={"Max Velocity"} 
            min={1} max={20} defValue={maxVelocity}
            changeValue={setMaxVelocity}
            change={setHasChanged}
            onMouseEnter={() => setColorOnElement("velocity", sexyRed)}
            onMouseLeave={() => setColorOnElement("velocity", "white")} />
          <Slider 
            text={"Inertia"} 
            min={0.0} max={1} defValue={inertia} step={0.05}
            changeValue={setInerita}
            change={setHasChanged}
            onMouseEnter={() => setColorOnElement("inertia", sexyRed) }
            onMouseLeave={() => setColorOnElement("inertia", "white")} />
        </div>

        <div className="slider">
          <Slider 
            text={"Cognitive Component"} 
            min={0} max={1} defValue={cognitive} step={0.05}
            changeValue={setCognitive}
            change={setHasChanged}
            onMouseEnter={() => setColorOnElement("cognitive", sexyRed)}
            onMouseLeave={() => setColorOnElement("cognitive", "white")} />
          <Slider 
            text={"Social Component"} 
            min={0} max={1} defValue={social} step={0.05}
            changeValue={setSocial}
            change={setHasChanged}
            onMouseEnter={() => setColorOnElement("social", sexyRed)}
            onMouseLeave={() => setColorOnElement("social", "white")} />
          <Slider 
            text={"Range"} 
            min={1} max={100} defValue={range}
            changeValue={setRange}
            change={setHasChanged} />
        </div>

        <Formula />

        <Footer />
      </div>
    </>
  );
}

export default App;
