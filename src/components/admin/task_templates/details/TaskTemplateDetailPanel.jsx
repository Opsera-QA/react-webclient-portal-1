import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import TaskTemplateSummaryPanel from "components/admin/task_templates/details/TaskTemplateSummaryPanel";
import TaskTemplateEditorPanel from "components/admin/task_templates/details/TaskTemplateEditorPanel";

export default function TaskTemplateDetailPanel({ templateModel, setTemplateModel }) {
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
          <TaskTemplateSummaryPanel
            templateModel={templateModel}
            setTemplateModel={setTemplateModel}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <TaskTemplateEditorPanel
            templateModel={templateModel}
            setTemplateModel={setTemplateModel}
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

TaskTemplateDetailPanel.propTypes = {
  templateModel: PropTypes.object,
  setTemplateModel: PropTypes.func,
};


