import React, { useState } from "react";
import PropTypes from "prop-types";
import UserMappingEditorPanel from "./UsersMappingEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import UserMappingSummaryPanel from "./UsersMappingSummaryPanel";
import DetailTabPanelContainer from "../../../../common/panels/detail_view/DetailTabPanelContainer";
import SummaryTab from "../../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../../common/tabs/detail_view/SettingsTab";

function UsersMappingDetailPanel({ usersMappingData, setUsersMappingData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => (e) => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <UserMappingSummaryPanel
            usersMappingDto={usersMappingData}
            setUsersMappingData={setUsersMappingData}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return <UserMappingEditorPanel toolTypeData={usersMappingData} setToolTypeData={setUsersMappingData} />;
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
