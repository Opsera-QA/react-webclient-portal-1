import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import LdapGroupPermissionsField from "./LdapGroupPermissionsField";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import BooleanField from "components/common/fields/boolean/BooleanField";

function LdapGroupSummaryPanel({ ldapGroupData, domain, setActiveTab }) {
  if (ldapGroupData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <div className="custom-text-field"><label className="text-muted mr-1">Domain:</label><span>{domain}</span></div>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"groupType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"externalSyncGroup"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={ldapGroupData} fieldName={"isSync"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"ownerEmail"}/>
        </Col>
        <Col lg={12}>
          <LdapGroupPermissionsField dataObject={ldapGroupData} />
        </Col>
        <Col lg={12} className="pt-2">
          <LdapUsersTable orgDomain={domain} userData={ldapGroupData.getData("members")} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapGroupSummaryPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  domain: PropTypes.string,
  setActiveTab: PropTypes.func
};


export default LdapGroupSummaryPanel;
