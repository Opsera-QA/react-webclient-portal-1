import React, {useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import LdapOrganizationAccountSummaryPanel from "./LdapOrganizationAccountSummaryPanel";
import LdapOrganizationAccountsTable from "./LdapOrganizationAccountsTable";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import NewLdapAccountModal from "./NewLdapAccountModal";
import {ldapOrganizationAccountMetaData} from "../../ldap-organization-account-form-fields";
import Model from "../../../../../core/data_model/model";
import {ldapIdpAccountsMetaData} from "../idp_accounts/ldap-idp-account-metadata";

const INITIAL_IDP_ACCOUNT_DATA = {
  name: "",
  domain: "",
  idpRedirectURI: "https://portal.opsera.io/implicit/callback",
  clientID: "0oaou6bztkPJFnxaL0h7",
  issuer: "https://dev-842100.oktapreview.com/oauth2/default",
  baseUrl: "https://dev-842100.oktapreview.com",
  idpVendor: "OKTA",
  configEntryType: "IDP",
  idpNameIDMapping: "idmap"
};

function LdapOrganizationAccountDetailPanel({ldapOrganizationData, ldapOrganizationAccounts, currentAccount, setCurrentAccount, loadData}) {
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [ldapIdpAccountData, setLdapIdpAccountData] = useState(undefined);

  const handleAccountClick = (orgAccount) => {
    setCurrentAccount(new Model(orgAccount, ldapOrganizationAccountMetaData, false));
    let idpAccounts = orgAccount["idpAccounts"];
    if (idpAccounts != null && idpAccounts.length > 0) {
      setLdapIdpAccountData(new Model(orgAccount["idpAccounts"][0], ldapIdpAccountsMetaData, false));
    }
    else {
      setLdapIdpAccountData(new Model(INITIAL_IDP_ACCOUNT_DATA, ldapIdpAccountsMetaData, true));
    }
  };

  const handleBackButton = () => {
    setCurrentAccount(undefined);
    setShowEditPanel(false);
  }


  return (
    <>
      <NewLdapAccountModal showModal={showCreateAccountModal} ldapOrganizationData={ldapOrganizationData} loadData={loadData} setShowModal={setShowCreateAccountModal} />
      <div className="pb-3 px-3">
        <Row>
          <Col>
              {currentAccount != null
                ? showEditPanel ? <LdapOrganizationAccountEditorPanel setLdapOrganizationAccountData={setCurrentAccount} handleBackButton={handleBackButton} setShowEditPanel={setShowEditPanel} ldapOrganizationAccountData={currentAccount} />
                                : <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={currentAccount} handleBackButton={handleBackButton} ldapIdpAccountData={ldapIdpAccountData} setLdapIdpAccountData={setLdapIdpAccountData} setShowEditorPanel={setShowEditPanel}/>
                : <LdapOrganizationAccountsTable setShowCreateAccountModal={setShowCreateAccountModal} ldapOrganizationAccounts={ldapOrganizationAccounts} handleAccountClick={handleAccountClick} />}
          </Col>
        </Row>
      </div>
    </>
  );
}

LdapOrganizationAccountDetailPanel.propTypes = {
  ldapOrganizationAccounts: PropTypes.array,
  ldapOrganizationData: PropTypes.object,
  currentAccount: PropTypes.object,
  setCurrentAccount: PropTypes.func,
  loadData: PropTypes.func
};

export default LdapOrganizationAccountDetailPanel;


