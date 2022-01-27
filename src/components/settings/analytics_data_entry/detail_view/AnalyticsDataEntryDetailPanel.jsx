import React, { useState } from "react";

import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import AnalyticsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/AnalyticsDataEntrySummaryPanel";
import AnalyticsDataEntryEditorPanel from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryEditorPanel";

function AnalyticsDataEntryDetailPanel({ analyticsDataEntry }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => (e) => {
    e.preventDefault();
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
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
        return <AnalyticsDataEntrySummaryPanel analyticsDataEntry={analyticsDataEntry} setActiveTab={setActiveTab} />;
      case "settings":
        return (
          <AnalyticsDataEntryEditorPanel handleClose={toggleSummaryPanel} analyticsDataEntry={analyticsDataEntry} />
        );
      default:
        return null;
    }
  };

  return <DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />;
}

AnalyticsDataEntryDetailPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
};

export default AnalyticsDataEntryDetailPanel;
