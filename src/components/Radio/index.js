import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useController } from "react-hook-form";
import { FormHelperText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function RadiotGroup({ name, control, label, disabled, options, errorMsg }) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <FormControl component="fieldset" error={errorMsg}>
            <FormLabel component="legend">
                <Typography variant="body2" gutterBottom>
                    Type
                </Typography>
            </FormLabel>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                <FormControlLabel
                    value="news"
                    control={<Radio />}
                    label="News"
                />
                <FormControlLabel
                    value="sport"
                    control={<Radio />}
                    label="Sport"
                />
                <FormControlLabel
                    value="others"
                    control={<Radio />}
                    label="Others"
                />
            </RadioGroup>
            <FormHelperText>{errorMsg}</FormHelperText>
        </FormControl>
    );
}

RadiotGroup.propTypes = {};

export default RadiotGroup;
