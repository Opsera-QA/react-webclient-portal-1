import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import OrchestrationStateFieldBase
from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelineStateField(
  {
    model,
    showLabel,
  }) {

  if (model == null) {
    return null;
  }

  return (
    <FieldContainer>
      <div className={"d-flex"}>
        <FieldLabelBase
          label={"Status"}
          showLabel={showLabel}
        />
        <OrchestrationStateFieldBase
          type={"Pipeline"}
          orchestrationState={pipelineHelper.getPipelineState(model?.getCurrentData())}
        />
      </div>
    </FieldContainer>
  );
}

PipelineStateField.propTypes = {
  model: PropTypes.object,
  showLabel: PropTypes.bool,
};
