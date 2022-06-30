import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GithubCommitsVerticalTabContainer
  from "components/insights/charts/github/pie_chart/commits_statistics/actionable_insights/GithubCommitsVerticalTabContainer";
import QuickDeployTotalExecutionsActionableTable from "./QuickDeployTotalExecutionsActionableTable";
import QuickDeployVerticalTabContainer from "../QuickDeployVerticalTabContainer";

function QuickDeployTotalExecutionsTab({ data, tasks, dashboardData, kpiConfiguration, icon }) {

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
        {tasks.map((item, index) => (
          <VanitySetTabView key={index} tabKey={item}>
            <QuickDeployTotalExecutionsActionableTable
              data={data}
              task={item}
              dashboardData={dashboardData}
              kpiConfiguration={kpiConfiguration}
              icon={icon}
            />
          </VanitySetTabView>
        ))}

      </VanitySetTabViewContainer>
    );
  };

  return (
    <VanitySetTabAndViewContainer
      title={`Quick Deploy Total Executions Report`}
      defaultActiveKey={Array.isArray(tasks) && tasks.length > 0 ? tasks[0] : undefined}
      verticalTabContainer={<QuickDeployVerticalTabContainer highestMergesMetric={tasks} />}
      currentView={getTabContentContainer()}
    />
  );
}

QuickDeployTotalExecutionsTab.propTypes = {
  data: PropTypes.array,
  tasks: PropTypes.array,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
};

export default QuickDeployTotalExecutionsTab;