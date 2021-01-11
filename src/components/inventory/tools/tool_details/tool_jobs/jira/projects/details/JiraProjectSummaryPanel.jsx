import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function JiraProjectSummaryPanel({ jiraProjectData, setActiveTab } ) {
  if (jiraProjectData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Col lg={6}>
        <TextFieldBase dataObject={jiraProjectData} fieldName={"name"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={jiraProjectData} fieldName={"description"} />
      </Col>
    </SummaryPanelContainer>
  );
}

JiraProjectSummaryPanel.propTypes = {
  jiraProjectData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default JiraProjectSummaryPanel;
