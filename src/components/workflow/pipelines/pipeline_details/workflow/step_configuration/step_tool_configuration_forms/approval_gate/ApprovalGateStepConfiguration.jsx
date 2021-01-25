import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import approvalGatePipelineStepThresholdMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/approval_gate/approval-gate-pipeline-step-threshold-metadata";
import approvalGatePipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/approval_gate/approval-gate-pipeline-step-configuration-metadata";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import MessageField from "components/common/form_fields/MessageField";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function ApprovalGateStepConfiguration({ stepTool, parentCallback, closeEditorPanel }) {
  const contextType = useContext(AuthContext);
  const [thresholdData, setThresholdData] = useState(undefined);
  const [approvalGateData, setApprovalGateData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setThresholdData({...modelHelpers.getPipelineStepConfigurationThresholdModel(stepTool, approvalGatePipelineStepThresholdMetadata)});
    setApprovalGateData({...modelHelpers.getPipelineStepConfigurationModel(stepTool, approvalGatePipelineStepConfigurationMetadata)});
    setIsLoading(false);
  }, []);

  const callbackFunction = async () => {

    // TODO: When threshold is enabled, improve this logic
    const threshold = thresholdData.getPersistData();
    if (threshold.approved === true) {
      const {getUserRecord} = contextType;
      const userInfoResponse = await getUserRecord();
      threshold.user = userInfoResponse._id;
      threshold.email = userInfoResponse.email;
      threshold.approved_on = new Date();
    } else {
      threshold.user = null;
      threshold.email = null;
      threshold.approved_on = null;
    }

    const item = {
      configuration: approvalGateData.getPersistData(),
      threshold: {
        type: "user-approval",
        value: threshold,
      },
    };

    return await parentCallback(item);
  };

  if (approvalGateData == null) {
    return <></>;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={approvalGateData}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div className="mx-2">Approval functionality halts the pipeline at this step and requires Owner or
        Administrator approval before the pipeline can continue.
        Approval notification follows the
        rules defined for overall step notification.
        <div>Use the notification icon (<FontAwesomeIcon icon={faEnvelope}/>) to enable the various channels to use.</div>
      </div>
      <TextAreaInput fieldName={"message"} dataObject={approvalGateData} setDataObject={setApprovalGateData} />
      <TextInputBase fieldName={"contact"} dataObject={approvalGateData} setDataObject={setApprovalGateData} />
    </PipelineStepEditorPanelContainer>
  );
}

ApprovalGateStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default ApprovalGateStepConfiguration;