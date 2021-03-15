import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function LoadingIcon({ isLoading, className }) {
  if (!isLoading) {
    return null;
  }

  return (
    <span className={className}>
      <FontAwesomeIcon icon={faSpinner} spin />
    </span>
  );
}

LoadingIcon.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default React.memo(LoadingIcon);