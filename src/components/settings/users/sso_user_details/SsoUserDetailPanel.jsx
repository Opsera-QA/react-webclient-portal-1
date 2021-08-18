import React, { useState } from "react";
import PropTypes from "prop-types";
import SsoUserEditorPanel from "components/settings/users/sso_user_details/SsoUserEditorPanel";
import SsoUserSummaryPanel from "components/settings/users/sso_user_details/SsoUserSummaryPanel";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function SsoUserDetailPanel({ ssoUserData, authorizedActions, hideSettings }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {/*<SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} disabled={hideSettings} />*/}
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <SsoUserSummaryPanel ssoUserData={ssoUserData} setActiveTab={!hideSettings ? setActiveTab : null} />;
      case "settings":
        return <SsoUserEditorPanel ssoUserData={ssoUserData} handleClose={toggleSummaryPanel} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

SsoUserDetailPanel.propTypes = {
  ssoUserData: PropTypes.object,
  hideSettings: PropTypes.bool,
  authorizedActions: PropTypes.array
};

export default SsoUserDetailPanel;


