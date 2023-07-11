import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import PipelineTemplateSummaryPanel from "components/admin/pipeline_templates/details/PipelineTemplateSummaryPanel";
import PipelineTemplateEditorPanel from "components/admin/pipeline_templates/details/PipelineTemplateEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PipelineTemplatePlanOverviewContainer
from "components/workflow/catalog/overview/PipelineTemplatePlanOverviewContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faFileAlt} from "@fortawesome/pro-light-svg-icons";

function PipelineTemplateDetailPanel({ templateData, setTemplateData }) {
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
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          icon={faFileAlt}
          tabText={"Pipeline Configuration Details"}
          tabName={"details"}
        />
        <SettingsTab activeTab={activeTab} handleTabClick={handleTabClick} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
    case "summary":
      return <PipelineTemplateSummaryPanel templateData={templateData} setActiveTab={setActiveTab} setTemplateData={setTemplateData} />;
    case "details":
      return (
        <PipelineTemplatePlanOverviewContainer
          pipelineTemplateModel={templateData}
          className={"mt-1"}
        />
      );
    case "settings":
      return (
        <PipelineTemplateEditorPanel
          setTemplateModel={setTemplateData}
          templateModel={templateData}
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

PipelineTemplateDetailPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
};

export default PipelineTemplateDetailPanel;


