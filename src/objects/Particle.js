class Particle {
    constructor() {
        let posX = Math.random() * 100;
        let posY = Math.random() * 100;
        this.position = [posX, posY];

        // velocity is a random value in [-1, 1]
        let velX = Math.random() * 2 - 1;
        let velY = Math.random() * 2 - 1;
        this.velocity = [velX, velY];
    };

    update() { };

    static initParticles = nParticles => {
        let particles = [];
        for (let i = 0; i < nParticles; i++) {
            particles.push(new Particle());
        }
        return particles;
    }
}

export default Particle;