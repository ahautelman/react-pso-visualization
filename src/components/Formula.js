const Formula = () => {
    return (
        <div >
            <h1 className="formula">
                <span id="velocity"> v<sub>ij</sub>(t + 1) </span>=
                <span id="inertia"> τ </span>v<sub>ij</sub>(t) + 
                <span id="cognitive">c<sub>1</sub></span>r<sub>1</sub>(t)
                [y<sub>ij</sub>(t) - x<sub>ij</sub>(t)] + 
                <span id="social">c<sub>2</sub></span>r<sub>2</sub>(t)
                [ŷ<sub>ij</sub>(t) - x<sub>ij</sub>(t)]
            </h1>

            <ul className="formula-extra">
                <li><h2>
                    the <b>position</b> of particle <i>i</i> at time stamp <i>t</i> is calculated based on it's velocity:  
                    <p className="explanation">
                        <i> x<sub>i</sub>(t + 1) = x<sub>i</sub>(t) + v<sub>i</sub>(t + 1) </i>
                    </p>
                </h2></li>
                <li><h2>
                the positions of the particles are <b>initialized randomly</b>, having values in the range <i>[0, 100]</i>
                </h2></li>
                <li><h2>
                    <i> v<sub>ij</sub></i> is the <b>velocity</b> for particle <i>i</i> in direction <i>j</i>.
                </h2></li>
                <li><h2>
                    the hyperparameter τ defines the ability of the swarm to <b>change its direction</b>. 
                    A lower <b>inertia</b> value will lead to a stronger convergence of the swarm, but also to a weaker exploration of the solution space.  
                </h2></li>
                <li><h2>
                    the coefficients <i>c<sub>1</sub></i> and <i>c<sub>2</sub></i> are called <b>acceleration coefficients</b>.
                </h2></li>
                <li><h2>
                    <i>c<sub>1</sub></i> allows the particle to be influenced by its own <b>best personal solution</b> found over the iterations.
                </h2></li>
                <li><h2>
                    the factor
                    <p className="explanation">
                        <i> y<sub>ij</sub>(t) - x<sub>ij</sub>(t) </i>
                    </p>
                    is known as the <b>congitive component</b>. Where <i> y<sub>ij</sub>(t) </i> is the position of the best solution found by particle <i> i </i> after <i> t </i> steps.
                </h2></li>
                <li><h2>
                    <i>c<sub>2</sub></i> allows the particle to be influenced by the <b>best global solution</b> found by the swarm (or sub-swarm) over the iterations.
                </h2></li>
                <li><h2>
                    the following is known as the <b>social component</b>
                    <p className="explanation">
                        <i> ŷ<sub>ij</sub>(t) - x<sub>ij</sub>(t) </i>
                    </p>
                </h2></li>
                <li><h2>
                    the <i>c<sub>1</sub></i> and <i>c<sub>2</sub></i> coefficients are therefore <b>complentary</b>.
                    A combination of the two increases both <b>exploration</b> and <b>exploitation</b>. 
                    It is considered good practice in academia for the two values to be equal, or close, in order to obtain the best results.                </h2></li>
                <li><h2>
                    <i> r<sub>1</sub></i> and <i> r<sub>2</sub> </i> are random values in the range [0, 1] meant to simulate the <b>"free will"</b> of the particle.
                </h2></li>
                <li><h2>
                    the <i> range </i> hyperparameter defines the distance between particles for them to be considered to belong to the same sub-swarm.
                    A lower value provides more diversity and a lower chance of particles getting stuck in a <b>local optimum</b>, but it is more computationally expensive.
                </h2></li>
                <li><h2>
                    the <i>maximum velocity </i> factor is also an important <b>improvement</b> of the algorithm. 
                    If the velocity is too high, the particle might "fly" over, and ignore, important areas of the solution space.
                </h2></li>

            </ul>
        </div>
    );
}

export default Formula
