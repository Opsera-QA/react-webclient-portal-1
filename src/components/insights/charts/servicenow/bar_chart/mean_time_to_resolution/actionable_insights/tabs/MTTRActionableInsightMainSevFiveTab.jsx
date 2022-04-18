import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import MTTRMasterTab from "./MTTRMasterTab";

function MTTRActionableInsightsMainSevFiveTab({ dashboardData, kpiConfiguration,icon}) {

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
          <MTTRMasterTab
            priority={5}
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            icon={icon}
          />
      </VanitySetTabViewContainer>
    );
  };


  return (
    <VanitySetTabContentContainer title={`MTTR Severity 5 Incidents Report`}>
      {getTabContentContainer()}
    </VanitySetTabContentContainer>
  );

}
MTTRActionableInsightsMainSevFiveTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object
};
export default MTTRActionableInsightsMainSevFiveTab;

