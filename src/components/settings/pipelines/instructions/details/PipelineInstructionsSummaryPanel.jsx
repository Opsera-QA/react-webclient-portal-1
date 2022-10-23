import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function PipelineInstructionsSummaryPanel({ ldapUserData, setActiveTab } ) {
  if (ldapUserData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"firstName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"lastName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"preferredName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"emailAddress"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"site"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"departmentName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapUserData} fieldName={"title"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineInstructionsSummaryPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default PipelineInstructionsSummaryPanel;
