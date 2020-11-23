import React, { useState } from "react";
import PropTypes from "prop-types";

import ToolIdentifierEditorPanel from "./ToolIdentifierEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import ToolIdentifierSummaryPanel from "./ToolIdentifierSummaryPanel";
import DetailTabPanelContainer from "../../../../common/panels/detail_view/DetailTabPanelContainer";
import SummaryTab from "../../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../../common/tabs/detail_view/SettingsTab";

function ToolIdentifierDetailPanel({ toolIdentifierData, setToolIdentifierData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ToolIdentifierSummaryPanel toolIdentifierData={toolIdentifierData} setActiveTab={setActiveTab} />;
      case "settings":
        return <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} />;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <SettingsTab activeTab={activeTab} handleTabClick={handleTabClick} />
      </CustomTabContainer>
    )
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ToolIdentifierDetailPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func,
};

export default ToolIdentifierDetailPanel;


