import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PipelineStepDetailsContainer from "components/workflow/pipelines/overview/PipelineStepDetailsContainer";
import PipelineStepJsonPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepJsonPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import GeneralTabPanelContainer from "components/common/panels/general/GeneralTabPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import sourceRepositoryConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/source-repository-configuration-metadata";
import PipelineSourceRepositorySummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySummaryPanel";
import CustomTab from "components/common/tabs/CustomTab";
import { faCloudDownload } from "@fortawesome/pro-light-svg-icons";
import PipelineSummaryPanelLite from "components/workflow/pipelines/summary/PipelineSummaryPanelLite";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";

function PipelineSummaryAndWebhookOverviewDetailPanel({ pipeline }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <PipelineSummaryPanelLite
            pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
          />
        );
      case "webhook":
        return (
          <PipelineSourceRepositorySummaryPanel
            sourceRepositoryModel={modelHelpers.parseObjectIntoModel(pipeline?.workflow?.source, sourceRepositoryConfigurationMetadata)}
          />
        );
      case "json":
        return <PipelineStepJsonPanel pipelineStepData={pipeline?.workflow?.source} />;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab
          tabText={"Webhook"}
          icon={faCloudDownload}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabName={"webhook"}
          disabled={pipeline?.workflow?.source?.trigger_active !== true}
        />
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  if (pipeline == null) {
    return null;
  }

  return (
    <PipelineStepDetailsContainer title={`Overview`}>
      <div className={"pt-2 pl-2"}>
        <GeneralTabPanelContainer
          currentView={getCurrentView()}
          tabContainer={getTabContainer()}
        />
      </div>
    </PipelineStepDetailsContainer>
  );
}

PipelineSummaryAndWebhookOverviewDetailPanel.propTypes = {
  pipeline: PropTypes.object,
};

export default PipelineSummaryAndWebhookOverviewDetailPanel;