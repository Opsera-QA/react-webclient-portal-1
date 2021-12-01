import React from "react";
import PropTypes from "prop-types";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function SpyglassIcon({ className, onClickFunction, tooltipText }) {
  return (
    <div className={className}>
      <TooltipWrapper innerText={tooltipText} placement={"top"}>
        <IconBase
          onClickFunction={onClickFunction}
          icon={faSearch}
        />
      </TooltipWrapper>
    </div>
  );
}

SpyglassIcon.propTypes = {
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipText: PropTypes.string
};

export default SpyglassIcon;