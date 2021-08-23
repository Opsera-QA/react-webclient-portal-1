import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PipelineStepJsonPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepJsonPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import OverlayTabPanelContainer from "components/common/panels/general/OverlayTabPanelContainer";
import PipelineOverviewContainer from "components/workflow/pipelines/overview/PipelineOverviewContainer";

function PipelineDetailsOverview({ pipeline }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <PipelineOverviewContainer pipeline={pipeline} />;
      case "json":
        return <PipelineStepJsonPanel pipelineStepData={pipeline} />;
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
    <div>
      <OverlayTabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
    </div>
  );
}

PipelineDetailsOverview.propTypes = {
  pipeline: PropTypes.object
};

export default PipelineDetailsOverview;