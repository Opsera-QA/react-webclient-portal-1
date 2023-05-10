import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GithubCommitsVerticalTabContainer from "./GithubCommitsVerticalTabContainer";
import GithubOpenCommitsTab from "./tableData/GithubOpenCommitsTab";

function GithubCommitsActionableInsightOpenTab({
  highestMergesMetric,
  dashboardData,
  kpiConfiguration,
  icon,
}) {
  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        {highestMergesMetric.map((item, index) => (
          <VanitySetTabView
            key={index}
            tabKey={item.id}
          >
            <GithubOpenCommitsTab
              repository={item.id}
              dashboardData={dashboardData}
              kpiConfiguration={kpiConfiguration}
              icon={icon}
            />
          </VanitySetTabView>
        ))}
      </VanitySetTabViewContainer>
    );
  };

  console.log("open", highestMergesMetric);

  return (
    <VanitySetTabAndViewContainer
      title={`Github Open Pull Requests`}
       defaultActiveKey={
         highestMergesMetric &&
        Array.isArray(highestMergesMetric) &&
        highestMergesMetric[0]?.id &&
         highestMergesMetric[0]?.id
       }
      verticalTabContainer={
        <GithubCommitsVerticalTabContainer
          highestMergesMetric={highestMergesMetric}
        />
      }
      currentView={getTabContentContainer()}
    />
  );
}
GithubCommitsActionableInsightOpenTab.propTypes = {
  highestMergesMetric: PropTypes.array,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
};
export default GithubCommitsActionableInsightOpenTab;
