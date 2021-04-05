import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactJson from "react-json-view";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function ChartJsonPanel({ pipelineStepData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <ReactJson src={pipelineStepData} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ChartJsonPanel.propTypes = {
  pipelineStepData: PropTypes.object,
};


export default ChartJsonPanel;
