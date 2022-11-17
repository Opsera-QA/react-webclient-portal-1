import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactJson from "react-json-view";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function PipelineTaskJsonPanel({ pipelineTaskData }) {
  return (
    <SummaryPanelContainer>
      <Row className={"mt-2"}>
        <Col md={12}>
          <ReactJson src={pipelineTaskData} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineTaskJsonPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};


export default PipelineTaskJsonPanel;
