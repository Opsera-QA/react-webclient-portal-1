import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function LoadingIcon({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (<FontAwesomeIcon icon={faSpinner} spin className="mx-2 my-auto"/>);
}

LoadingIcon.propTypes = {
  isLoading: PropTypes.object,
};

export default LoadingIcon;