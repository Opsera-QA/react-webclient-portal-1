import React, {useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import LdapOrganizationAccountSummaryPanel from "./LdapOrganizationAccountSummaryPanel";
import LdapOrganizationAccountsTable from "./LdapOrganizationAccountsTable";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import NewLdapAccountModal from "./NewLdapAccountModal";

function LadpOrganizationAccountDetailPanel({ldapOrganizationData, loadData}) {
  const [currentAccount, setCurrentAccount] = useState(undefined);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const handleAccountClick = (orgAccount) => {
    setCurrentAccount(orgAccount);
  };

  const handleBackButton = () => {
    console.log("handling back");
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
            {console.log("Current Account: " + JSON.stringify(currentAccount))}
              {currentAccount != null
                ? showEditPanel ? <LdapOrganizationAccountEditorPanel setLdapOrganizationAccountData={setCurrentAccount} handleBackButton={handleBackButton} setShowEditPanel={setShowEditPanel} ldapOrganizationAccountData={currentAccount} />
                                : <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={currentAccount} handleBackButton={handleBackButton} setShowEditorPanel={setShowEditPanel}/>
                : <LdapOrganizationAccountsTable setShowCreateAccountModal={setShowCreateAccountModal} ldapOrganizationAccounts={ldapOrganizationData["orgAccounts"]}
                                                 handleAccountClick={handleAccountClick} />}
          </Col>
        </Row>
      </div>
    </>
  );
}

LadpOrganizationAccountDetailPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  loadData: PropTypes.func
};

export default LadpOrganizationAccountDetailPanel;


