import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faDraftingCompass, faWrench} from "@fortawesome/pro-light-svg-icons";
import FreeTrialUserActivityReportWorkflowsTable
  from "components/settings/trial/activity_report/user_activity/workflows/FreeTrialUserActivityReportWorkflowsTable";
import FreeTrialUserActivityReportToolsTable
  from "components/settings/trial/activity_report/user_activity/tools/FreeTrialUserActivityReportToolsTable";

export default function FreeTrialUserActivityViewerDetailPanel(
  {
    activityReportWorkflows,
    activityReportFilterModel,
    setActivityReportFilterModel,
    userData,
    loadData,
    isLoading,
    tools,
  }) {
  const [activeTab, setActiveTab] = useState("workflows");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          tabText={`${activityReportWorkflows.length} Workflows`}
          handleTabClick={handleTabClick}
          icon={faDraftingCompass}
          activeTab={activeTab}
          tabName={"workflows"}
        />
        <CustomTab
          tabText={`${tools.length} Tools`}
          handleTabClick={handleTabClick}
          icon={faWrench}
          activeTab={activeTab}
          tabName={"tools"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "workflows":
        return (
          <FreeTrialUserActivityReportWorkflowsTable
            activityReportFilterModel={activityReportFilterModel}
            setActivityReportFilterModel={setActivityReportFilterModel}
            activityReportWorkflows={activityReportWorkflows}
            loadData={loadData}
            isLoading={isLoading}
            userData={userData}
          />
        );
      case "tools":
        return (
          <FreeTrialUserActivityReportToolsTable
            isLoading={isLoading}
            loadData={loadData}
            tools={tools}
            userData={userData}
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

FreeTrialUserActivityViewerDetailPanel.propTypes = {
  activityReportWorkflows: PropTypes.array,
  activityReportFilterModel: PropTypes.object,
  setActivityReportFilterModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  userData: PropTypes.object,
  tools: PropTypes.array,
};


