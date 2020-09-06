import React, {useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import Model from "../../../../../../core/data_model/model";
import {ldapIdpAccountsMetaData} from "../../idp_accounts/ldap-idp-account-metadata";
import LdapUsersTable from "../../../../../settings/ldap_users/LdapUsersTable";
import LdapGroupsTable from "../../../../../settings/ldap_groups/LdapGroupsTable";
import LdapIdpAccountEditorPanel from "../../idp_accounts/LdapIdpAccountEditorPanel";
import LdapIdpAccountSummaryPanel from "../../idp_accounts/LdapIdpAccountSummaryPanel";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import {faCogs, faUsers} from "@fortawesome/pro-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {faUsersClass} from "@fortawesome/pro-solid-svg-icons/faUsersClass";
import {faBuilding} from "@fortawesome/pro-solid-svg-icons/faBuilding";
import {faCubes} from "@fortawesome/pro-solid-svg-icons/faCubes";

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

function LdapOrganizationAccountDetailPanel({ldapOrganizationAccountData, setLdapOrganizationAccountData, loadData}) {
  const [showIdpEditPanel, setShowIdpEditPanel] = useState(false);
  const [ldapIdpAccountData, setLdapIdpAccountData] = useState({});
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    loadIdpAccount();
  }, []);

  const loadIdpAccount = () => {
    let idpAccounts = ldapOrganizationAccountData.getData("idpAccounts");
    if (idpAccounts != null && idpAccounts.length > 0) {
      setLdapIdpAccountData(new Model(idpAccounts[0], ldapIdpAccountsMetaData, false));
    }
    else {
      setLdapIdpAccountData(new Model(INITIAL_IDP_ACCOUNT_DATA, ldapIdpAccountsMetaData, true));
    }
  };

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
              <CustomTab icon={faUsers} tabName={"users"} handleTabClick={handleTabClick} activeTab={activeTab}
                         tabText={"Users"}/>
              <CustomTab icon={faUsersClass} tabName={"groups"} handleTabClick={handleTabClick} activeTab={activeTab}
                         tabText={"Groups"}/>
              <CustomTab icon={faBuilding} tabName={"departments"} handleTabClick={handleTabClick} activeTab={activeTab}
                         tabText={"Departments"}/>
              <CustomTab icon={faCubes} tabName={"idpAccounts"} handleTabClick={handleTabClick} activeTab={activeTab}
                         tabText={"IDP Account"}/>
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab}
                         tabText={"Settings"}/>
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {ldapOrganizationAccountData &&
              <LdapOrganizationAccountTabView showIdpEditPanel={showIdpEditPanel}
                                              ldapIdpAccountData={ldapIdpAccountData}
                                              setLdapIdpAccountData={setLdapIdpAccountData}
                                              setShowIdpEditPanel={setShowIdpEditPanel}
                                              ldapOrganizationAccountData={ldapOrganizationAccountData}
                                              loadData={loadData}
                                              activeTab={activeTab}
                                              setLdapOrganizationAccountData={setLdapOrganizationAccountData}
              />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapOrganizationAccountTabView({activeTab, ldapIdpAccountData, setLdapIdpAccountData, setLdapOrganizationAccountData, ldapOrganizationAccountData, showIdpEditPanel, setShowIdpEditPanel, loadData}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab, ldapOrganizationAccountData]);
  if (activeTab) {
    switch (activeTab) {
      case "users":
        return <LdapUsersTable orgDomain={ldapOrganizationAccountData["orgDomain"]} userData={ldapOrganizationAccountData.getData("users")} />
      case "groups":
        return <LdapGroupsTable orgDomain={ldapOrganizationAccountData["orgDomain"]} groupData={ldapOrganizationAccountData.getData("groups")} />
      case "idpAccounts":
        return(<>
            {showIdpEditPanel || ldapIdpAccountData.isNew()
              ? <LdapIdpAccountEditorPanel setLdapIdpAccountData={setLdapIdpAccountData}
                                           setShowIdpEditPanel={setShowIdpEditPanel}
                                           ldapOrganizationAccountData={ldapOrganizationAccountData}
                                           ldapIdpAccountData={ldapIdpAccountData}/>
              : <LdapIdpAccountSummaryPanel ldapIdpAccountData={ldapIdpAccountData}
                                            setShowIdpEditPanel={setShowIdpEditPanel}/>
            }</>
        );
      case "departments":
        return <div className="text-center p-5 text-muted mt-5">Department management is not currently available.</div>;
      case "settings":
        return <LdapOrganizationAccountEditorPanel ldapOrganizationAccountData={ldapOrganizationAccountData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} loadData={loadData} />;
      default:
        return null;
    }
  }
}

LdapOrganizationAccountDetailPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  setLdapOrganizationAccountData: PropTypes.func,
  loadData: PropTypes.func
};

export default LdapOrganizationAccountDetailPanel;


