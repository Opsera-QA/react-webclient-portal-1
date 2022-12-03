import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import PipelineConsoleLogField from "components/common/fields/log/PipelineConsoleLogField";

function PipelineTaskConsoleLogPanel({ pipelineTaskData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <PipelineConsoleLogField
            dataObject={pipelineTaskData}
            apiResponse={pipelineTaskData?.api_response}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineTaskConsoleLogPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};


export default PipelineTaskConsoleLogPanel;
