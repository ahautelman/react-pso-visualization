const Formula = () => {
    return (
        <div >
            <h1 className="formula">
                <span id="velocity"> v<sub>ij</sub>(t + 1) </span>=
                <span id="inertia"> τ </span>v<sub>ij</sub>(t) + 
                <span id="cognitive">c<sub>1</sub></span>r<sub>1j</sub>(t)·
                [y<sub>ij</sub>(t) - x<sub>ij</sub>(t)] + 
                <span id="social">c<sub>2</sub></span>r<sub>2j</sub>(t) · 
                [ŷ<sub>ij</sub>(t) - x<sub>ij</sub>(t)]
            </h1>
        </div>
    );
}

export default Formula
