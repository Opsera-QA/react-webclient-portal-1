import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

function CloseIcon({ handleClose, className, size }) {

  if (handleClose == null) {
    return null;
  }

  return (
    <div className={className}>
      <FontAwesomeIcon
        onClick={() => {handleClose();}}
        icon={faTimes}
        size={size}
        fixedWidth
        className={"pointer"}
      />
    </div>
  );
}

CloseIcon.propTypes = {
  handleClose: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.string
};

export default CloseIcon;