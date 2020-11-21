import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoTagField from "../../../common/form_fields/dto_form_fields/dto-tag-field";
import DetailPanelContainer from "../../../common/panels/detail_panel_container/DetailPanelContainer";

function ToolSummaryPanel({ toolData }) {
  return (
    <DetailPanelContainer showRequiredFieldsMessage={false}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"tool_identifier"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"tool_type_identifier"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"_id"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"account"} />
        </Col>
        <Col lg={6}>
          <DtoDateField dataObject={toolData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"description"} />
        </Col>
        <Col lg={6}>
          <DtoTagField dataObject={toolData} fieldName={"tags"} />
        </Col>
      </Row>
    </DetailPanelContainer>
  );
}

ToolSummaryPanel.propTypes = {
  toolData: PropTypes.object
}

export default ToolSummaryPanel;
