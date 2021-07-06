import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import SummaryCardContainerBase from "components/common/card_containers/SummaryCardContainerBase";
import {faJira} from "@fortawesome/free-brands-svg-icons";
import JiraProjectNameField from "components/common/fields/inventory/tools/jira/JiraProjectNameField";
import JiraBoardNameField from "components/common/fields/inventory/tools/jira/JiraBoardNameField";
import JiraSprintNameField from "components/common/fields/inventory/tools/jira/JiraSprintNameField";

// This is particularly heavy because of the queries involved
function JiraToolProjectSummaryCard({ jiraConfigurationData, jiraProjectData, children, isLoading, title }) {
  if (jiraConfigurationData == null) {
    return <></>;
  }

  return (
    <SummaryCardContainerBase title={title} titleIcon={faJira} isLoading={isLoading}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={jiraProjectData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jiraProjectData} fieldName={"description"} />
        </Col>
        <Col lg={6}>
          <ToolNameField model={jiraConfigurationData} fieldName={ "jiraToolId"} />
        </Col>
        <Col lg={6}>
          <JiraProjectNameField dataObject={jiraConfigurationData} fieldName={"jiraProject"} jiraToolId={jiraConfigurationData.getData("jiraToolId")} />
        </Col>
        <Col lg={6}>
          <JiraBoardNameField dataObject={jiraConfigurationData} fieldName={"jiraBoard"} jiraToolId={jiraConfigurationData.getData("jiraToolId")} jiraProjectKey={jiraConfigurationData.getData("jiraProject")} />
        </Col>
        <Col lg={6}>
          <JiraSprintNameField dataObject={jiraConfigurationData} fieldName={"jiraSprint"} jiraToolId={jiraConfigurationData.getData("jiraToolId")} jiraBoard={jiraConfigurationData.getData("jiraBoard")} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jiraConfigurationData} fieldName={"jiraParentTicket"} />
        </Col>
        {children}
      </Row>
    </SummaryCardContainerBase>
  );
}

JiraToolProjectSummaryCard.propTypes = {
  jiraConfigurationData: PropTypes.object,
  jiraProjectData: PropTypes.object,
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  title: PropTypes.string
};

export default JiraToolProjectSummaryCard;
