import React, { useContext, useRef } from 'react'
import Particle from '../objects/Particle';

const ParticlesContext = React.createContext();

export const ParticlesProvider = ({children}) => {
    
    const particles = useRef([]);

    const initParticles = (nParticles) => {
        let parts = []
        for (let i = 0; i < nParticles; i++) {
            parts.push(new Particle());
        }
        particles.current = parts;
    }

    const updateParticles = (solutionSpace) => {
        console.log("TODO");
    }

    return (
        <ParticlesContext.Provider
            value={{
                particles,
                initParticles,
                updateParticles
            }}
        >
            {children}
        </ParticlesContext.Provider>
    );
};

export const useParticles = () => useContext(ParticlesContext);