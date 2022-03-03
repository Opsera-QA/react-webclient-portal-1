import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function PipelineDataMappingSummaryPanel(
  {
    pipelineDataMappingModel,
    setActiveTab,
  }) {

  if (pipelineDataMappingModel === null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineDataMappingModel} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineDataMappingModel} fieldName={"externalId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineDataMappingModel} fieldName={"owner"}/>
        </Col>
        <Col lg={6}>
          <TagField dataObject={pipelineDataMappingModel} fieldName={"tags"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={pipelineDataMappingModel} fieldName={"description"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={pipelineDataMappingModel} fieldName={"notes"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineDataMappingSummaryPanel.propTypes = {
  pipelineDataMappingModel: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default PipelineDataMappingSummaryPanel;
