import React from 'react'

FileBase64.propTypes = {
    // field: PropTypes.object.isRequired,
    // form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
}

FileBase64.defaultProps = {
    type: "text",
    label: "Label",
    placeholder: "",
    disabled: false,
};

export default function FileBase64() {
    return (
        <FileBase64 
            accept="image/*" 
            multiple={false} 
            type="file" 
            control 
            name="attachment" 
            onDone={({ base64 }) => setValue('attachment', base64, { shouldValidate: true })}
        />
    )
}
