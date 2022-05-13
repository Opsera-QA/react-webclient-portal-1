import React from "react";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

function PipelineSummaryPanelLite({ pipelineModel, }) {

  if (pipelineModel == null) {
    return null;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineModel} fieldName={"name"} />
        </Col>
        <Col md={6}>
          <SmartIdField model={pipelineModel} fieldName={"_id"} />
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineModel} fieldName={"owner_name"} />
        </Col>
        <Col md={6}>
          <StandaloneTextFieldBase
            text={`${pipelineModel?.getData("workflow.run_count")}`}
            label={"Run Count"}
          />
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineModel} fieldName={"organizationName"} />
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineModel} fieldName={"account"} />
        </Col>
        <Col md={6}>
          <DateFieldBase dataObject={pipelineModel} fieldName={"createdAt"} />
        </Col>
        <Col md={6}>
          <DateFieldBase dataObject={pipelineModel} fieldName={"updatedAt"} />
        </Col>
        <Col xs={12}>
          <TextFieldBase dataObject={pipelineModel} fieldName={"description"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineSummaryPanelLite.propTypes = {
  pipelineModel: PropTypes.object,
};

export default PipelineSummaryPanelLite;