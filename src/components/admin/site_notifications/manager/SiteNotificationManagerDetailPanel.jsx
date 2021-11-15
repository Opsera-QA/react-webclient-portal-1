import React, { useState } from "react";
import PropTypes from "prop-types";
import SiteNotificationEditorPanel
  from "components/admin/site_notifications/details/SiteNotificationEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";


function SiteNotificationManagerDetailPanel({ siteWideNotificationData, setSiteWideNotificationData }) {
  const [activeTab, setActiveTab] = useState("site");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab icon={faSitemap} activeTab={activeTab} handleTabClick={handleTabClick} tabName={"site"} tabText={"Site"} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "site":
        return <SiteNotificationEditorPanel siteNotificationData={siteWideNotificationData} setSiteNotificationData={setSiteWideNotificationData} />;
      default:
        return null;
    }
  };

  if (siteWideNotificationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <div className="mt-3">
      <DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />
    </div>
  );
}

SiteNotificationManagerDetailPanel.propTypes = {
  siteWideNotificationData: PropTypes.object,
  setSiteWideNotificationData: PropTypes.func,
};

export default SiteNotificationManagerDetailPanel;


