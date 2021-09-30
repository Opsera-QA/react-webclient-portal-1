import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function DataBlockContainer({children, onClick, tooltipText, title, className}) {
  return (
    <TooltipWrapper innerText={tooltipText}>
      <div className={className}>
        <div className={`${onClick ? "pointer " : ""}data-block-container m-1`} onClick={onClick}>
          <div className={"data-block-container-title px-2 py-1"}>
            {title}
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </TooltipWrapper>
  );
}

DataBlockContainer.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  tooltipText: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default DataBlockContainer;