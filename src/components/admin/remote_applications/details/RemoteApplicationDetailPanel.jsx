import React, { useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import RemoteApplicationSummaryPanel
  from "components/admin/remote_applications/details/RemoteApplicationSummaryPanel";

function RemoteApplicationDetailPanel({ telemetryData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  if (telemetryData == null) {
    return <LoadingDialog size="sm" />;
  }

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <RemoteApplicationSummaryPanel telemetryData={telemetryData} setActiveTab={setActiveTab} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

RemoteApplicationDetailPanel.propTypes = {
  telemetryData: PropTypes.object,
};

export default RemoteApplicationDetailPanel;


