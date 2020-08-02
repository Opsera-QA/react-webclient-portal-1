import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LdapOrganizationEditorPanel from "./LdapOrganizationEditorPanel";
import LadpOrganizationAccountDetailPanel from "./ldap_organization_accounts/LdapOrganizationAccountDetailPanel";

function LdapOrganizationDetailPanel({organization, setOrganization, loadData}) {
  const [activeTab, setActiveTab] = useState("accounts");

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
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
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block">
              {organization &&
              <LdapOrganizationDetailsView loadData={loadData} activeTab={activeTab} setOrganization={setOrganization} organization={organization}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapOrganizationDetailsView({activeTab, setOrganization, organization, loadData}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "organizationEditor":
        return <LdapOrganizationEditorPanel setLdapOrganizationData={setOrganization} ldapOrganizationData={organization} />;
      case "accounts":
        return <LadpOrganizationAccountDetailPanel loadData={loadData} ldapOrganizationData={organization} />;
      default:
        return null;
    }
  }
}

LdapOrganizationDetailPanel.propTypes = {
  loadData: PropTypes.func,
  organization: PropTypes.object,
  setOrganization: PropTypes.func,
};

export default LdapOrganizationDetailPanel;


