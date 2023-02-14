import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import LdapGroupMembersTable from "components/settings/ldap_groups/LdapGroupMembersTable";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";

function LdapGroupSummaryPanel({ ldapGroupData, domain, loadData, isLoading }) {
  if (ldapGroupData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer className={"mx-2 mt-2"}>
      <Row className={"mb-2"}>
        <Col lg={6}>
          <TextFieldBase
            dataObject={ldapGroupData}
            fieldName={"name"}
          />
        </Col>
        <Col lg={6}>
          <StandaloneTextFieldBase label={"Domain"} text={domain} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"groupType"}/>
        </Col>
        <Col lg={6}>
          <EmailAddressField model={ldapGroupData} fieldName={"ownerEmail"}/>
        </Col>
      </Row>
      <LdapGroupMembersTable
        loadData={loadData}
        orgDomain={domain}
        userData={ldapGroupData.getData("members")}
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
