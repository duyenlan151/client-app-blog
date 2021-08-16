import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

function Spinner(props) {
    const { isLoading, color } = props;

    return <>{isLoading && <div className="loading"><CircularProgress color={color} /></div>}</>;
}

Spinner.propTypes = {
    isLoading: PropTypes.bool,
    color: PropTypes.string,
};

Spinner.defaultProps = {
    isLoading: false,
    color: "primary",
};

export default Spinner;
