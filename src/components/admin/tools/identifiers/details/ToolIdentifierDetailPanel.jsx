import React, { useState } from "react";
import PropTypes from "prop-types";
import ToolIdentifierSummaryPanel
  from "components/admin/tools/identifiers/details/ToolIdentifierSummaryPanel";
import ToolIdentifierEditorPanel
  from "components/admin/tools/identifiers/details/ToolIdentifierEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function ToolIdentifierDetailPanel({ toolIdentifierData, setToolIdentifierData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ToolIdentifierSummaryPanel toolIdentifierData={toolIdentifierData} setActiveTab={setActiveTab} />;
      case "settings":
        return <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} handleClose={toggleSummaryPanel} />;
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
    );
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ToolIdentifierDetailPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func,
};

export default ToolIdentifierDetailPanel;


