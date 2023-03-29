import React, {useState} from "react";
import PropTypes from "prop-types";
import PipelineSourceRepositoryRepositoryInputPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryRepositoryInputPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PipelineSourceRepositoryWebhookInputPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryWebhookInputPanel";
import {pipelineTypeConstants} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import PipelineSourceRepositoryDynamicSettingsBooleanToggleInput
  from "components/workflow/plan/source/PipelineSourceRepositoryDynamicSettingsBooleanToggleInput";
import PipelineSourceRepositoryGitExportEnabledInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryGitExportEnabledInput";
import VanityTabPanelContainer from "components/common/panels/general/VanityTabPanelContainer";

export default function PipelineSourceRepositoryConfigurationTabPanel(
  {
    sourceRepositoryModel,
    setSourceRepositoryModel,
    pipeline,
    callbackFunction,
  }) {
  const [activeTab, setActiveTab] = useState("repository");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          tabText={"Repository"}
          handleTabClick={handleTabClick}
          // icon={faWrench}
          activeTab={activeTab}
          tabName={"repository"}
        />
        <CustomTab
          tabText={"Webhook"}
          handleTabClick={handleTabClick}
          // icon={faDraftingCompass}
          activeTab={activeTab}
          tabName={"webhook"}
        />
        <CustomTab
          tabText={"Pipeline Git Revisions"}
          handleTabClick={handleTabClick}
          // icon={faChartNetwork}
          activeTab={activeTab}
          tabName={"gitExportOptions"}
        />
        <CustomTab
          tabText={"Dynamic Settings"}
          handleTabClick={handleTabClick}
          // icon={faChartNetwork}
          activeTab={activeTab}
          tabName={"dynamicSettings"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "repository":
        return (
          <PipelineSourceRepositoryRepositoryInputPanel
            sourceRepositoryModel={sourceRepositoryModel}
            setSourceRepositoryModel={setSourceRepositoryModel}
            className={"mt-3"}
          />
        );
      case "webhook":
        return (
          <PipelineSourceRepositoryWebhookInputPanel
            model={sourceRepositoryModel}
            setModel={setSourceRepositoryModel}
            pipeline={pipeline}
            savePipelineFunction={callbackFunction}
            className={"mt-3"}
          />
        );
      case "dynamicSettings":
        return (
          <PipelineSourceRepositoryDynamicSettingsBooleanToggleInput
            model={sourceRepositoryModel}
            setModel={setSourceRepositoryModel}
            pipelineType={pipelineTypeConstants.getTypeForTypesArray(pipeline?.type, false)}
            className={"mt-3"}
          />
        );
      case "gitExportOptions":
        return (
          <PipelineSourceRepositoryGitExportEnabledInput
            fieldName={"gitExportEnabled"}
            model={sourceRepositoryModel}
            setModel={setSourceRepositoryModel}
            disabled={["gitlab", "github"].includes(sourceRepositoryModel.getData("service")) !== true}
            className={"mt-3"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <VanityTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
      tabContainerClassName={"mx-2"}
      detailViewClassName={"mx-2 detail-panel-body"}
    />
  );
}

PipelineSourceRepositoryConfigurationTabPanel.propTypes = {
  sourceRepositoryModel: PropTypes.object,
  setSourceRepositoryModel: PropTypes.func,
  pipeline: PropTypes.object,
  callbackFunction: PropTypes.func,
};
