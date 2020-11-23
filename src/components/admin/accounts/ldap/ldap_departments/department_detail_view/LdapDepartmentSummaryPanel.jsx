import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import SummaryPanelContainer from "../../../../../common/panels/detail_view/SummaryPanelContainer";

function LdapDepartmentSummaryPanel({ ldapDepartmentData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={ldapDepartmentData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapDepartmentData} fieldName={"ownerEmail"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapDepartmentData} fieldName={"departmentGroupName"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapDepartmentSummaryPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  orgDomain: PropTypes.string
};


export default LdapDepartmentSummaryPanel;
