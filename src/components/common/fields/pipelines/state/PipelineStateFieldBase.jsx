import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function PipelineStateFieldBase({ icon, innerText, statusText, className, colorClassName }) {
  return (
    <span className={className}>
      <TooltipWrapper innerText={innerText}>
        <FontAwesomeIcon
          size="lg"
          icon={icon}
          fixedWidth
          className={statusText === "Running" ? `fa-spin mr-2 ${colorClassName}` : `mr-2 ${colorClassName}`}
        />
      </TooltipWrapper>
      <span>{statusText}</span>
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