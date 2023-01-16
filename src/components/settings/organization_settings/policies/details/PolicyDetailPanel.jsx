import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PolicyEditorPanel from "components/settings/organization_settings/policies/details/PolicyEditorPanel";
import PolicySummaryPanel from "components/settings/organization_settings/policies/details/PolicySummaryPanel";

export default function PolicyDetailPanel(
  {
    policyModel,
    setPolicyModel,
  }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (selectedTab) => e => {
    e.preventDefault();

    if (activeTab !== selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <SettingsTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <PolicySummaryPanel
            policyModel={policyModel}
            setPolicyModel={setPolicyModel}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <PolicyEditorPanel
            policyModel={policyModel}
            setPolicyModel={setPolicyModel}
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

PolicyDetailPanel.propTypes = {
  policyModel: PropTypes.object,
  setPolicyModel: PropTypes.func,
};

