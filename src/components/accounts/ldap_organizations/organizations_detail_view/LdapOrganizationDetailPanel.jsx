import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LdapOrganizationAccountsTable from "./LdapOrganizationAccountsTable";
import LdapOrganizationAccountDetails from "./LdapOrganizationAccountDetails";
import LdapOrganizationEditorPanel from "./LdapOrganizationEditorPanel";

function LdapOrganizationDetailPanel({organization, setOrganization}) {
  const [activeTab, setActiveTab] = useState("organizationEditor");
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  const handleAccountClick = (itemId) => {
    console.log("[LdapOrganizationDetailView] handleAccountClick", itemId);
    organization.orgAccounts.forEach((orgAccount) => {
      if (orgAccount.name === itemId) {
        setCurrentAccount(orgAccount);
        setActiveTab("accountDetails");
      }
    });
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <div className="default-custom-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "organizationEditor" ? "active" : "")}
                     onClick={handleTabClick("organizationEditor")} href="#">Organization Editor</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "accountsTable" ? "active" : "")} href="#"
                     onClick={handleTabClick("accountsTable")}>Accounts</a>
                </li>
                <li className="nav-item">
                  <a  className={"nav-link " + (activeTab === "accountDetails" ? "active" : "")} href="#" onClick={handleTabClick(undefined)}>Account Details</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block">
              {organization &&
              <LdapOrganizationDetailsView activeTab={activeTab} setOrganization={setOrganization} organization={organization}
                               currentAccount={currentAccount} handleAccountClick={handleAccountClick}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapOrganizationDetailsView({activeTab, setOrganization, organization, handleAccountClick, currentAccount}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "organizationEditor":
        return <LdapOrganizationEditorPanel setLdapOrganizationData={setOrganization} ldapOrganizationData={organization} />;
      case "accountsTable":
        return <LdapOrganizationAccountsTable data={organization} onClick={handleAccountClick}/>;
      case "accountDetails":
        return <LdapOrganizationAccountDetails account={currentAccount}/>;
      default:
        return null;
    }
  }
}

LdapOrganizationDetailPanel.propTypes = {
  organization: PropTypes.object,
  setOrganization: PropTypes.func,
};

export default LdapOrganizationDetailPanel;


