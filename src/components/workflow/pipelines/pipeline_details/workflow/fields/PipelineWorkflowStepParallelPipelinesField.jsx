import React from "react";
import PropTypes from "prop-types";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import IconBase from "components/common/icons/IconBase";

export default function PipelineWorkflowStepParallelPipelinesField(
  {
    step,
  }) {
  const pipelineIdArray = DataParsingHelper.parseNestedArray(step, "tool.configuration.pipelines");

  if (!Array.isArray(pipelineIdArray) || pipelineIdArray.length === 0) {
    return null;
  }

  return (
    <div className={"pl-1 pt-1"}>
      <div className={"text-muted small d-flex"}>
        <IconBase
          icon={faDraftingCompass}
          iconSize={"sm"}
          className={"mr-1"}
        />
        <span>Parallel Pipelines</span>
      </div>
      <div className={"mx-1"}>
        {JSON.stringify(pipelineIdArray)}
      </div>
    </div>
  );
}

PipelineWorkflowStepParallelPipelinesField.propTypes = {
  step: PropTypes.object,
};
