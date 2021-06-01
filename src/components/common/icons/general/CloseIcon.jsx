import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

function CloseIcon({ handleClose, className }) {

  if (handleClose == null) {
    return null;
  }

  return (
    <div className={className}>
      <FontAwesomeIcon
        onClick={() => {handleClose();}}
        icon={faTimes}
        fixedWidth
        className={"pointer"}
      />
    </div>
  );
}

CloseIcon.propTypes = {
  handleClose: PropTypes.func,
  className: PropTypes.string
};

export default CloseIcon;