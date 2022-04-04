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

function PipelineSourceRepositoryOverview({ pipeline }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
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
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  if (pipeline == null) {
    return null;
  }

  return (
    <PipelineStepDetailsContainer title={`Pipeline Settings`}>
      <div className={"pt-2 pl-2"}>
        <GeneralTabPanelContainer
          currentView={getCurrentView()}
          tabContainer={getTabContainer()}
        />
      </div>
    </PipelineStepDetailsContainer>
  );
}

PipelineSourceRepositoryOverview.propTypes = {
  pipeline: PropTypes.object,
};

export default PipelineSourceRepositoryOverview;