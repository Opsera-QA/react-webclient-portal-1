import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function PullDataIcon({ pullDataFunction, className, tooltipText }) {
  if (pullDataFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={tooltipText} placement={"top"}>
        <FontAwesomeIcon
          onClick={() => {pullDataFunction();}}
          icon={faFileDownload}
          fixedWidth
          className={"pointer"}
        />
      </TooltipWrapper>
    </div>
  );
}

PullDataIcon.propTypes = {
  pullDataFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipText: PropTypes.string
};

export default PullDataIcon;