import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function LdapDepartmentSummaryPanel({ ldapDepartmentData, setActiveTab }) {
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapDepartmentData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapDepartmentData} fieldName={"ownerEmail"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapDepartmentData} fieldName={"departmentGroupName"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapDepartmentSummaryPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default LdapDepartmentSummaryPanel;
