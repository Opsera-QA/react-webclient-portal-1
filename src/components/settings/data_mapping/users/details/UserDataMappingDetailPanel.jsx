import React, { useState } from "react";
import PropTypes from "prop-types";
import UserMappingEditorPanel from "components/settings/data_mapping/users/details/UserDataMappingEditorPanel";
import UserMappingSummaryPanel from "components/settings/data_mapping/users/details/UserDataMappingSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function UserDataMappingDetailPanel({ userDataMappingModel, setUserDataMappingModel }) {
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
      return (
        <UserMappingSummaryPanel
          userDataMappingModel={userDataMappingModel}
          setUserDataMappingModel={setUserDataMappingModel}
          setActiveTab={setActiveTab}
        />
      );
    case "settings":
      return (
        <UserMappingEditorPanel
          userDataMappingModel={userDataMappingModel}
          setUserDataMappingModel={setUserDataMappingModel}
          handleClose={toggleSummaryPanel}
        />
      );
    default:
      return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={userDataMappingModel?.canUpdate() === true}
          disabled={userDataMappingModel?.canUpdate() !== true}
        />
      </CustomTabContainer>
    );
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

UserDataMappingDetailPanel.propTypes = {
  userDataMappingModel: PropTypes.object,
  setUserDataMappingModel: PropTypes.func,
};

export default UserDataMappingDetailPanel;
