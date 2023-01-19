import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelineWorkflowTabBar(
  {
    currentTab,
    setCurrentTab,
    getPipeline,
    pipelineId,
  }) {
  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (currentTab !== tabSelection) {
      setCurrentTab(tabSelection);
      window.history.replaceState(undefined, undefined, pipelineHelper.getDetailViewLink(pipelineId, tabSelection));
      getPipeline();
    }
  };

  return (
    <CustomTabContainer styling={"alternate-tabs"}>
      <CustomTab
        tabText={"Summary"}
        activeTab={currentTab}
        tabName={"summary"}
        handleTabClick={handleTabClick}
      />
      <CustomTab
        tabText={"Workflow"}
        activeTab={currentTab}
        tabName={"model"}
        handleTabClick={handleTabClick}
      />
    </CustomTabContainer>
  );
}

PipelineWorkflowTabBar.propTypes = {
  currentTab: PropTypes.string,
  getPipeline: PropTypes.func,
  setCurrentTab: PropTypes.func,
  pipelineId: PropTypes.string,
};
