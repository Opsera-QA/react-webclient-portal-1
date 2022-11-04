import React, { useState } from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsDisplayerOverlay
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsDisplayerOverlay";
import useGetPipelineInstructionModelById
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionModelById";
import IconBase from "components/common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";

export default function PipelineWorkflowItemPipelineInstructionsField(
  {
    pipeline,
    pipelineStep,
  }) {
  const [userActionsStepModel, setUserActionsStepModel] = useState(modelHelpers.parseObjectIntoModel(pipelineStep?.tool?.configuration, userActionsPipelineStepMetadata));
  const pipelineInstructionsId = userActionsStepModel?.getData("pipelineInstructionsId");
  const {
    pipelineInstructionsModel,
    isLoading,
  } = useGetPipelineInstructionModelById(pipelineInstructionsId);
  const {
    toastContext,
  } = useComponentStateReference();

  const getValueField = () => {
    return (
      <div className={""}>
        {pipelineInstructionsModel?.getData("name") || pipelineInstructionsId}
      </div>
    );
  };

  const showPipelineInstructionsOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineInstructionsDisplayerOverlay
        pipelineInstructionsId={pipelineInstructionsId}
      />
    );
  };

  if (pipelineStep == null) {
    return null;
  }

  return (
    <div>
      <div
        className={"pointer d-flex"}
        onClick={showPipelineInstructionsOverlay}>
        {getValueField()}
        <IconBase
          isLoading={isLoading}
          iconSize={"sm"}
          className={"ml-2"}
          icon={faSearch}
        />
      </div>
    </div>
  );
}

PipelineWorkflowItemPipelineInstructionsField.propTypes = {
  pipelineStep: PropTypes.object,
  pipeline: PropTypes.object,
};