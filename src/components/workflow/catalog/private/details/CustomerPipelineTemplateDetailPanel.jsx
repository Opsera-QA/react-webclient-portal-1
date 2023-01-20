import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CustomerPipelineTemplateEditorPanel
  from "components/workflow/catalog/private/details/CustomerPipelineTemplateEditorPanel";
import CustomerPipelineTemplateSummaryPanel
  from "components/workflow/catalog/private/details/CustomerPipelineTemplateSummaryPanel";
import CustomTab from "components/common/tabs/CustomTab";
import {faFileAlt} from "@fortawesome/pro-light-svg-icons";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import PipelineTemplatePlanOverviewContainer
  from "components/workflow/catalog/overview/PipelineTemplatePlanOverviewContainer";

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
        <CustomTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          icon={faFileAlt}
          tabText={"Pipeline Configuration Details"}
          tabName={"details"}
        />
        <JsonTab
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
      case "details":
        return (
          <PipelineTemplatePlanOverviewContainer
            pipelineTemplateModel={pipelineTemplateModel}
            className={"mt-1"}
          />
        );
      case "json":
        return (
          <div className={"pt-1"}>
            <StandaloneJsonField
              titleText={"Pipeline Template View"}
              json={pipelineTemplateModel?.getPersistData()}
              displayDataTypes={false}
              collapsed={false}
              minimumHeight={"calc(100vh - 325px)"}
              maximumHeight={"calc(100vh - 325px)"}
            />
          </div>
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



