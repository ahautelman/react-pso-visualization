import './App.css';
import Header from './components/Header'
import Slider from './components/Slider'
import Button from './components/Button'
import Canvas from './components/Canvas';
import { useState } from 'react'

function App() {
  const [showEditSpace, setShowEditSpace] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const [speed, setSpeed] = useState(500)
  

  return (
    <>
      <Header />

      <div className="body">
        <div className="slider">
          <Slider text={"Speed"} min={100} max={2000} defValue={speed} changeValue={setSpeed} change={setHasChanged} step={100}/>
          <Slider text={"Particle Size"} min={0.5} max={3} defValue={2} step={0.5} />
        </div>

        <div className="container">
          {showEditSpace && 
            <div className="space-edit" >
            <Slider text={"Brush Strength"} min={-50} max={50} defValue={10} step={5} />
            <Slider text={"Brush Size"} min={-50} max={50} defValue={10} step={5} />
          </div>}
          <div className="buttons">
            <Button text={"Play"} />
            <Button text={"Reset"} />
            <Button text={showEditSpace ? "Finish Edit" : "Edit Solution Space"} 
              onClick={() => setShowEditSpace(!showEditSpace)} 
              color={showEditSpace ? "#e84545" : "white"} />
            </div>
          <Canvas nParticles={50} speed={speed} />
        </div>

        <div className="slider">
          <Slider text={"Number of Particles"} min={5} max={50} defValue={25} />
          <Slider text={"Inertia"} min={0.1} max={1} defValue={0.9} step={0.05} />
          <Slider text={"Max Velocity"} min={1} max={20} defValue={20} />
        </div>

        <div className="slider">
          <Slider text={"Cognitive Component"} min={0} max={1} defValue={0.5} step={0.05} />
          <Slider text={"Social Component"} min={0} max={1} defValue={0.5} step={0.05} />
          <Slider text={"Range"} min={1} max={25} defValue={25} />
        </div>
      </div>
    </>
  );
}

export default App;
