import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import BooleanField from "components/common/fields/boolean/BooleanField";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

function LdapGroupSummaryPanel({ ldapGroupData, domain, loadData, setActiveTab }) {
  if (ldapGroupData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab} className={"mx-2 mt-2"}>
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
          <TextFieldBase dataObject={ldapGroupData} fieldName={"externalSyncGroup"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={ldapGroupData} fieldName={"isSync"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapGroupData} fieldName={"ownerEmail"}/>
        </Col>
      </Row>
      <LdapUsersTable loadData={loadData} orgDomain={domain} userData={ldapGroupData.getData("members")} />
    </SummaryPanelContainer>
  );
}

LdapGroupSummaryPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  domain: PropTypes.string,
  setActiveTab: PropTypes.func,
  loadData: PropTypes.func
};


export default LdapGroupSummaryPanel;
