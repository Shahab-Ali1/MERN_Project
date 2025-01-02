import React from "react";
import { Select, FormControl, InputLabel, MenuItem, } from "@mui/material";

const GenericDropdown = ({ label = "", value = "", options = [], onChange = null }) => {
    return (
        <FormControl size="small" variant="outlined">
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                value={value}
                onChange={onChange}
                label={label}
            >
                {/* Default empty option */}
                <MenuItem value="">
                None
                </MenuItem>

                {/* Map through options and render MenuItems */}
                {options && options.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GenericDropdown;
