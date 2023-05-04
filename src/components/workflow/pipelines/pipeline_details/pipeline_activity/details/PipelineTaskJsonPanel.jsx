import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

function PipelineTaskJsonPanel({ pipelineTaskData }) {
  return (
    <SummaryPanelContainer>
      <Row className={"mt-2"}>
        <Col md={12}>
          <StandaloneJsonField json={pipelineTaskData} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineTaskJsonPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};


export default PipelineTaskJsonPanel;
