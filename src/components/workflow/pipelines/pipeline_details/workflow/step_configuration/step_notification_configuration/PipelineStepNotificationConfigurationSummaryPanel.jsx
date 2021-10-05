import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import jiraStepApprovalMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/jiraStepApprovalMetadata";
import jiraStepNotificationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/jiraStepNotificationMetadata";
import Model from "core/data_model/model";
import emailStepNotificationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/email/emailStepNotificationMetadata";
import slackStepNotificationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/slack/slackStepNotificationMetadata";
import teamsStepNotificationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/teams/teamsStepNotificationMetadata";
import serviceNowStepNotificationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/servicenow/serviceNowStepNotificationMetadata";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepJiraNotificationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/PipelineStepJiraNotificationSummaryPanel";
import PipelineStepEmailNotificationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/email/PipelineStepEmailNotificationSummaryPanel";
import InfoContainer from "components/common/containers/InfoContainer";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import PipelineStepServiceNowNotificationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/servicenow/PipelineStepServiceNowNotificationSummaryPanel";
import PipelineStepSlackNotificationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/slack/PipelineStepSlackNotificationSummaryPanel";
import PipelineStepMicrosoftTeamsNotificationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/teams/PipelineStepMicrosoftTeamsNotificationSummaryPanel";
import NoDataMessageField from "components/common/fields/text/standalone/NoDataMessageField";

// TODO: Style
function PipelineStepNotificationConfigurationSummaryPanel({ pipelineStepData }) {
  const [jiraModel, setJiraModel] = useState(undefined);
  const [teamsModel, setTeamsModel] = useState(undefined);
  const [slackModel, setSlackModel] = useState(undefined);
  const [emailModel, setEmailModel] = useState(undefined);
  const [serviceNowModel, setServiceNowModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pipelineStepData) {
      loadData(pipelineStepData);
    }
  }, [pipelineStepData]);

  const loadData = (pipelineStepData) => {
    setIsLoading(true);

    if (pipelineStepData?.tool?.tool_identifier === "approval") {
      loadConfiguration(pipelineStepData, jiraStepApprovalMetadata);
    } else {
      loadConfiguration(pipelineStepData, jiraStepNotificationMetadata);
    }

    setIsLoading(false);
  };

  // TODO: Tighten up
  const loadConfiguration = (step, jiraStepMetadata) => {
    setEmailModel(new Model({...emailStepNotificationMetadata.newObjectFields}, emailStepNotificationMetadata, true));
    setSlackModel(new Model({...slackStepNotificationMetadata.newObjectFields}, slackStepNotificationMetadata, true));
    setJiraModel(new Model({...jiraStepMetadata.newObjectFields}, jiraStepMetadata, true));
    setTeamsModel(new Model({...teamsStepNotificationMetadata.newObjectFields}, teamsStepNotificationMetadata, true));
    setServiceNowModel(new Model({...serviceNowStepNotificationMetadata.newObjectFields}, serviceNowStepNotificationMetadata, true));

    if (step.notification !== undefined) {
      let emailArrayIndex = step.notification.findIndex(x => x.type === "email");
      let slackArrayIndex = step.notification.findIndex(x => x.type === "slack");
      let jiraArrayIndex = step.notification.findIndex(x => x.type === "jira");
      let teamsArrayIndex = step.notification.findIndex(x => x.type === "teams");
      let serviceNowArrayIndex = step.notification.findIndex(x => x.type === "servicenow");
      if (emailArrayIndex >= 0) {
        let emailFormData = step.notification[emailArrayIndex];
        setEmailModel(new Model(emailFormData, emailStepNotificationMetadata, false));
      }
      if (slackArrayIndex >= 0) {
        let slackFormData = step.notification[slackArrayIndex];
        setSlackModel(new Model(slackFormData, slackStepNotificationMetadata, false));
      }
      if (jiraArrayIndex >= 0) {
        let jiraFormData = step.notification[jiraArrayIndex];
        setJiraModel(new Model(jiraFormData, jiraStepMetadata, false));
      }
      if (teamsArrayIndex >= 0) {
        let teamsFormData = step.notification[teamsArrayIndex];
        setTeamsModel(new Model(teamsFormData, teamsStepNotificationMetadata, false));
      }
      if (serviceNowArrayIndex >= 0) {
        let serviceNowFormData = step.notification[serviceNowArrayIndex];
        setServiceNowModel(new Model(serviceNowFormData, serviceNowStepNotificationMetadata, false));
      }
    }
  };

  const getEmailFields = () => {
    if (emailModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Email Notifications"} titleIcon={faEnvelope} className={"mt-1 mb-2"}>
        <PipelineStepEmailNotificationSummaryPanel emailNotificationModel={emailModel} />
      </InfoContainer>
    );
  };

  const getJiraFields = () => {
    if (jiraModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Jira Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepJiraNotificationSummaryPanel jiraNotificationModel={jiraModel} />
      </InfoContainer>
    );
  };

  const getSlackFields = () => {
    if (slackModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Slack Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepSlackNotificationSummaryPanel slackNotificationModel={slackModel} />
      </InfoContainer>
    );
  };

  const getTeamsFields = () => {
    if (teamsModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Microsoft Teams Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepMicrosoftTeamsNotificationSummaryPanel teamsNotificationModel={teamsModel} />
      </InfoContainer>
    );
  };

  const getServiceNowFields = () => {
    if (serviceNowModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"ServiceNow Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepServiceNowNotificationSummaryPanel serviceNowNotificationModel={serviceNowModel} />
      </InfoContainer>
    );
  };

  const getNotificationBody = () => {
    const hasEmailNotifications = emailModel?.getData("enabled") === true;
    const hasJiraNotifications = jiraModel?.getData("enabled") === true;
    const hasTeamsNotifications = teamsModel?.getData("enabled") === true;
    const hasSlackNotifications = slackModel?.getData("enabled") === true;
    const hasServiceNowNotifications = serviceNowModel?.getData("enabled") === true;

    if (
         hasEmailNotifications === false
      && hasJiraNotifications === false
      && hasTeamsNotifications === false
      && hasSlackNotifications === false
      && hasServiceNowNotifications === false
    ) {
      return (
        <NoDataMessageField message={"No notifications are configured for this Pipeline step."} />
      );
    }

    return (
      <div>
        {getEmailFields()}
        {getJiraFields()}
        {getTeamsFields()}
        {getSlackFields()}
        {getServiceNowFields()}
      </div>
    );
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer className={"step-configuration-summary"}>
      {getNotificationBody()}
    </SummaryPanelContainer>
  );
}

PipelineStepNotificationConfigurationSummaryPanel.propTypes = {
  pipelineStepData: PropTypes.object,
};

export default PipelineStepNotificationConfigurationSummaryPanel;
