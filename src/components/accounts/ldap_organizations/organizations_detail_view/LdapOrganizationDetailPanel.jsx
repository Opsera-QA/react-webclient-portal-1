import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LdapOrganizationEditorPanel from "./LdapOrganizationEditorPanel";
import LadpOrganizationAccountDetailPanel from "./ldap_organization_accounts/LdapOrganizationAccountDetailPanel";

function LdapOrganizationDetailPanel({ organizationAccounts, ldapOrganizationData, setLdapOrganizationData, loadData}) {
  const [activeTab, setActiveTab] = useState("accounts");
  const [currentAccount, setCurrentAccount] = useState(undefined);

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    if (activeTab === "accounts") {
      setCurrentAccount(null);
    }
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  return (
    <>
      <div className="pb-3 px-3 h-50">
        <Row>
          <Col lg={12}>
            <div className="default-custom-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "accounts" ? "active" : "")} href="#"
                     onClick={handleTabClick("accounts")}>Accounts</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "organizationEditor" ? "active" : "")}
                     onClick={handleTabClick("organizationEditor")} href="#">Settings</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={12}>
            <div className="tabbed-content-block detail-view-detail-panel">
              {ldapOrganizationData &&
              <LdapOrganizationDetailsView organizationAccounts={organizationAccounts} currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} loadData={loadData} activeTab={activeTab} setLdapOrganizationData={setLdapOrganizationData} ldapOrganizationData={ldapOrganizationData}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapOrganizationDetailsView({activeTab, setCurrentAccount, currentAccount, setLdapOrganizationData, ldapOrganizationData, loadData, organizationAccounts}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "organizationEditor":
        return <LdapOrganizationEditorPanel setLdapOrganizationData={setLdapOrganizationData} ldapOrganizationData={ldapOrganizationData} />;
      case "accounts":
        return <LadpOrganizationAccountDetailPanel ldapOrganizationAccounts={organizationAccounts} loadData={loadData} currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} ldapOrganizationData={ldapOrganizationData} />;
      default:
        return null;
    }
  }
}

LdapOrganizationDetailPanel.propTypes = {
  setCurrentAccount: PropTypes.func,
  currentAccount: PropTypes.object,
  organizationAccounts: PropTypes.array,
  loadData: PropTypes.func,
  ldapOrganizationData: PropTypes.object,
  setLdapOrganizationData: PropTypes.func,
};

export default LdapOrganizationDetailPanel;


