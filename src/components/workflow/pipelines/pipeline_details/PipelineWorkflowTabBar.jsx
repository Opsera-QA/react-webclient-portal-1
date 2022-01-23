import React from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";

function PipelineWorkflowTabBar(
  {
    currentTab,
    refreshTimer,
    pipelineId,
    getPipeline,
  }) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }

    if (currentTab !== tabSelection) {
      history.push(`/workflow/details/${pipelineId}/${tabSelection}`);
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
  pipelineId: PropTypes.string,
  getPipeline: PropTypes.func,
  refreshTimer: PropTypes.any,
};

export default PipelineWorkflowTabBar;
