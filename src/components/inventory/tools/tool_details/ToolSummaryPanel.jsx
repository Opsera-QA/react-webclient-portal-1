import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";

function ToolSummaryPanel({ toolData, setActiveTab }) {
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"tool_identifier"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={toolData} fieldName={"description"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"tool_type_identifier"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"_id"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"account"} />
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={toolData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"classification"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolSummaryPanel.propTypes = {
  toolData: PropTypes.object,
  setActiveTab: PropTypes.func
}

export default ToolSummaryPanel;
