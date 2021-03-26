import React, {useState} from "react";

import PropTypes from "prop-types";
import OrganizationEditorPanel from "components/settings/organizations/organization_detail_view/OrganizationEditorPanel";
import OrganizationSummaryPanel from "components/settings/organizations/organization_detail_view/OrganizationSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";

function OrganizationDetailPanel({organizationData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
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
        return <OrganizationSummaryPanel organizationData={organizationData} setActiveTab={setActiveTab} />;
      case "settings":
        return <OrganizationEditorPanel handleClose={toggleSummaryPanel} organizationData={organizationData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

OrganizationDetailPanel.propTypes = {
  organizationData: PropTypes.object,
};

export default OrganizationDetailPanel;


