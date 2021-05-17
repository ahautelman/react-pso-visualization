class Particle {
    constructor(position, velocity) {
        if (!arguments.length) {
            let posX = Math.random() * 100;
            let posY = Math.random() * 100;
            this.position = [posX, posY];
    
            // velocity is a random value in [-1, 1]
            let velX = Math.random() * 2 - 1;
            let velY = Math.random() * 2 - 1;
            this.velocity = [velX, velY];
        } else {
            this.position = position;
            this.velocity = velocity;
        }


        this.bestFitness = -Infinity;
        this.bestPosition = this.position;
    };

    setBest(position, fitness) {
        this.bestPosition = position;
        this.bestFitness = fitness;
    }
}

export default Particle;