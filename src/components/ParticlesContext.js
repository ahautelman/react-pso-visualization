import React, { useContext, useRef } from 'react'
import Particle from '../objects/Particle'
import VectorUtil from '../objects/VectorUtil'

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

    const getFitness = (particle, solutionSpace) => {
        let scalingVector = [solutionSpace.width / 100, solutionSpace.height / 100];
        let position = VectorUtil.floor(
            VectorUtil.multiplyVectors(particle.position, scalingVector));

        let solutionSpaceData = solutionSpace.data;
        // the data array stores 4 values per pixel
        let positionOffset = 4 * (solutionSpace.width * position[1] + position[0]);

        // return red value - green value of particle's position
        return solutionSpaceData[positionOffset] - solutionSpaceData[positionOffset + 1];
    }

    // TODO: optimize
    const updateParticles = (solutionSpace, inertia, maxVelocity, cognitive, social, range) => {
        if (solutionSpace === undefined) {
            return;
        }

        let fitnessMap = new Map();

        particles.current.forEach((particle) => {
            fitnessMap.set(particle, getFitness(particle, solutionSpace));
        })

        console.log(fitnessMap);

        for (let particle of particles.current) {
            console.log(particle)
        }

        // for (let particle of particles.current) {
        //     console.log(particle)
        //     let bestNeighbourFitness = -Infinity;
        //     let bestNeighbourPosition = particle.bestPosition;

        //     for (let otherParticle of particles.current) {
        //         if (VectorUtil.vectorsDistance(particle.position, otherParticle.position) < range) {
        //             if (bestNeighbourFitness < fitnessMap.get(otherParticle)) {
        //                 bestNeighbourFitness = fitnessMap.get(otherParticle);
        //                 bestNeighbourPosition = otherParticle.position;
        //             }
        //         }
        //     }

        //     let position = [0, 0];
        //     let velocity = [0, 0];

        //     for (let i = 0 ; i <= 1; i++) {
        //         let r1 = Math.random();
        //         let r2 = Math.random();

        //         velocity[i] = inertia * particle.velocity[i] 
        //             // cognitive component    
        //             + cognitive * r1 * [particle.bestPosition[i] - particle.position[i]]
        //             // social componenet
        //             + social * r2 * [bestNeighbourPosition[i] - particle.position[i]];

        //         if (velocity[i] > maxVelocity) {
        //             velocity[i] = maxVelocity;
        //         }
                
        //         position[i] = particle.position[i] + velocity[i];
        //     }

        //     console.log(position);
        //     console.log(velocity)

        //     particle.update(position, velocity);
            

        //     // update best position and fitness if needed
        //     let newFitness = getFitness(particle, solutionSpace); 
        //     if (newFitness >= particle.bestFitness) {
        //         particle.setBest(position, newFitness);
        //     }
        // }
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