import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

// TODO: Rework
function PipelineStepSummaryPanelContainer({ pipelineData, setActiveTab, children }) {
  if (pipelineData == null) {
    return null;
  }

  if (pipelineData?.name == null && pipelineData?.tool?.tool_identifier == null) {
    return (
      <SummaryPanelContainer setActiveTab={setActiveTab}>
        {children}
      </SummaryPanelContainer>
    );
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <StandaloneTextFieldBase text={pipelineData?.name} label={"Step Name"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <StandaloneTextFieldBase text={pipelineData?.tool_category} label={"Tool Category"}/>
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