import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import OrganizationSettingsSummaryPanel
  from "components/admin/organization_settings/details/OrganizationSettingsSummaryPanel";

export default function OrganizationSettingsDetailPanel(
  {
    organizationSettingsModel,
    setOrganizationSettingsModel,
  }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {/*<CustomTab tabText={"Tool Usage"} handleTabClick={handleTabClick} icon={faWrench} activeTab={activeTab} tabName={"tools"} />*/}
        {/*<CustomTab tabText={"Pipeline Usage"} handleTabClick={handleTabClick} icon={faDraftingCompass} activeTab={activeTab} tabName={"pipelines"} />*/}
        {/*<CustomTab tabText={"Dashboard Usage"} handleTabClick={handleTabClick} icon={faChartNetwork} activeTab={activeTab} tabName={"dashboards"} />*/}
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <OrganizationSettingsSummaryPanel
            organizationSettingsModel={organizationSettingsModel}
            setOrganizationSettingsModel={setOrganizationSettingsModel}
          />
        );
      case "settings":
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

OrganizationSettingsDetailPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
  setOrganizationSettingsModel: PropTypes.func,
};
