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

function LdapOrganizationAccountDetailPanel({ldapOrganizationData, ldapOrganizationAccounts, currentAccount, setCurrentAccount, loadData}) {
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const handleAccountClick = (orgAccount) => {
    setCurrentAccount(new Model(orgAccount, ldapOrganizationAccountMetaData, false));
  };

  const handleBackButton = () => {
    setCurrentAccount(undefined);
    setShowEditPanel(false);
  }

  const onModalClose = () => {
    loadData();
    setShowCreateAccountModal(false);
  }

  return (
    <>
      {showCreateAccountModal ? <NewLdapAccountModal
        showModal={showCreateAccountModal}
        ldapOrganizationData={ldapOrganizationData}
        onModalClose={onModalClose} /> : null }
      <div className="pb-3 px-3">
        <Row>
          <Col>
              {currentAccount != null
                ? showEditPanel ? <LdapOrganizationAccountEditorPanel setLdapOrganizationAccountData={setCurrentAccount} handleBackButton={handleBackButton} setShowEditPanel={setShowEditPanel} ldapOrganizationAccountData={currentAccount} />
                                : <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={currentAccount} handleBackButton={handleBackButton} setShowEditorPanel={setShowEditPanel}/>
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


