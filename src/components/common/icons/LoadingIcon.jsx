import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function LoadingIcon({ isLoading, className, iconSize }) {
  if (!isLoading) {
    return null;
  }

  return (
    <span className={className}>
      <FontAwesomeIcon size={iconSize} icon={faSpinner} spin fixedWidth />
    </span>
  );
}

LoadingIcon.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  iconSize: PropTypes.string
};

export default React.memo(LoadingIcon);