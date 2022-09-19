import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PlatformSystemParameterEditorPanel
  from "components/admin/system_parameters/details/PlatformSystemParameterEditorPanel";
import PlatformSettingsSummaryPanel from "components/admin/platform_settings/details/PlatformSettingsSummaryPanel";
import PlatformSettingsEditorPanel from "components/admin/platform_settings/details/PlatformSettingsEditorPanel";
import PlatformSettingFeaturesPanel
  from "components/admin/platform_settings/details/features/PlatformSettingFeaturesPanel";
import { faFileAlt, faFileBinary } from "@fortawesome/pro-light-svg-icons";
import CustomTab from "components/common/tabs/CustomTab";

export default function PlatformSettingsDetailPanel(
  {
    platformSettingsModel,
    setPlatformSettingsModel,
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
        <CustomTab
          activeTab={activeTab}
          tabText={"Features"}
          tabName={"features"}
          handleTabClick={handleTabClick}
          icon={faFileBinary}
        />
        <SettingsTab activeTab={activeTab} handleTabClick={handleTabClick} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <PlatformSettingsSummaryPanel
            platformSettingsModel={platformSettingsModel}
            setActiveTab={setActiveTab}
          />
        );
      case "features":
        return (
          <PlatformSettingFeaturesPanel
            platformSettingsId={platformSettingsModel?.getMongoDbId()}
          />
        );
      case "settings":
        return (
          <PlatformSettingsEditorPanel
            platformSettingsModel={platformSettingsModel}
            setPlatformSettingsModel={setPlatformSettingsModel}
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

PlatformSettingsDetailPanel.propTypes = {
  platformSettingsModel: PropTypes.object,
  setPlatformSettingsModel: PropTypes.func,
};


