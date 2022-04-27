import React, {useEffect, useState, useContext, useRef} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import InsightsHelpDocumentation from "../../common/help/documentation/insights/InsightsHelpDocumentation";
import SonarScanReportTable from "./SonarScanReportTable";


function SonarReports() {


  const getInsightsView = () => {
    return null;
  };

  const placeholderData = [
    {
        "severity": "MAJOR",
        "component": "Log-Accumulator:src/main/webapp/index.jsp",
        "project": "Log-Accumulator",
        "line": 1,
        "status": "OPEN",
        "message": "Insert a <!DOCTYPE> declaration to before this <html> tag.",
        "effort": "5min",
        "debt": "5min",
        "author": "faseeh@opsera.io",
        "tags": [
            "user-experience"
        ],
        "type": "BUG",
        "creationDate": "2021-08-03T11:20:15+0000",
        "updateDate": "2021-08-12T22:40:25+0000"
    },
    {
        "severity": "MAJOR",
        "component": "Log-Accumulator:src/main/webapp/index.jsp",
        "project": "Log-Accumulator",
        "line": 1,
        "status": "OPEN",
        "message": "Add \"lang\" and/or \"xml:lang\" attributes to this \"<html>\" element",
        "effort": null,
        "debt": null,
        "author": "faseeh@opsera.io",
        "tags": [
            "accessibility",
            "wcag2-a"
        ],
        "type": "BUG",
        "creationDate": "2021-08-03T11:20:15+0000",
        "updateDate": "2021-08-12T22:40:25+0000"
    }
];

  // const getHelpDocumentation = () => {
  //   if (isLoading !== true) {
  //     return (
  //       <InsightsHelpDocumentation dashboardRoleDefinitions={dashboardRoleDefinitions}/>
  //     );
  //   }
  // };

  // if (!accessRoleData) {
  //   return (<LoadingDialog size="sm" message="Loading Insights"/>);
  // }

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"reports"} />}
      pageDescription={`Downloadable Report for Sonar Scan`}
      breadcrumbDestination={"sonarReports"}
    >
      {getInsightsView()}
      <SonarScanReportTable
      data={placeholderData}
      // isLoading={isLoading}
      // loadData={loadData}
      />
    </ScreenContainer>
  );

}


export default SonarReports;