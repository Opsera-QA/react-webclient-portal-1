import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function CloseIcon({ handleClose, className, size, tooltipText }) {

  if (handleClose == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper placement={"bottom"} innerText={tooltipText}>
        <FontAwesomeIcon
          onClick={() => {handleClose();}}
          icon={faTimes}
          size={size}
          fixedWidth
          className={"pointer"}
        />
      </TooltipWrapper>
    </div>
  );
}

CloseIcon.propTypes = {
  handleClose: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.string,
  tooltipText: PropTypes.string
};

export default CloseIcon;