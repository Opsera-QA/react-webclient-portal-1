import React from "react";
import { Row, Col} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import PropTypes from "prop-types";

function LdapIdpAccountSummaryPanel({ldapIdpAccountData, setShowIdpEditPanel, authorizedActions}) {
  if (!authorizedActions?.includes("get_idp_account_details")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to view this IDP Account"} />;
  }

  if (ldapIdpAccountData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer editingAllowed={authorizedActions?.includes("update_idp_account")} setActiveTab={() => {setShowIdpEditPanel(true)}}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"domain"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"idpRedirectURI"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"clientID"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"issuer"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"baseUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"idpVendor"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"configEntryType"} />
        </Col>
        <Col lg={6}>
            <TextFieldBase dataObject={ldapIdpAccountData} fieldName={"idpNameIDMapping"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapIdpAccountSummaryPanel.propTypes = {
  ldapIdpAccountData: PropTypes.object,
  setShowIdpEditPanel: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapIdpAccountSummaryPanel;
