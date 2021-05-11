import PropTypes from 'prop-types'

const Button = ({ text, onClick, color }) => {
    return (
        <button onClick={onClick} style={{ backgroundColor: color }} >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: "white"
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
}

export default Button
