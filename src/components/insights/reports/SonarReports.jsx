import React, {useEffect, useState, useContext, useRef} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";


function SonarReports() {


  const getInsightsView = () => {
    return null;
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"reports"} />}
      pageDescription={`Downloadable Report for Sonar Scan`}
      breadcrumbDestination={"insights"}
    >
      {getInsightsView()}
    </ScreenContainer>
  );

}


export default SonarReports;