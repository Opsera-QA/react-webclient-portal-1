import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import SiteNotificationSummaryPanel
  from "components/admin/site_notifications/details/SiteNotificationSummaryPanel";
import SiteNotificationEditorPanel
  from "components/admin/site_notifications/details/SiteNotificationEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

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


