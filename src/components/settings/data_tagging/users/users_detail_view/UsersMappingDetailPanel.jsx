import React, { useState } from "react";
import PropTypes from "prop-types";
import UserMappingEditorPanel from "./UsersMappingEditorPanel";
import UserMappingSummaryPanel from "./UsersMappingSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function UsersMappingDetailPanel({ usersMappingData, setUsersMappingData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => (e) => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <UserMappingSummaryPanel usersMappingDto={usersMappingData} setUsersMappingData={setUsersMappingData} setActiveTab={setActiveTab} />;
      case "settings":
        return <UserMappingEditorPanel toolTypeData={usersMappingData} setToolTypeData={setUsersMappingData} handleClose={toggleSummaryPanel} />;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  return <DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />;
}

UsersMappingDetailPanel.propTypes = {
  usersMappingData: PropTypes.object,
  setUsersMappingData: PropTypes.func,
};

export default UsersMappingDetailPanel;
