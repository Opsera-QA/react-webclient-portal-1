import PropTypes from "prop-types";
import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function PipelineStateFieldBase({ icon, innerText, statusText, className, colorClassName }) {
  return (
    <span className={`${className}`}>
      <span className={"d-flex flex-nowrap"}>
        <TooltipWrapper innerText={innerText}>
          <IconBase
            iconSize={"lg"}
            icon={icon}
            className={statusText === "Running" ? `my-auto fa-spin mr-2 ${colorClassName}` : `my-auto mr-2 ${colorClassName}`}
          />
        </TooltipWrapper>
        <span>{statusText}</span>
      </span>
    </span>
  );
}

PipelineStateFieldBase.propTypes = {
  icon: PropTypes.object,
  innerText: PropTypes.string,
  statusText: PropTypes.string,
  className: PropTypes.string,
  colorClassName: PropTypes.string,
};

export default PipelineStateFieldBase;