import PropTypes from 'prop-types'
import { useState } from 'react'

const Slider = ({ text, defValue, min, max, step, changeValue, change }) => {
    const [state, setState] = useState(defValue)
    
    return (
        <div className="range-slider">
            <h3>{text}</h3>
            <input type="range" value={state} min={min} max={max} step={step} 
                onChange={(event) => {
                    change(true)
                    changeValue(parseInt(event.target.value))
                    setState(event.target.value)
                }}/>
            <span>{state}</span>
        </div>
    )
}

Slider.defaultProps = {
    step: 1,
}

Slider.propTypes = {
    text: PropTypes.string.isRequired,
    defValue: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
}

export default Slider
