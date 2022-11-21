import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { faFileCheck, faTriangleExclamation } from "@fortawesome/pro-light-svg-icons";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata,
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
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import pipelineUserActionAcknowledgementMetadata
  from "@opsera/definitions/constants/pipelines/workflow/acknowledgement/pipelineUserActionAcknowledgement.metadata";
import MessageField from "components/common/fields/text/message/MessageField";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import useGetPipelineInstructionModelByPipelineStep
  from "components/workflow/instructions/hooks/useGetPipelineInstructionModelByPipelineStep";
import useGetPipelineById from "hooks/workflow/pipelines/useGetPipelineById";
import PipelineTaskDetailViewer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineTaskDetailViewer";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

const INSTRUCTIONS_HEIGHT = `calc(${screenContainerHeights.TABLE_MINIMUM_HEIGHT_WITH_DESCRIPTION} - 250px)`;

export default function PipelineInstructionsAcknowledgementOverlay(
  {
    pipelineId,
    pipelineActivityLogId,
    loadPipelineFunction,
  }) {
  const getPipelineByIdHook = useGetPipelineById(pipelineId);
  const pipeline = getPipelineByIdHook?.pipeline;
  const isPaused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");
  const approvalStep = PipelineHelpers.getPendingApprovalStep(pipeline);
  const toolIdentifier = PipelineHelpers.getToolIdentifierFromPipelineStep(approvalStep);
  const configuration = DataParsingHelper.parseNestedObject(approvalStep, "tool.configuration");
  const userActionsStepModel = modelHelpers.parseObjectIntoModel(configuration, userActionsPipelineStepMetadata);
  const [acknowledgementModel, setAcknowledgementModel] = useState(modelHelpers.getNewModelForMetadata(pipelineUserActionAcknowledgementMetadata, false));
  const [inEditMode, setInEditMode] = useState(false);
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
    loadPipelineFunction();
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getAcknowledgementButtons = () => {
    if (pipelineInstructionsModel?.canAcknowledgePipelineInstructions() === true) {
      return (
        <>
          <AcknowledgePipelineInstructionsButton
            pipelineId={pipeline?._id}
            pipelineStepId={approvalStep?._id}
            message={acknowledgementModel?.getData("message")}
            closePanelFunction={closePanelFunction}
            disabled={pipelineInstructionsModel == null || acknowledgementModel?.checkCurrentValidity() !== true || inEditMode === true}
            className={"mr-2"}
          />
          <RefusePipelineInstructionsAcknowledgementButton
            pipelineId={pipeline?._id}
            pipelineStepId={approvalStep?._id}
            message={acknowledgementModel?.getData("message")}
            closePanelFunction={closePanelFunction}
            className={"mr-2"}
            disabled={pipelineInstructionsModel == null || acknowledgementModel?.checkCurrentValidity() !== true || inEditMode === true}
          />
        </>
      );
    }
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"mx-3"}>
        {getAcknowledgementButtons()}
        <CloseButton
          closeEditorCallback={closePanelFunction}
        />
      </ButtonContainerBase>
    );
  };

  const getTextInput = () => {
    if (pipelineInstructionsModel?.canAcknowledgePipelineInstructions() === true) {
      return (
        <TextAreaInput
          dataObject={acknowledgementModel}
          setDataObject={setAcknowledgementModel}
          fieldName={"message"}
        />
      );
    }

    if (isLoading !== true && pipelineInstructionsModel != null) {
      return (
        <H5FieldSubHeader
          subheaderText={"You do not have permission to Acknowledge these actions."}
          className={"danger-red"}
          icon={faTriangleExclamation}
        />
      );
    }
  };


  const getMessageFields = () => {
    if (hasStringValue(userActionsStepModel?.getData("message")) === true) {
      return (
        <Row>
          <Col xs={12} lg={8}>
            {getTextInput()}
          </Col>
          <Col xs={12} lg={4}>
            <MessageField
              model={userActionsStepModel}
              fieldName={"message"}
            />
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col xs={12}>
          {getTextInput()}
        </Col>
      </Row>
    );
  };

  const getBody = () => {
    if (getPipelineByIdHook.isLoading === true) {
      return (
        <CenterLoadingIndicator
          customMessage={"Loading Data"}
        />
      );
    }

    if (isLoading !== true && error) {
      return (
        <H5FieldSubHeader
          subheaderText={`
            There was no Pipeline Instructions associated with the User Actions step, the instructions have been deleted,
            or you do not have access to them.
          `}
          icon={faTriangleExclamation}
          className={"danger-red"}
        />
      );
    }

    return (
      <>
        <PipelineInstructionsFieldBase
          showInstructions={true}
          pipelineInstructionsModel={pipelineInstructionsModel}
          pipelineInstructionsId={userActionsStepModel?.getData("pipelineInstructionsId")}
          setPipelineInstructionsModel={setPipelineInstructionsModel}
          instructionsDisplayerMinimumHeight={INSTRUCTIONS_HEIGHT}
          instructionsDisplayerMaximumHeight={INSTRUCTIONS_HEIGHT}
          error={error}
          isLoading={isLoading}
          setInEditModeVisibility={setInEditMode}
        />
        {getMessageFields()}
      </>
    );
  };

  if (isPaused !== true && getPipelineByIdHook.isLoading !== true && isMongoDbId(pipelineActivityLogId) === true) {
    return (
      <PipelineTaskDetailViewer
        pipelineName={pipeline?.name}
        pipelineActivityLogId={pipelineActivityLogId}
      />
    );
  }

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
      <div className={"mx-3 mb-3 mt-2"}>
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
  loadPipelineFunction: PropTypes.func,
  pipelineId: PropTypes.string,
  pipelineActivityLogId: PropTypes.string,
};


