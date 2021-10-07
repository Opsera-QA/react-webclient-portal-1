import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

// TODO: Styling is temporary based on SonarRatings until we figure out which direction to go
function VerticalDataBlockContainer({leftDataBlock, middleDataBlock, rightDataBlock, onClick, tooltipText, title}) {
  return (
    <TooltipWrapper innerText={tooltipText}>
      <div className={`${onClick ? "pointer " : ""}data-block-container`} onClick={onClick}>
        <div className={"data-block-container-title px-2 py-1"}>
          {title}
        </div>
        <div>{leftDataBlock}</div>
        <div>{middleDataBlock}</div>
        <div>{rightDataBlock}</div>
      </div>
    </TooltipWrapper>
  );
}

VerticalDataBlockContainer.propTypes = {
  leftDataBlock: PropTypes.any,
  middleDataBlock: PropTypes.any,
  rightDataBlock: PropTypes.any,
  onClick: PropTypes.func,
  tooltipText: PropTypes.any,
  title: PropTypes.string,
};

export default VerticalDataBlockContainer;