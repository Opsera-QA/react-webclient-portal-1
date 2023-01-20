import React, { useState } from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-solid-svg-icons";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineInstructionsAcknowledgementOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineInstructionsAcknowledgementOverlay";
import UserActionsPipelineInstructionsDisplayerOverlay
  from "components/workflow/plan/step/user_actions/UserActionsPipelineInstructionsDisplayerOverlay";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import useGetPipelineInstructionModelByPipelineStep
  from "components/workflow/instructions/hooks/useGetPipelineInstructionModelByPipelineStep";

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
          pipelineId={pipeline?._id}
          loadPipelineFunction={loadPipelineFunction}
        />,
      );
    } else {
      toastContext.showOverlayPanel(
        <UserActionsPipelineInstructionsDisplayerOverlay
          pipelineInstructionsId={pipelineInstructionsId}
          pipelineId={pipeline?._id}
          pipelineStepId={pipelineStep?._id}
        />
      );
    }
  };

  const getIcon = () => {
    if (pipelineInstructionsId) {
      return (
        <IconBase
          isLoading={isLoading}
          iconSize={"sm"}
          className={"ml-1"}
          icon={faSearch}
        />
      );
    }
  };

  const getTooltip = () => {
    if (approvalStepToolIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION) {
      return "Click to view Acknowledgement Details";
    }

    return "Click to view Pipeline Instructions set";
  };

  if (pipeline == null || pipelineStep == null || isMongoDbId(pipelineInstructionsId) !== true) {
    return null;
  }

  if (isLoading !== true && pipelineInstructionsModel == null) {
    return (
      <span className={"danger-red"}>
        Pipeline Instructions Not Found!
      </span>
    );
  }

  return (
    <div>
      <TooltipWrapper
        innerText={getTooltip()}
      >
        <div
          className={"pointer d-flex"}
          onClick={showPipelineInstructionsOverlay}>
          {getValueField()}
          {getIcon()}
        </div>
      </TooltipWrapper>
    </div>
  );
}

PipelineWorkflowItemPipelineInstructionsField.propTypes = {
  pipelineStep: PropTypes.object,
  pipeline: PropTypes.object,
  loadPipelineFunction: PropTypes.func,
};