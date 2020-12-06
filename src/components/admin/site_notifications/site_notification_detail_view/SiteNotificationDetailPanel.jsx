import React, { useState } from "react";
import PropTypes from "prop-types";

import SiteNotificationEditorPanel from "./SiteNotificationEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import SiteNotificationSummaryPanel from "./SiteNotificationSummaryPanel";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";

function SiteNotificationDetailPanel({ siteNotificationData, setSiteNotificationData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <SiteNotificationSummaryPanel siteNotificationData={siteNotificationData} setSiteNotificationData={setSiteNotificationData} setActiveTab={setActiveTab} />;
      case "settings":
      return <SiteNotificationEditorPanel setSiteNotificationData={setSiteNotificationData} siteNotificationData={siteNotificationData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

SiteNotificationDetailPanel.propTypes = {
  siteNotificationData: PropTypes.object,
  setSiteNotificationData: PropTypes.func,
};

export default SiteNotificationDetailPanel;


