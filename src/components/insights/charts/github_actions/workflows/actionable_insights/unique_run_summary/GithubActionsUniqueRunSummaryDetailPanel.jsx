import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import GithubActionsUniqueRunJobsSummary
  from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/jobs/GithubActionsUniqueRunJobsSummary";
import GithubActionsUniqueRunRunsSummary
  from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/runs/GithubActionsUniqueRunRunsSummary";
import TabPanelContainer from "components/common/panels/detail_view/TabPanelContainer";

export default function GithubActionsUniqueRunSummaryDetailPanel(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    workflowName,
    repoName,
    appName,
    workflow,
    branchName,
    jobName,
    setSelectedJobName,
    setCurrentScreen,
  }) {
  const [activeTab, setActiveTab] = useState("jobs");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          tabText={"Jobs"}
          handleTabClick={handleTabClick}
          icon={faDraftingCompass}
          activeTab={activeTab}
          tabName={"jobs"}
        />
        <CustomTab
          tabText={"Runs"}
          handleTabClick={handleTabClick}
          icon={faDraftingCompass}
          activeTab={activeTab}
          tabName={"runs"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "runs":
        return (
          <GithubActionsUniqueRunRunsSummary
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            workflow={workflow}
            branchName={branchName}
            jobName={jobName}
            setSelectedJobName={setSelectedJobName}
            setCurrentScreen={setCurrentScreen}
          />
        );
      case "jobs":
        return (
          <GithubActionsUniqueRunJobsSummary
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            workflow={workflow}
            branchName={branchName}
            jobName={jobName}
            setSelectedJobName={setSelectedJobName}
            setCurrentScreen={setCurrentScreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GithubActionsUniqueRunJobsSummary
      kpiConfiguration={kpiConfiguration}
      dashboardData={dashboardData}
      dashboardFilters={dashboardFilters}
      workflowName={workflowName}
      repoName={repoName}
      appName={appName}
      workflow={workflow}
      branchName={branchName}
      jobName={jobName}
      setSelectedJobName={setSelectedJobName}
      setCurrentScreen={setCurrentScreen}
    />
  );

  // return (
  //   <TabPanelContainer
  //     detailView={getCurrentView()}
  //     tabContainer={getTabContainer()}
  //     className={"mx-3"}
  //   />
  // );
}

GithubActionsUniqueRunSummaryDetailPanel.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
  workflowRuns: PropTypes.string,
  setSelectedJobName: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
};


