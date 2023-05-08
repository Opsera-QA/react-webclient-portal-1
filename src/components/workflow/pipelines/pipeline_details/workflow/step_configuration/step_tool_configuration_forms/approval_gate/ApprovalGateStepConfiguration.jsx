import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import approvalGatePipelineStepThresholdMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/approval_gate/approval-gate-pipeline-step-threshold-metadata";
import approvalGatePipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/approval_gate/approval-gate-pipeline-step-configuration-metadata";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import IconBase from "components/common/icons/IconBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ButtonBase from "components/common/buttons/ButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineStepNotificationConfigurationOverlay from "components/workflow/plan/step/notifications/PipelineStepNotificationConfigurationOverlay";

function ApprovalGateStepConfiguration({ stepTool, parentCallback, closeEditorPanel, pipelineStep, pipeline }) {
  const contextType = useContext(AuthContext);
  const [thresholdData, setThresholdData] = useState(undefined);
  const [approvalGateData, setApprovalGateData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {toastContext} = useComponentStateReference();

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

  const editStepNotificationConfiguration = async () => {
    toastContext.showOverlayPanel(
      <PipelineStepNotificationConfigurationOverlay
        pipeline={pipeline}
        pipelineId={pipeline?._id}
        pipelineStep={pipelineStep}
      />
    );
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={approvalGateData}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div>An Approval Gate in an Opsera Pipeline will halt the running pipeline and notify the configured
        user in order to allow the pipeline to proceed. Approval notification follows the rules defined for overall step notification. <b>Only Site Administrators and the pipeline&apos;s assigned Owner, Administrator and Manager roles (assigned via Access Rules) are permitted to perform this action</b>.
        <ButtonBase className={"mt-2 mb-2"} icon={faEnvelope} buttonText={"Configure Notification Rules"} onClickFunction={editStepNotificationConfiguration} tooltipText={"To configure the notification rues click here."} />
      </div>
      <BooleanToggleInput
        fieldName={"sendCustomMessage"}
        dataObject={approvalGateData}
        setDataObject={setApprovalGateData}
      />
      <TextAreaInput
        fieldName={"message"}
        dataObject={approvalGateData}
        setDataObject={setApprovalGateData}
        disabled={approvalGateData?.getData("sendCustomMessage") !== true}
      />
      <TextInputBase
        fieldName={"contact"}
        dataObject={approvalGateData}
        setDataObject={setApprovalGateData}
        disabled={approvalGateData?.getData("sendCustomMessage") !== true}
      />
    </PipelineStepEditorPanelContainer>
  );
}

ApprovalGateStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  pipelineStep: PropTypes.object,
  pipeline: PropTypes.object,
};

export default ApprovalGateStepConfiguration;