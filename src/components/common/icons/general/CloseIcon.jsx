import React from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function CloseIcon({ handleClose, className, size, tooltipText }) {

  if (handleClose == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper placement={"bottom"} innerText={tooltipText}>
        <IconBase
          onClickFunction={() => {handleClose();}}
          icon={faTimes}
          iconSize={size}
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