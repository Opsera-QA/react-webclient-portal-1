import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import JiraProjectNameField from "components/common/fields/inventory/tools/jira/JiraProjectNameField";
import JiraBoardNameField from "components/common/fields/inventory/tools/jira/JiraBoardNameField";
import JiraSprintNameField from "components/common/fields/inventory/tools/jira/JiraSprintNameField";

function JiraProjectSummaryPanel({ jiraProjectData, jiraConfigurationData, setActiveTab } ) {
  if (jiraProjectData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase
            dataObject={jiraProjectData}
            fieldName={"name"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={jiraProjectData}
            fieldName={"description"}
          />
        </Col>
        <Col lg={6}>
          <ToolNameField
            model={jiraConfigurationData}
            fieldName={ "jiraToolId"}
          />
        </Col>
        <Col lg={6}>
          <JiraProjectNameField
            model={jiraConfigurationData}
            fieldName={"jiraProject"}
            jiraToolId={jiraConfigurationData.getData("jiraToolId")}
          />
        </Col>
        <Col lg={6}>
          <JiraBoardNameField
            dataObject={jiraConfigurationData}
            fieldName={"jiraBoard"}
            jiraToolId={jiraConfigurationData.getData("jiraToolId")}
            jiraProjectKey={jiraConfigurationData.getData("jiraProject")}
          />
        </Col>
        <Col lg={6}>
          <JiraSprintNameField
            dataObject={jiraConfigurationData}
            fieldName={"jiraSprint"}
            jiraToolId={jiraConfigurationData.getData("jiraToolId")}
            jiraBoard={jiraConfigurationData.getData("jiraBoard")}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={jiraConfigurationData}
            fieldName={"jiraParentTicket"}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

JiraProjectSummaryPanel.propTypes = {
  jiraProjectData: PropTypes.object,
  jiraConfigurationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default JiraProjectSummaryPanel;
