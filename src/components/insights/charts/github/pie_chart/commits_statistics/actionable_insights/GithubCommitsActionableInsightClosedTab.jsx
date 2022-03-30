import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GithubCommitsVerticalTabContainer from "./GithubCommitsVerticalTabContainer";
import GithubClosedCommitsTab from "./tableData/GithubClosedCommitsTab";

function GithubCommitsActionableInsightClosedTab({highestMergesMetric, dashboardData, kpiConfiguration}) {

   const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        {highestMergesMetric.map((item,index)=>(
          <VanitySetTabView key={index} tabKey={item.id}>
            <GithubClosedCommitsTab
              repository={item.id}
              dashboardData={dashboardData}
              kpiConfiguration={kpiConfiguration}
            />
          </VanitySetTabView>
        ))}
        
      </VanitySetTabViewContainer>
    );
  };


  return (
    <VanitySetTabAndViewContainer
      title={`Github Closed Pull Requests`}
      defaultActiveKey={highestMergesMetric && Array.isArray(highestMergesMetric) && highestMergesMetric[0].id && highestMergesMetric[0].id}
      verticalTabContainer={<GithubCommitsVerticalTabContainer highestMergesMetric={highestMergesMetric} />}
      currentView={getTabContentContainer()}
    />
  );

}
GithubCommitsActionableInsightClosedTab.propTypes = {
  highestMergesMetric: PropTypes.array,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
};
export default GithubCommitsActionableInsightClosedTab;

