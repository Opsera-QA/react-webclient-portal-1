import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import teamsStepNotificationMetadata from "components/workflow/plan/step/notifications/teams/teamsStepNotificationMetadata";
import serviceNowStepNotificationMetadata from "components/workflow/plan/step/notifications/servicenow/serviceNowStepNotificationMetadata";
import slackStepNotificationMetadata from "components/workflow/plan/step/notifications/slack/slackStepNotificationMetadata";
import emailStepNotificationMetadata from "components/workflow/plan/step/notifications/email/emailStepNotification.metadata";
import {hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import CloseButton from "components/common/buttons/CloseButton";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import modelHelpers from "components/common/model/modelHelpers";
import PipelineNotificationTabView from "components/workflow/plan/step/notifications/PipelineNotificationTabView";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {jiraStepApprovalMetadata} from "components/workflow/plan/step/notifications/jira/jiraStepApproval.metadata";
import {
  jiraStepNotificationMetadata
} from "components/workflow/plan/step/notifications/jira/jiraStepNotification.metadata";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import PipelineStepNotificationConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/PipelineStepNotificationConfigurationHelpDocumentation";
import gChatStepNotificationMetadata 
  from "components/workflow/plan/step/notifications/gchat/gChatStepNotificationMetadata";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

function PipelineStepNotificationEditorPanel(
  {
    pipelineId,
    pipelineStep,
    handleCloseClick,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jiraNotificationModel, setJiraNotificationModel] = useState(undefined);
  const [teamsNotificationModel, setTeamsNotificationModel] = useState(undefined);
  const [slackNotificationModel, setSlackNotificationModel] = useState(undefined);
  const [emailNotificationModel, setEmailNotificationModel] = useState(undefined);
  const [serviceNowNotificationModel, setServiceNowNotificationModel] = useState(undefined);
  const [gChatNotificationModel, setGChatNotificationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineStep, pipelineId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadConfiguration();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadConfiguration = async () => {
    const jiraNotificationMetadata = pipelineStep?.tool?.tool_identifier === "approval" ? jiraStepApprovalMetadata : jiraStepNotificationMetadata;

    const emailNotification = pipelineStep?.notification?.find((notification) => notification.type === "email");
    setEmailNotificationModel(modelHelpers.parseObjectIntoModel(emailNotification, emailStepNotificationMetadata));

    const slackNotification = pipelineStep?.notification?.find((notification) => notification.type === "slack");
    setSlackNotificationModel(modelHelpers.parseObjectIntoModel(slackNotification, slackStepNotificationMetadata));

    const jiraNotification = pipelineStep?.notification?.find((notification) => notification.type === "jira");
    setJiraNotificationModel(modelHelpers.parseObjectIntoModel(jiraNotification, jiraNotificationMetadata));

    const teamsNotification = pipelineStep?.notification?.find((notification) => notification.type === "teams");
    setTeamsNotificationModel(modelHelpers.parseObjectIntoModel(teamsNotification, teamsStepNotificationMetadata));

    const serviceNowNotification = pipelineStep?.notification?.find((notification) => notification.type === "servicenow");
    setServiceNowNotificationModel(modelHelpers.parseObjectIntoModel(serviceNowNotification, serviceNowStepNotificationMetadata));

    const gChatNotification = pipelineStep?.notification?.find((notification) => notification.type === "gchat");
    setGChatNotificationModel(modelHelpers.parseObjectIntoModel(gChatNotification, gChatStepNotificationMetadata));
  };

  const updateStepNotificationConfiguration = async () => {
    if (validateRequiredFields()) {
      const newNotificationConfiguration = [emailNotificationModel.getPersistData(), slackNotificationModel.getPersistData(), jiraNotificationModel.getPersistData(), teamsNotificationModel.getPersistData(), serviceNowNotificationModel.getPersistData(), gChatNotificationModel.getPersistData()];
      await pipelineActions.updatePipelineStepNotificationConfiguration(
        getAccessToken,
        cancelTokenSource,
        pipelineId,
        pipelineStep?._id,
        newNotificationConfiguration,
        );
      toastContext.showSaveSuccessToast("Pipeline Notification Configuration");
    }
  };

  const validateRequiredFields = () => {
    if (emailNotificationModel.getData("enabled") === true && !emailNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Email notification without all required fields filled out.");
      return false;
    }

    if (jiraNotificationModel.getData("enabled") === true && !jiraNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Jira notification without all required fields filled out.");
      return false;
    }

    if (teamsNotificationModel.getData("enabled") === true && !teamsNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Teams notification without tool selected.");
      return false;
    }

    if (slackNotificationModel.getData("enabled") === true && !slackNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Slack notifications without all required fields filled out.");
      return false;
    }
    
    if (serviceNowNotificationModel.getData("enabled") === true && !serviceNowNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable ServiceNow notifications without all required fields filled out.");
      return false;
    }

    if (gChatNotificationModel.getData("enabled") === true && !gChatNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable GChat notification without tool selected.");
      return false;
    }

    return true;
  };

  const getTitleBar = () => {
    const toolIdentifier = pipelineStep?.tool?.tool_identifier;
    const titleText = hasStringValue(pipelineStep?.name) === true ? `${pipelineStep?.name}: ${toolIdentifier}` : toolIdentifier;
    return (
      <div>
        <h6 className="upper-case-first">{titleText}</h6>
        <div className="text-muted mt-2 mb-3">Each step in the workflow can be configured with notifications that trigger upon
          completion, failure, or all scenarios.
        </div>
      </div>
    );
  };

  const getHelpComponentFunction = (setHelpIsShown) => {
    return (
      <PipelineStepNotificationConfigurationHelpDocumentation
        closeHelpPanel={() => setHelpIsShown(false)}
        />
    );
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Notification Configuration"} size={"sm"} />;
  }

  return (
    <div>
      {getTitleBar()}
      <PipelineNotificationTabView
        slackNotificationModel={slackNotificationModel}
        setSlackNotificationModel={setSlackNotificationModel}
        teamsNotificationModel={teamsNotificationModel}
        setTeamsNotificationModel={setTeamsNotificationModel}
        jiraNotificationModel={jiraNotificationModel}
        setJiraNotificationModel={setJiraNotificationModel}
        serviceNowNotificationModel={serviceNowNotificationModel}
        setServiceNowNotificationModel={setServiceNowNotificationModel}
        emailNotificationModel={emailNotificationModel}
        setEmailNotificationModel={setEmailNotificationModel}
        gChatNotificationModel={gChatNotificationModel}
        setGChatNotificationModel={setGChatNotificationModel}
        pipelineStep={pipelineStep}
      />
      <SaveButtonContainer>
        <StandaloneSaveButton
          className={"mr-2"}
          type={"Pipeline Notification Step Configurations"}
          saveFunction={updateStepNotificationConfiguration}
          size={"md"}
          showToasts={false}
        />
        <CloseButton
          closeEditorCallback={handleCloseClick}
        />
      </SaveButtonContainer>
    </div>
  );
}

PipelineStepNotificationEditorPanel.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  handleCloseClick: PropTypes.func,
};

export default PipelineStepNotificationEditorPanel;