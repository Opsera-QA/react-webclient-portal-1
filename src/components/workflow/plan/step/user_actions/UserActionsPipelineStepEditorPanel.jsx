import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import modelHelpers from "components/common/model/modelHelpers";
import approvalGatePipelineStepThresholdMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/approval_gate/approval-gate-pipeline-step-threshold-metadata";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import IconBase from "components/common/icons/IconBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import PipelineInstructionsSelectInput
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsSelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import { Col, Row } from "react-bootstrap";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import PipelineInstructionsField
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsField";

export default function UserActionsPipelineStepEditorPanel(
  {
    pipelineStep,
    pipelineId,
    closeEditorPanel,
  }) {
  const [thresholdModel, setThresholdModel] = useState(undefined);
  const [userActionsStepModel, setUserActionsStepModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    userData,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setIsLoading(true);
    setThresholdModel({...modelHelpers.getPipelineStepConfigurationThresholdModel(pipelineStep?.threshold, approvalGatePipelineStepThresholdMetadata)});
    setUserActionsStepModel({...modelHelpers.parseObjectIntoModel(pipelineStep?.tool?.configuration, userActionsPipelineStepMetadata)});
    setIsLoading(false);
  }, [pipelineStep]);

  const saveRecord = async () => {
    // TODO: When threshold is enabled, improve this logic
    const threshold = thresholdModel?.getPersistData();
    if (threshold.approved === true) {
      threshold.user = userData?._id;
      threshold.email = userData?.email;
      threshold.approved_on = new Date();
    } else {
      threshold.user = null;
      threshold.email = null;
      threshold.approved_on = null;
    }

    pipelineStep.tool.configuration = {...userActionsStepModel?.getPersistData()};
    pipelineStep.threshold = {
      type: "user-approval",
      value: threshold,
    };

    const response = await pipelineActions.updatePipelineStepByIdV2(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      pipelineStep?._id,
      pipelineStep,
    );

    // TODO: This check is probably not necessary but leaving it in for safety for now.
    if (response?.status === 200) {
      closeEditorPanel();
    }

    return response;
  };

  if (userActionsStepModel == null) {
    return <></>;
  }

  return (
    <EditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={userActionsStepModel}
      createRecord={saveRecord}
      updateRecord={saveRecord}
      lenient={true}
      isLoading={isLoading}
      className={"m-0"}
      addAnotherOption={false}
    >
      <Row>
        <Col xs={12}>
          <div>
            This step pauses the pipeline in order to allow users to complete specified instructions before proceeding.
            Instructions are managed under Settings. Please select an instruction from the list below and then configure notification rules for alerting users of the event.
            Approval notification follows the rules defined for overall step notification. <b>Only Site Administrators and the pipeline&apos;s assigned Owner, Administrator and Manager roles (assigned via Access Rules) are permitted to perform this action</b>.
            <div className="my-3">Use the notification icon (<IconBase icon={faEnvelope}/>) to enable the various channels to use.</div>
          </div>
        </Col>
        <Col xs={12}>
          <PipelineInstructionsSelectInput
            fieldName={"pipelineInstructionsId"}
            model={userActionsStepModel}
            setModel={setUserActionsStepModel}
            allowCreate={true}
          />
        </Col>
        <Col xs={12}>
          <PipelineInstructionsField
            model={userActionsStepModel}
            fieldName={"pipelineInstructionsId"}
            showInstructions={true}
            allowEditing={true}
          />
        </Col>
        <Col xs={12}>
          <BooleanToggleInput
            fieldName={"sendCustomMessage"}
            dataObject={userActionsStepModel}
            setDataObject={setUserActionsStepModel}
          />
        </Col>
        <Col xs={12}>
          <TextAreaInput
            fieldName={"message"}
            dataObject={userActionsStepModel}
            setDataObject={setUserActionsStepModel}
            disabled={userActionsStepModel?.getData("sendCustomMessage") !== true}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

UserActionsPipelineStepEditorPanel.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};