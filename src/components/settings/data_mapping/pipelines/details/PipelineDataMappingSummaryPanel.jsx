import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

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
          <TextFieldBase dataObject={pipelineDataMappingModel} fieldName={"tool_identifier"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField dataObject={pipelineDataMappingModel} fieldName={"tool_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineDataMappingModel} fieldName={"key"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={pipelineDataMappingModel} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TagField dataObject={pipelineDataMappingModel} fieldName={"value"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={pipelineDataMappingModel} fieldName={"createdAt"}/>
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
