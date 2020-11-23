import React, { useState } from "react";
import PropTypes from "prop-types";
import AnalyticsProfileEditorPanel from "./analytics_profile/AnalyticsProfileEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faClipboardList, faDatabase, faCogs} from "@fortawesome/pro-light-svg-icons";
import CustomerDatabaseEditorPanel from "./customer_database/CustomerDatabaseEditorPanel";
import RegisteredUserToolsPanel from "./tools/RegisteredUserToolsPanel";
import RegisteredUserSummary from "./RegisteredUserSummary";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";

function RegisteredUserDetailPanel({ userData, setUserData, analyticsProfileData, setAnalyticsProfileData }) {
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
        {/*<SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />*/}
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <RegisteredUserSummary userData={userData} setActiveTab={setActiveTab} />;
      case "tools":
        return <RegisteredUserToolsPanel userData={userData} setIsDeployingElk={setIsDeployingElk} isDeployingElk={isDeployingElk} />
      case "customerDB":
        return <CustomerDatabaseEditorPanel userId={userData["_id"]} customerDatabaseData={analyticsProfileData} setCustomerDatabaseData={setAnalyticsProfileData} />;
      case "analyticsSettings":
        return <AnalyticsProfileEditorPanel setAnalyticsProfileData={setAnalyticsProfileData} analyticsProfileData={analyticsProfileData} />;
      case "settings":
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
  setUserData: PropTypes.func
};

export default RegisteredUserDetailPanel;


