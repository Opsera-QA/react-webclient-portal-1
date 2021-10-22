import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import PipelineConsoleLogField from "components/common/fields/log/PipelineConsoleLogField";

function TaskActivityConsoleLogPanel({ gitTaskActivityData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <PipelineConsoleLogField
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
