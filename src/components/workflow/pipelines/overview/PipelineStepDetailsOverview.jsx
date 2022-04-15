import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import PipelineStepConfigurationSummary
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepConfigurationSummary";
import PipelineStepDetailsContainer from "components/workflow/pipelines/overview/PipelineStepDetailsContainer";
import PipelineStepJsonPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepJsonPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import GeneralTabPanelContainer from "components/common/panels/general/GeneralTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import PipelineStepNotificationConfigurationSummaryPanel
  from "components/workflow/plan/step/notifications/PipelineStepNotificationConfigurationSummaryPanel";
import {faEnvelope, faFileCode} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";

function PipelineStepDetailsOverview({ pipelineStep, index }) {
  const [activeTab, setActiveTab] = useState("summary");
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <PipelineStepConfigurationSummary
            pipelineData={pipelineStep}
          />
        );
      case "notifications":
        return (
          <PipelineStepNotificationConfigurationSummaryPanel
            pipelineStepData={pipelineStep}
          />
        );
      case "json":
        return (
          <PipelineStepJsonPanel
            pipelineStepData={pipelineStep}
          />
        );
      case "yaml":
      default:
        return null;
    }
  };

  const getYamlTab = () => {
    if (featureFlagHideItemInProd() === false) {
      return (
        <CustomTab
          tabText={"YAML View"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabName={"yaml"}
          disabled={true}
          icon={faFileCode}
        />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab
          tabText={"Notifications"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabName={"notifications"}
          icon={faEnvelope}
        />
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {getYamlTab()}
      </CustomTabContainer>
    );
  };

  if (pipelineStep == null) {
    return null;
  }

  return (
    <PipelineStepDetailsContainer title={`Step ${index + 1}: ${pipelineStep?.name}`}>
      <div className={"pt-2 px-2"}>
        <GeneralTabPanelContainer
          currentView={getCurrentView()}
          tabContainer={getTabContainer()}
        />
      </div>
    </PipelineStepDetailsContainer>
  );
}

PipelineStepDetailsOverview.propTypes = {
  pipelineStep: PropTypes.object,
  index: PropTypes.number
};

export default PipelineStepDetailsOverview;