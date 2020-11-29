import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import TextField from "../../../../../common/form_fields/text-field";
import SummaryPanelContainer from "../../../../../common/panels/detail_view/SummaryPanelContainer";
import ReactJson from "react-json-view";

function PipelineStepSummaryPanelContainer({ pipelineData, setActiveTab, children }) {
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextField value={pipelineData?.name} label={"Pipeline Step Name"}/>
        </Col>
        <Col lg={6}>
          <TextField value={pipelineData?.tool?.tool_identifier} label={"Pipeline Step Tool Identifier"}/>
        </Col>
      </Row>
      {children}
      <Row>
        <Col>
          <ReactJson src={pipelineData?.tool} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}


PipelineStepSummaryPanelContainer.propTypes = {
  setActiveTab: PropTypes.func,
  pipelineData: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default PipelineStepSummaryPanelContainer;