class Particle {
    constructor() {
        let posX = Math.random() * 100;
        let posY = Math.random() * 100;
        this.position = [posX, posY];

        // velocity is a random value in [-1, 1]
        let velX = Math.random() * 2 - 1;
        let velY = Math.random() * 2 - 1;
        this.velocity = [velX, velY];

        this.bestFitness = -Infinity;
        this.bestPostion = this.position;
    };

    update(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }

    setBest(position, fitness) {
        this.bestPostion = position;
        this.bestFitness = fitness;
    }
}

export default Particle;