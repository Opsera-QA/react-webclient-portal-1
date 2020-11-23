import React, { useState } from "react";
import PropTypes from "prop-types";

import ToolTypeEditorPanel from "./ToolTypeEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import ToolTypeSummaryPanel from "./ToolTypeSummaryPanel";
import DetailTabPanelContainer from "../../../../common/panels/detail_view/DetailTabPanelContainer";
import SummaryTab from "../../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../../common/tabs/detail_view/SettingsTab";

function ToolTypeDetailPanel({ toolTypeData, setToolTypeData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ToolTypeSummaryPanel toolTypeData={toolTypeData} setToolTypeData={setToolTypeData} setActiveTab={setActiveTab}/>;
      case "settings":
        return <ToolTypeEditorPanel setToolTypeData={setToolTypeData} toolTypeData={toolTypeData} />;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    )
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ToolTypeDetailPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
};

export default ToolTypeDetailPanel;


