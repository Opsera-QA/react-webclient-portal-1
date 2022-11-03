import React, { useState } from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";

export default function PipelineWorkflowItemPipelineInstructionsField(
  {
    pipelineStep,
  }) {
  const [userActionsStepModel, setUserActionsStepModel] = useState(modelHelpers.parseObjectIntoModel(pipelineStep?.tool?.configuration, userActionsPipelineStepMetadata));

  const getValueField = () => {
    return userActionsStepModel?.getData("pipelineInstructionsId");
  };

  if (pipelineStep == null) {
    return null;
  }

  return (
    <div>
      {getValueField()}
    </div>
  );
}

PipelineWorkflowItemPipelineInstructionsField.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
};