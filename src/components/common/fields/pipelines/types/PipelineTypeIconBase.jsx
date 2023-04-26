import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import {
  getPipelineTypeLabel,
  pipelineTypeConstants
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";

function PipelineTypeIconBase(
  {
    type,
    className,
  }) {
  return (
    <TooltipWrapper innerText={getPipelineTypeLabel(type)}>
      <div>
        <IconBase
          icon={pipelineTypeConstants.getIconForPipelineType(type)}
          className={className}
          iconSize={"lg"}
        />
      </div>
    </TooltipWrapper>
  );
}

PipelineTypeIconBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default PipelineTypeIconBase;