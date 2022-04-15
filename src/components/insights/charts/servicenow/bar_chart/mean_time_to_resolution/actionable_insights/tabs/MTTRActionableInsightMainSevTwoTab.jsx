import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import MTTRMasterTab from "./MTTRMasterTab";

function MTTRActionableInsightsMainSevTwoTab({ dashboardData, kpiConfiguration,icon}) {

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
        <VanitySetTabView>
          <MTTRMasterTab
            priority={2}
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            icon={icon}
          />
        </VanitySetTabView>
      </VanitySetTabViewContainer>
    );
  };


  return (
    <VanitySetTabAndViewContainer
      title={`MTTR Severity Two Incidents Report`}
      currentView={getTabContentContainer()}
    />
  );

}
MTTRActionableInsightsMainSevTwoTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object
};
export default MTTRActionableInsightsMainSevTwoTab;

