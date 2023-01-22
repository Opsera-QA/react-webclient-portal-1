import React from "react";
import PropTypes from "prop-types";
import {faDraftingCompass, faSplit} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import IconBase from "components/common/icons/IconBase";
import PipelineIdFieldBase from "components/common/fields/pipelines/PipelineIdFieldBase";

export default function PipelineWorkflowStepParallelPipelinesField(
  {
    step,
  }) {
  const pipelineIdArray = DataParsingHelper.parseNestedArray(step, "tool.configuration.pipelines");

  if (!Array.isArray(pipelineIdArray) || pipelineIdArray.length === 0) {
    return null;
  }

  return (
    <div className={"pl-1 pt-1 text-muted small d-flex"}>
      <IconBase
        icon={faSplit}
        iconSize={"sm"}
        className={"mr-1"}
      />
      <div>
        <div>Parallel Pipelines</div>
        {pipelineIdArray.map((pipelineId) =>
          <div className={"d-flex"} key={pipelineId}>
            <IconBase
              icon={faDraftingCompass}
              iconSize={"sm"}
              className={"mr-1"}
            />
            <PipelineIdFieldBase
              pipelineId={pipelineId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

PipelineWorkflowStepParallelPipelinesField.propTypes = {
  step: PropTypes.object,
};
