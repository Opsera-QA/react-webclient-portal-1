import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LdapOrganizationEditorPanel from "./LdapOrganizationEditorPanel";
import LdapOrganizationAccountsTable from "../../organization_accounts/LdapOrganizationAccountsTable";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import {faCogs, faUsers} from "@fortawesome/pro-solid-svg-icons";

function LdapOrganizationDetailPanel({ organizationAccounts, ldapOrganizationData, setLdapOrganizationData, loadData, authorizedActions, authorizedOrganizationAccountActions}) {
  const [activeTab, setActiveTab] = useState("accounts");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  return (
    <>
      <div className="pb-3 px-3 h-50">
        <Row>
          <Col>
            <CustomTabContainer>
              <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab}
                         tabText={"Accounts"}/>
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab}
                         tabText={"Settings"}/>
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {ldapOrganizationData &&
              <LdapOrganizationDetailsView
                organizationAccounts={organizationAccounts}
                loadData={loadData}
                activeTab={activeTab}
                setLdapOrganizationData={setLdapOrganizationData}
                ldapOrganizationData={ldapOrganizationData}
                authorizedActions={authorizedActions}
                authorizedOrganizationAccountActions={authorizedOrganizationAccountActions}
              />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapOrganizationDetailsView({activeTab, loadData, setLdapOrganizationData, ldapOrganizationData, organizationAccounts, authorizedActions, authorizedOrganizationAccountActions}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "accounts":
        return <LdapOrganizationAccountsTable ldapOrganizationAccounts={organizationAccounts} authorizedActions={authorizedOrganizationAccountActions} loadData={loadData} />
      case "settings":
        return <LdapOrganizationEditorPanel setLdapOrganizationData={setLdapOrganizationData} ldapOrganizationData={ldapOrganizationData} authorizedActions={authorizedActions} />;
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
  authorizedActions: PropTypes.array,
  authorizedOrganizationAccountActions: PropTypes.array
};

export default LdapOrganizationDetailPanel;


