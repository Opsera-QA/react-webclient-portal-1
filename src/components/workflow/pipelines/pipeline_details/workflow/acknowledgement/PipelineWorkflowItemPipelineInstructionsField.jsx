import React, { useState } from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsDisplayerOverlay
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsDisplayerOverlay";
import IconBase from "components/common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-solid-svg-icons";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineInstructionsAcknowledgementOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineInstructionsAcknowledgementOverlay";
import useGetPipelineInstructionModelByPipelineStep
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionModelByPipelineStep";

export default function PipelineWorkflowItemPipelineInstructionsField(
  {
    pipeline,
    pipelineStep,
    loadPipelineFunction,
  }) {
  const [userActionsStepModel, setUserActionsStepModel] = useState(modelHelpers.parseObjectIntoModel(pipelineStep?.tool?.configuration, userActionsPipelineStepMetadata));
  const pipelineInstructionsId = userActionsStepModel?.getData("pipelineInstructionsId");
  const {
    pipelineInstructionsModel,
    isLoading,
  } = useGetPipelineInstructionModelByPipelineStep(pipeline?._id, pipelineStep?._id);
  const {
    toastContext,
  } = useComponentStateReference();
  const approvalStep = pipelineHelpers.getPendingApprovalStep(pipeline);
  const approvalStepToolIdentifier = pipelineHelpers.getToolIdentifierFromPipelineStep(approvalStep);

  const getValueField = () => {
    return (
      <div className={"font-weight-bold"}>
        {pipelineInstructionsModel?.getData("name") || pipelineInstructionsId}
      </div>
    );
  };

  const showPipelineInstructionsOverlay = () => {
    if (approvalStepToolIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION) {
      toastContext.showOverlayPanel(
        <PipelineInstructionsAcknowledgementOverlay
          pipeline={pipeline}
          loadPipelineFunction={loadPipelineFunction}
        />,
      );
    } else {
      toastContext.showOverlayPanel(
        <PipelineInstructionsDisplayerOverlay
          pipelineInstructionsId={pipelineInstructionsId}
          allowEditing={true}
        />
      );
    }
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
          className={"ml-1"}
          icon={faSearch}
        />
      </div>
    </div>
  );
}

PipelineWorkflowItemPipelineInstructionsField.propTypes = {
  pipelineStep: PropTypes.object,
  pipeline: PropTypes.object,
  loadPipelineFunction: PropTypes.func,
};