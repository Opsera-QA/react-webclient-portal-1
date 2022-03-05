import React, { useState } from "react";
import PropTypes from "prop-types";
import ToolCategoryEditorPanel from "components/admin/tools/category/details/ToolCategoryEditorPanel";
import ToolCategorySummaryPanel from "components/admin/tools/category/details/ToolCategorySummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function ToolCategoryDetailPanel({ toolCategoryData, setToolCategoryData }) {
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
        return <ToolCategorySummaryPanel toolCategoryData={toolCategoryData} setToolTypeData={setToolCategoryData} setActiveTab={setActiveTab}/>;
      case "settings":
        return <ToolCategoryEditorPanel setToolCategoryData={setToolCategoryData} toolCategoryData={toolCategoryData} handleClose={toggleSummaryPanel} />;
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
    );
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ToolCategoryDetailPanel.propTypes = {
  toolCategoryData: PropTypes.object,
  setToolCategoryData: PropTypes.func,
};

export default ToolCategoryDetailPanel;


