import React, {useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
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
    return (
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={emailModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"address"} dataObject={emailModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={emailModel} />
        </Col>
      </Row>
    );
  };

  const getJiraFields = () => {
    return (
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={jiraModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraToolId"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraProject"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraSprint"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraPriority"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraPrimaryAssignee"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <GenericItemField fieldName={"jiraSecondaryAssignees"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraBoard"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraParentTicket"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraOpenStep"} dataObject={jiraModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraClosureStep"} dataObject={jiraModel} />
        </Col>
      </Row>
    );
  };

  const getSlackFields = () => {
    return (
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={slackModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={slackModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"channel"} dataObject={slackModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"toolId"} dataObject={slackModel} />
        </Col>
      </Row>
    );
  };

  const getTeamsFields = () => {
    return (
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={teamsModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={teamsModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"toolId"} dataObject={teamsModel} />
        </Col>
      </Row>
    );
  };

  const getServiceNowFields = () => {
    return (
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={serviceNowModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={serviceNowModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"toolId"} dataObject={serviceNowModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"serviceNowUserId"} dataObject={serviceNowModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"serviceNowGroupId"} dataObject={serviceNowModel} />
        </Col>
      </Row>
    );
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer>
      {getEmailFields()}
      {getJiraFields()}
      {getTeamsFields()}
      {getSlackFields()}
      {getServiceNowFields()}
    </SummaryPanelContainer>
  );
}

PipelineStepNotificationConfigurationSummaryPanel.propTypes = {
  pipelineStepData: PropTypes.object,
};

export default PipelineStepNotificationConfigurationSummaryPanel;
