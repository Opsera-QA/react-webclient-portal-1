import React, { useState } from "react";
import PropTypes from "prop-types";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { faFileCheck } from "@fortawesome/pro-light-svg-icons";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import AcknowledgePipelineInstructionsButton
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/AcknowledgePipelineInstructionsButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import RefusePipelineInstructionsAcknowledgementButton
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/RefusePipelineInstructionsAcknowledgementButton";
import CloseButton from "components/common/buttons/CloseButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsFieldBase
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsFieldBase";
import useGetPipelineInstructionModelByPipelineStep
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionModelByPipelineStep";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import pipelineUserActionAcknowledgementMetadata
  from "@opsera/definitions/constants/pipelines/workflow/acknowledgement/pipelineUserActionAcknowledgement.metadata";

export default function PipelineInstructionsAcknowledgementOverlay(
  {
    pipeline,
    loadDataFunction,
  }) {
  const approvalStep = PipelineHelpers.getPendingApprovalStep(pipeline);
  const toolIdentifier = PipelineHelpers.getToolIdentifierFromPipelineStep(approvalStep);
  const configuration = DataParsingHelper.parseNestedObject(approvalStep, "tool.configuration");
  const userActionsStepModel = modelHelpers.parseObjectIntoModel(configuration, userActionsPipelineStepMetadata);
  const [acknowledgementModel, setAcknowledgementModel] = useState(modelHelpers.parseObjectIntoModel(configuration, pipelineUserActionAcknowledgementMetadata));
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    isLoading,
    error,
  } = useGetPipelineInstructionModelByPipelineStep(
    pipeline?._id,
    approvalStep?._id,
    false,
  );

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
          message={acknowledgementModel?.getData("message")}
          closePanelFunction={closePanelFunction}
          className={"mr-2"}
          disabled={pipelineInstructionsModel == null || acknowledgementModel?.checkCurrentValidity() !== true}
        />
        <AcknowledgePipelineInstructionsButton
          pipelineId={pipeline?._id}
          pipelineStepId={approvalStep?._id}
          message={acknowledgementModel?.getData("message")}
          closePanelFunction={closePanelFunction}
          disabled={pipelineInstructionsModel == null || acknowledgementModel?.checkCurrentValidity() !== true}
        />
      </ButtonContainerBase>
    );
  };

  const getBody = () => {
    if (isLoading !== true && pipelineInstructionsModel == null) {
      return (
        <div>
          There was no Pipeline Instructions associated with the User Actions step, the instructions have been deleted, or you do not have access to them.
        </div>
      );
    }

    return (
      <>
        <PipelineInstructionsFieldBase
          showInstructions={true}
          pipelineInstructionsModel={pipelineInstructionsModel}
          pipelineInstructionsId={userActionsStepModel?.getData("pipelineInstructionsId")}
          setPipelineInstructionsModel={setPipelineInstructionsModel}
          error={error}
          isLoading={isLoading}
        />
        <TextAreaInput
          dataObject={acknowledgementModel}
          setDataObject={setAcknowledgementModel}
          fieldName={"message"}
        />
      </>
    );
  };

  if (hasStringValue(toolIdentifier) !== true || toolIdentifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanelFunction}
      titleText={"Action Required"}
      titleIcon={faFileCheck}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-3"}>
        <div>
          This pipeline requires the following actions be taken at this time.
          Acknowledgement of these actions is required before the pipeline can proceed.
          Clicking acknowledge will log your action and resume the pipeline.
        </div>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineInstructionsAcknowledgementOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  pipeline: PropTypes.object
};


