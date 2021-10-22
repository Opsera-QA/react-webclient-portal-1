import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";

function LdapDepartmentSummaryPanel({ ldapDepartmentData, orgDomain, setActiveTab }) {
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
      <div className={"mt-3"}><LdapUsersTable orgDomain={orgDomain} userData={ldapDepartmentData.members} /></div>
    </SummaryPanelContainer>
  );
}

LdapDepartmentSummaryPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  setActiveTab: PropTypes.func,
  orgDomain: PropTypes.string,
};


export default LdapDepartmentSummaryPanel;
