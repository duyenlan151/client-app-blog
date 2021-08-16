import { TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from "react";
import { useController } from "react-hook-form";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         flexWrap: "wrap",
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: "25ch",
//     },
// }));

InputField.propTypes = {
    // field: PropTypes.object.isRequired,
    // form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    errorMsg: PropTypes.string,
    isRequire: PropTypes.bool,
}

InputField.defaultProps = {
    type: "text",
    label: "Label",
    placeholder: "",
    disabled: false,
    isRequire: '',
    errorMsg: null,
};

export default function InputField(props) {
    // const classes = useStyles();
    const { 
        type, 
        label, 
        placeholder, 
        disabled, 
        control, 
        name, 
        errorMsg,
        isRequire,
        rows
    } = props;
    const {
        field: { value, onChange},
      } = useController({
        name,
        control,
        // defaultValue: name
      });
    const error = errorMsg
    ? true
    : false
    
    return (
        <TextField
            required={isRequire}
            onChange={onChange}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={value}
            type={type}
            multiline
            rows={rows}

            error={error}
            helperText={errorMsg}
            
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
        />
    );
}

