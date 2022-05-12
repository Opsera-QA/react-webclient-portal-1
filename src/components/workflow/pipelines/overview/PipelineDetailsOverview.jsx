import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import PipelineStepJsonPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepJsonPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import OverlayTabPanelContainer from "components/common/panels/general/OverlayTabPanelContainer";
import PipelineOverviewContainer from "components/workflow/pipelines/overview/PipelineOverviewContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";

function PipelineDetailsOverview({ pipeline }) {
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
          <PipelineOverviewContainer
            pipeline={pipeline}
          />
        );
      case "json":
        return (
          <PipelineStepJsonPanel
            pipelineStepData={pipeline}
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
          tabText={"Configuration (YAML)"}
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
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {getYamlTab()}
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