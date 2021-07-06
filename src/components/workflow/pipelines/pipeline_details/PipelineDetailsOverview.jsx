import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import PipelineStepDetailsOverview from "components/workflow/pipelines/pipeline_details/PipelineStepDetailsOverview";
import PipelineStepJsonPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepJsonPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import OverlayTabPanelContainer from "components/common/panels/general/OverlayTabPanelContainer";

function PipelineDetailsOverview({ pipeline }) {
  const [pipelineSteps, setPipelineSteps] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    const steps = pipeline?.workflow?.plan;
    setPipelineSteps([]);

    if (Array.isArray(steps)) {
      setPipelineSteps(steps);
    }
  }, [JSON.stringify(pipeline)]);

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return getBody();
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

  const getBody = () => {
    if (Array.isArray(pipelineSteps) && pipelineSteps.length > 0) {
      return (
        pipelineSteps.map((pipelineStep, index) => {
          return (
            <div key={index} className={"my-3"}>
              <PipelineStepDetailsOverview index={index} pipelineStep={pipelineStep} />
            </div>
          );
        })
      );
    }

    return (
      <span>No Pipeline Steps</span>
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