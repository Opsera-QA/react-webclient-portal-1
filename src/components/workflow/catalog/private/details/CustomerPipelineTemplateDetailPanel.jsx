import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CustomerPipelineTemplateEditorPanel
  from "components/workflow/catalog/private/details/CustomerPipelineTemplateEditorPanel";
import CustomerPipelineTemplateSummaryPanel
  from "components/workflow/catalog/private/details/CustomerPipelineTemplateSummaryPanel";

export default function CustomerPipelineTemplateDetailPanel(
  {
    pipelineTemplateModel,
    setPipelineTemplateModel,
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
        <SummaryToggleTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <CustomerPipelineTemplateSummaryPanel
            pipelineTemplateModel={pipelineTemplateModel}
            setPipelineTemplateModel={setPipelineTemplateModel}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <CustomerPipelineTemplateEditorPanel
            pipelineTemplateModel={pipelineTemplateModel}
            setPipelineTemplateModel={setPipelineTemplateModel}
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

  CustomerPipelineTemplateDetailPanel.propTypes = {
    pipelineTemplateModel: PropTypes.object,
    setPipelineTemplateModel: PropTypes.func,
};



