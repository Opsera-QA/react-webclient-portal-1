import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import StandaloneConsoleLogField from "components/common/fields/pipelines/activity/StandaloneConsoleLogField";

function TaskActivityConsoleLogPanel({ gitTaskActivityData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <StandaloneConsoleLogField
            apiResponse={gitTaskActivityData["api_response"]}
            dataObject={gitTaskActivityData}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TaskActivityConsoleLogPanel.propTypes = {
  gitTaskActivityData: PropTypes.object,
};


export default TaskActivityConsoleLogPanel;
