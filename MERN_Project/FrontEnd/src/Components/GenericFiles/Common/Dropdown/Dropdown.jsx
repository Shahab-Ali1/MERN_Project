import React from "react";
import { Select, FormControl, InputLabel, MenuItem, } from "@mui/material";

const GenericDropdown = ({ label = "", value = "", name = "", disabled = false, options = [], onChange = null, valueId = "", displayValue = "" }) => {
    return (
        <FormControl size="small" variant="outlined">
            <InputLabel id={`${label}-label`} disabled={disabled}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                value={value}
                onChange={onChange}
                label={label}
                name={name}
                disabled={disabled}
            >
                {/* Default empty option */}
                <MenuItem value="None">
                    None
                </MenuItem>

                {/* Map through options and render MenuItems */}
                {options && options.map((option, index) => (
                    <MenuItem key={index} value={option[valueId]}>
                        {option[displayValue]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GenericDropdown;
