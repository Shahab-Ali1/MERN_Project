// GenericButton.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const GenericButton = ({ text, onClick, type = 'button', disabled = false, style = {}, className = '' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.genericButton} ${className}`}
            style={style}
        >
            {text}
        </button>
    );
};

GenericButton.propTypes = {
    text: PropTypes.string.isRequired, // The text displayed on the button
    onClick: PropTypes.func, // Function to execute on button click
    type: PropTypes.oneOf(['button', 'submit', 'reset']), // Button type
    disabled: PropTypes.bool, // Whether the button is disabled
    style: PropTypes.object, // Inline styles
    className: PropTypes.string, // Additional CSS classes
};

GenericButton.defaultProps = {
    onClick: () => {},
    disabled: false,
    style: {},
    className: '',
};

export default GenericButton;
