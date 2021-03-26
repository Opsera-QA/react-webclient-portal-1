import React, {useState} from "react";

import PropTypes from "prop-types";
import OrganizationEditorPanel from "components/settings/organizations/organization_detail_view/OrganizationEditorPanel";
import {faIdCard} from "@fortawesome/pro-light-svg-icons";
import OrganizationSummaryPanel from "components/settings/organizations/organization_detail_view/OrganizationSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";

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
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faIdCard} tabName={"manage"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Manage Members"} />
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


