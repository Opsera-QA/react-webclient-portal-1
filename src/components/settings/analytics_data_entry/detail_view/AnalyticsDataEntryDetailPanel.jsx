import React, { useState } from "react";

import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import AnalyticsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/AnalyticsDataEntrySummaryPanel";
import AnalyticsDataEntryEditorPanel from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryEditorPanel";
import useComponentStateReference from "hooks/useComponentStateReference";
import AnalyticsDataEntryRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_entries/analyticsDataEntryRole.helper";

function AnalyticsDataEntryDetailPanel({ analyticsDataEntry }) {
  const [activeTab, setActiveTab] = useState("summary");
  const { userData } = useComponentStateReference();

  const handleTabClick = (activeTab) => (e) => {
    e.preventDefault();
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  // TODO: We should handle this inside the summary panels themselves
  const getActiveTabSetter = () => {
    if (AnalyticsDataEntryRoleHelper.canUpdateAnalyticsDataEntry(userData) === true) {
      return setActiveTab;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={AnalyticsDataEntryRoleHelper.canUpdateAnalyticsDataEntry(userData) === true}
          disabled={AnalyticsDataEntryRoleHelper.canUpdateAnalyticsDataEntry(userData) !== true}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <AnalyticsDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            setActiveTab={getActiveTabSetter()}
          />
        );
      case "settings":
        return (
          <AnalyticsDataEntryEditorPanel
            handleClose={toggleSummaryPanel}
            analyticsDataEntry={analyticsDataEntry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

AnalyticsDataEntryDetailPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
};

export default AnalyticsDataEntryDetailPanel;
