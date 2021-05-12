import PropTypes from 'prop-types'
import { useState } from 'react'

const Slider = ({ text, defValue, min, max, step, changeValue, change }) => {
    
    return (
        <div className="range-slider">
            <h3>{text}</h3>
            <input type="range" value={defValue} min={min} max={max} step={step} 
                onChange={(event) => {
                    if (change !== null) {
                        change(true)
                    }
                    changeValue(parseFloat(event.target.value))
                }}/>
            <span>{step < 1 ? defValue.toFixed(2) : defValue}</span>
        </div>
    )
}

Slider.defaultProps = {
    step: 1,
    change: null,
}

Slider.propTypes = {
    text: PropTypes.string.isRequired,
    defValue: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
}

export default Slider
