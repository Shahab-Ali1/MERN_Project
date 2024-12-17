import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import styles from "./TextField.module.css";

const GenericTextField = ({
    id = "outlined-basic",
    label,
    value,
    onChange,
    fullWidth = true,
    error = false,
    helperText = "",
    disabled = false,
    ...props
}) => {
    return (
        <TextField
            size="small"
            id={id}
            label={label}
            value={value}
            onChange={onChange}
            variant={"outlined"}
            fullWidth={fullWidth}
            error={error}
            helperText={helperText}
            disabled={disabled}
            className={styles?.textField}
            {...props}
        />
    );
};

GenericTextField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
    fullWidth: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default GenericTextField;
