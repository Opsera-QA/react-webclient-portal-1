import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SiteRolePermissionsField from "components/settings/ldap_site_roles/details/SiteRolePermissionsField";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import UsersTable from "components/settings/users/UsersTable";

function LdapGroupSummaryPanel({ ldapGroupData, domain, loadData, isLoading }) {
  if (ldapGroupData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer>
      <Row className={"mb-2"}>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <StandaloneTextFieldBase label={"Domain"} text={domain} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"groupType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"ownerEmail"}/>
        </Col>
        <Col lg={12}>
          <SiteRolePermissionsField model={ldapGroupData} />
        </Col>
      </Row>
      <UsersTable
        loadData={loadData}
        orgDomain={domain}
        users={ldapGroupData.getData("members")}
        isLoading={isLoading}
      />
    </SummaryPanelContainer>
  );
}

LdapGroupSummaryPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};


export default LdapGroupSummaryPanel;
