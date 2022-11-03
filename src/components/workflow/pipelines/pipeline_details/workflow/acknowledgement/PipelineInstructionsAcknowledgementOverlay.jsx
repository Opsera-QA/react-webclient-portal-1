import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { faFileCheck } from "@fortawesome/pro-light-svg-icons";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import PipelineInstructionsField
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsField";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import AcknowledgePipelineInstructionsButton
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/AcknowledgePipelineInstructionsButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import RefusePipelineInstructionsAcknowledgementButton
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/RefusePipelineInstructionsAcknowledgementButton";
import CloseButton from "components/common/buttons/CloseButton";

export default function PipelineInstructionsAcknowledgementOverlay(
  {
    pipeline,
    loadDataFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const approvalStep = PipelineHelpers.getPendingApprovalStep(pipeline);
  const toolIdentifier = PipelineHelpers.getToolIdentifierFromPipelineStep(approvalStep);
  const configuration = DataParsingHelper.parseNestedObject(approvalStep, "tool.configuration");
  const userActionsStepModel = modelHelpers.parseObjectIntoModel(configuration, userActionsPipelineStepMetadata);
  const [message, setMessage] = useState("");

  const closePanelFunction = () => {
    loadDataFunction();
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"mx-3"}>
        <CloseButton
          closeEditorCallback={closePanelFunction}
          className={"mr-2"}
        />
        <RefusePipelineInstructionsAcknowledgementButton
          pipelineId={pipeline?._id}
          pipelineStepId={approvalStep?._id}
          message={message}
          closePanelFunction={closePanelFunction}
          className={"mr-2"}
        />
        <AcknowledgePipelineInstructionsButton
          pipelineId={pipeline?._id}
          pipelineStepId={approvalStep?._id}
          message={message}
          closePanelFunction={closePanelFunction}
        />
      </ButtonContainerBase>
    );
  };

  if (hasStringValue(toolIdentifier) !== true || toolIdentifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanelFunction}
      titleText={"Acknowledge Instructions"}
      titleIcon={faFileCheck}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-3"}>
        <div>
          This pipeline requires the following actions be taken at this time.
          Acknowledgement of these actions is required before the pipeline can proceed.
          Clicking acknowledge will log your action and resume the pipeline.
        </div>
        <PipelineInstructionsField
          model={userActionsStepModel}
          fieldName={"pipelineInstructionsId"}
          showInstructions={true}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineInstructionsAcknowledgementOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  pipeline: PropTypes.object
};


