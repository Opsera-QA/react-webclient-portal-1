import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import teamsStepNotificationMetadata from "components/workflow/plan/step/notifications/teams/teamsStepNotificationMetadata";
import slackStepNotificationMetadata from "components/workflow/plan/step/notifications/slack/slackStepNotificationMetadata";
import {hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import CloseButton from "components/common/buttons/CloseButton";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import modelHelpers from "components/common/model/modelHelpers";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import PipelineStepNotificationConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/PipelineStepNotificationConfigurationHelpDocumentation";
import TaskNotificationTabView from "components/tasks/details/tasks/notifications/TaskNotificationTabView";
import taskActions from "components/tasks/task.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import emailStepNotificationMetadata
  from "components/workflow/plan/step/notifications/email/emailStepNotification.metadata";
import { ORCHESTRATION_NOTIFICATION_TYPES } from "components/common/fields/notifications/notificationTypes.constants";

function TaskNotificationEditorPanel(
  {
    taskId,
    task,
    handleCloseClick,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jiraNotificationModel, setJiraNotificationModel] = useState(undefined);
  const [teamsNotificationModel, setTeamsNotificationModel] = useState(undefined);
  const [slackNotificationModel, setSlackNotificationModel] = useState(undefined);
  const [emailNotificationModel, setEmailNotificationModel] = useState(undefined);
  const [serviceNowNotificationModel, setServiceNowNotificationModel] = useState(undefined);
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

    if (isMongoDbId(taskId) === true && task) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [task, taskId]);

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
    const notifications = task?.getArrayData("notifications");

    const emailNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL);
    setEmailNotificationModel(modelHelpers.parseObjectIntoModel(emailNotification, emailStepNotificationMetadata));

    const slackNotification = notifications.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK);
    setSlackNotificationModel(modelHelpers.parseObjectIntoModel(slackNotification, slackStepNotificationMetadata));

    // const jiraNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);
    // setJiraNotificationModel(modelHelpers.parseObjectIntoModel(jiraNotification, jiraStepNotificationMetadata));

    const teamsNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS);
    setTeamsNotificationModel(modelHelpers.parseObjectIntoModel(teamsNotification, teamsStepNotificationMetadata));

    // const serviceNowNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW);
    // setServiceNowNotificationModel(modelHelpers.parseObjectIntoModel(serviceNowNotification, serviceNowStepNotificationMetadata));
  };

  const updateStepNotificationConfiguration = async () => {
    if (validateRequiredFields()) {
      const newNotificationConfiguration = [
        emailNotificationModel.getPersistData(),
        slackNotificationModel.getPersistData(),
        // jiraNotificationModel.getPersistData(),
        teamsNotificationModel.getPersistData(),
        // serviceNowNotificationModel.getPersistData()
      ];
      await taskActions.updateTaskNotificationConfiguration(
        getAccessToken,
        cancelTokenSource,
        taskId,
        newNotificationConfiguration,
        );
      toastContext.showSaveSuccessToast("Task Notification Configuration");
    }
  };

  const validateRequiredFields = () => {
    if (emailNotificationModel.getData("enabled") === true && !emailNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Email notification without all required fields filled out.");
      return false;
    }

    // if (jiraNotificationModel.getData("enabled") === true && !jiraNotificationModel.isModelValid()) {
    //   toastContext.showInlineErrorMessage("Error: Cannot enable Jira notification without all required fields filled out.");
    //   return false;
    // }

    if (teamsNotificationModel.getData("enabled") === true && !teamsNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Teams notification without tool selected.");
      return false;
    }

    if (slackNotificationModel.getData("enabled") === true && !slackNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Slack notifications without all required fields filled out.");
      return false;
    }

    // if (serviceNowNotificationModel.getData("enabled") === true && !serviceNowNotificationModel.isModelValid()) {
    //   toastContext.showInlineErrorMessage("Error: Cannot enable ServiceNow notifications without all required fields filled out.");
    //   return false;
    // }

    return true;
  };

  const getTitleBar = () => {
    const toolIdentifier = task?.tool?.tool_identifier;
    const titleText = hasStringValue(task?.name) === true ? `${task?.name}: ${toolIdentifier}` : toolIdentifier;
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
    <OverlayPanelBodyContainer
      getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
    >
      {getTitleBar()}
      <TaskNotificationTabView
        slackNotificationModel={slackNotificationModel}
        setSlackNotificationModel={setSlackNotificationModel}
        teamsNotificationModel={teamsNotificationModel}
        setTeamsNotificationModel={setTeamsNotificationModel}
        jiraNotificationModel={jiraNotificationModel}
        setJiraNotificationModel={setJiraNotificationModel}
        serviceNowNotificationModel={serviceNowNotificationModel}
        setServiceNowNotificationModel={setJiraNotificationModel}
        emailNotificationModel={emailNotificationModel}
        setEmailNotificationModel={setEmailNotificationModel}
      />
      <SaveButtonContainer>
        <StandaloneSaveButton
          className={"mr-2"}
          type={"Task Notification Configurations"}
          saveFunction={updateStepNotificationConfiguration}
          size={"md"}
          showToasts={false}
        />
        <CloseButton
          closeEditorCallback={handleCloseClick}
        />
      </SaveButtonContainer>
    </OverlayPanelBodyContainer>
  );
}

TaskNotificationEditorPanel.propTypes = {
  task: PropTypes.object,
  taskId: PropTypes.string,
  handleCloseClick: PropTypes.func,
};

export default TaskNotificationEditorPanel;