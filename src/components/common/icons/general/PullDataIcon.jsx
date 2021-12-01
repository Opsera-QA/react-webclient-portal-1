import React from "react";
import PropTypes from "prop-types";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function PullDataIcon({ pullDataFunction, className, tooltipText }) {
  if (pullDataFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={tooltipText} placement={"top"}>
        <IconBase
          onClickFunction={pullDataFunction}
          icon={faFileDownload}
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