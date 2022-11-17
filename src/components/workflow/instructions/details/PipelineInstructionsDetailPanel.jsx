import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PipelineInstructionsPipelineUsageField
  from "components/common/list_of_values_input/settings/pipelines/instructions/usage/PipelineInstructionsPipelineUsageField";
import CustomTab from "components/common/tabs/CustomTab";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import PipelineInstructionsSummaryPanel
  from "components/workflow/instructions/details/PipelineInstructionsSummaryPanel";
import PipelineInstructionsEditorPanel from "components/workflow/instructions/details/PipelineInstructionsEditorPanel";

export default function PipelineInstructionsDetailPanel(
  {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
  }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (selectedTab) => e => {
    e.preventDefault();

    if (activeTab !== selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <CustomTab
          tabText={"Usage"}
          tabName={"usage"}
          icon={faDraftingCompass}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <SettingsTab
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
          <PipelineInstructionsSummaryPanel
            pipelineInstructionsModel={pipelineInstructionsModel}
            setPipelineInstructionsModel={setPipelineInstructionsModel}
            setActiveTab={setActiveTab}
          />
        );
      case "usage":
        return (
          <PipelineInstructionsPipelineUsageField
            pipelineInstructionsId={pipelineInstructionsModel?.getMongoDbId()}
          />
        );
      case "settings":
        return (
          <PipelineInstructionsEditorPanel
            pipelineInstructionsModel={pipelineInstructionsModel}
            setPipelineInstructionsModel={setPipelineInstructionsModel}
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

PipelineInstructionsDetailPanel.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
  setPipelineInstructionsModel: PropTypes.func,
};

