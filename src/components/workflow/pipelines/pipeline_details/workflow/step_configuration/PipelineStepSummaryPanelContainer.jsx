import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import TextField from "components/common/form_fields/text-field";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

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
      {/*TODO: Wire up threshold*/}
      {/*<Col lg={6}>*/}
      {/*TODO: This is in pipelineData?.threshold and not actual data object*/}
      {/*  <JsonField dataObject={childPipelineDataObject} fieldName={"threshold"}/>*/}
      {/*</Col>*/}
      {children}
    </SummaryPanelContainer>
  );
}


PipelineStepSummaryPanelContainer.propTypes = {
  setActiveTab: PropTypes.func,
  pipelineData: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default PipelineStepSummaryPanelContainer;