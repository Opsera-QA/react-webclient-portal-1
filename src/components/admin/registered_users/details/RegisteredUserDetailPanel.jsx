import React, { useState } from "react";
import PropTypes from "prop-types";
import AnalyticsProfileEditorPanel from "./analytics_profile/AnalyticsProfileEditorPanel";
import {faClipboardList, faDatabase, faCogs, faUser, faIdCard, faTable} from "@fortawesome/pro-light-svg-icons";
import CustomerDatabaseEditorPanel from "./customer_database/CustomerDatabaseEditorPanel";
import RegisteredUserToolsPanel from "./tools/RegisteredUserToolsPanel";
import RegisteredUserSummary from "./RegisteredUserSummary";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import LdapSettingsPanel
from "components/admin/registered_users/details/ldap_settings/LdapSettingsPanel";
import UserAssignedRolesPanel from "components/settings/users/details/assigned_roles/UserAssignedRolesPanel";
import UserAccessTokenActivityLogPanel from "components/settings/users/details/UserAccessTokenActivityLogPanel";

function RegisteredUserDetailPanel({ userData, setUserData, analyticsProfileData, setAnalyticsProfileData, loadData }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [isDeployingElk, setIsDeployingElk] = useState(false);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faDatabase} tabName={"customerDB"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Customer DB"} />
        <CustomTab icon={faCogs} tabName={"analyticsSettings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Analytics Profile"} />
        <CustomTab icon={faClipboardList} tabName={"tools"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tools"} />
        <CustomTab icon={faUser} activeTab={activeTab} tabText={"LDAP Settings"} tabName={"ldap"} handleTabClick={handleTabClick} />
        <CustomTab
          icon={faIdCard}
          tabName={"assigned-roles"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Assigned Role Access"}
        />
        <CustomTab
          icon={faTable}
          tabName={"access-token-activity-logs"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Access Token Activity Logs"}
        />
        {/*<SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />*/}
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
    case "summary":
      return <RegisteredUserSummary userData={userData} setActiveTab={setActiveTab} showDbConnectionString={true} />;
    case "tools":
      return <RegisteredUserToolsPanel userData={userData} setIsDeployingElk={setIsDeployingElk} isDeployingElk={isDeployingElk} />;
    case "customerDB":
      return <CustomerDatabaseEditorPanel userId={userData?.getMongoDbId()} customerDatabaseData={analyticsProfileData} setCustomerDatabaseData={setAnalyticsProfileData} />;
    case "analyticsSettings":
      return <AnalyticsProfileEditorPanel setAnalyticsProfileData={setAnalyticsProfileData} analyticsProfileData={analyticsProfileData} />;
    case "ldap":
      return <LdapSettingsPanel userData={userData} ldapData={userData?.getData("ldap")} loadData={loadData} showSyncButton={true} />;
    case "assigned-roles":
      return (
        <UserAssignedRolesPanel
          userEmailAddress={userData?.getData("email")}
        />
      );
    case "access-token-activity-logs":
      return (
        <UserAccessTokenActivityLogPanel
          userId={userData?.getData("_id")}
          className={"mt-2"}
        />
      );
      // case "settings":
      // return <AnalyticsProfileEditorPanel setAnalyticsProfileData={setAnalyticsProfileData} analyticsProfileData={analyticsProfileData} />;
    default:
      return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

RegisteredUserDetailPanel.propTypes = {
  analyticsProfileData: PropTypes.object,
  setAnalyticsProfileData: PropTypes.func,
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  loadData: PropTypes.func
};

export default RegisteredUserDetailPanel;


