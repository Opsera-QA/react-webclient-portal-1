import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import JiraToolProjectSummaryCard
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraToolProjectSummaryCard";

function JiraProjectSummaryPanel({ jiraProjectData, jiraConfigurationData, setActiveTab } ) {
  if (jiraProjectData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Col lg={12}>
        <JiraToolProjectSummaryCard jiraProjectData={jiraProjectData} jiraConfigurationData={jiraConfigurationData} title={"Jira Tool Project"} />
      </Col>
    </SummaryPanelContainer>
  );
}

JiraProjectSummaryPanel.propTypes = {
  jiraProjectData: PropTypes.object,
  jiraConfigurationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default JiraProjectSummaryPanel;
