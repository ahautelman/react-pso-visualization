import PropTypes from 'prop-types'

const Header = () => {
    return (
        <header>
            <h1>PARTICLE SWARM OPTIMIZATION VISUALIZER</h1>
            <div className="introduction">
                <h2>
                    <i>"In computational science, particle swarm optimization (PSO) is a computational 
                        method that optimizes a problem by iteratively trying to improve a 
                        candidate solution with regard to a given measure of quality." </i>
                        <sup><a href="https://en.wikipedia.org/wiki/Particle_swarm_optimization"> [1]</a></sup>
                </h2>
                <h2>
                    Each particle represents a possible solution, a vector of numbers, for which we can assess it's "fitness" or quality.
                    Every particle has it's own position and velocity; these two components drive the optimization process.
                </h2>
                <h2>
                    A swarm of particles synchronously "flies" over a hyper-dimensional solution space, targeting the best solution.
                </h2>
                <h2>
                    PSO does not guarantee that the best solution is found, but it can achieve great results in a faster way compared with other method. Another great advantage is that PSO does not require the problem to be differentiable.
                </h2>

                <h2><b>Note:</b></h2>
                <ul>
                    <li>
                        <h2>in this visualizer, the fitness of a solution is represented by it's redness.</h2>
                    </li>
                </ul>
            </div>
        </header>
    )
}

Header.propTypes = {
}

export default Header
