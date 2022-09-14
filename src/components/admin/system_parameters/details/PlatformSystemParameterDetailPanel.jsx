import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PlatformSystemParameterSummaryPanel
  from "components/admin/system_parameters/details/PlatformSystemParameterSummaryPanel";
import PlatformSystemParameterEditorPanel
  from "components/admin/system_parameters/details/PlatformSystemParameterEditorPanel";

export default function PlatformSystemParameterDetailPanel(
  {
    platformSystemParameterModel,
    setPlatformSystemParameterModel,
  }) {
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
        <SummaryTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <SettingsTab activeTab={activeTab} handleTabClick={handleTabClick} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <PlatformSystemParameterSummaryPanel
            platformSystemParameterModel={platformSystemParameterModel}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <PlatformSystemParameterEditorPanel
            platformSystemParameterModel={platformSystemParameterModel}
            setPlatformSystemParameterModel={setPlatformSystemParameterModel}
            handleClose={toggleSummaryPanel}
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

PlatformSystemParameterDetailPanel.propTypes = {
  platformSystemParameterModel: PropTypes.object,
  setPlatformSystemParameterModel: PropTypes.func,
};


