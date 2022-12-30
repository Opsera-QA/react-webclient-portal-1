import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";

export default function PipelineWorkflowTabBar(
  {
    currentTab,
    setCurrentTab,
    getPipeline,
  }) {
  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (currentTab !== tabSelection) {
      setCurrentTab(tabSelection);
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
};
