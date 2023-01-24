import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Analytics from "components/analytics/Analytics";
import Insights from "components/insights/dashboards/Insights";
import DashboardDetailView from "components/insights/dashboards/dashboard_details/DashboardDetailView";
import Marketplace from "components/insights/marketplace/Marketplace";
import Lookup from "components/insights/lookup/Lookup";
import Release360 from "components/insights/release_360/Release360";
import InsightsSynopsis from "components/insights/summary/InsightsSynopsis";
import ConnectedAssets from "components/insights/connectedAssets/ConnectedAssets";
import GitCustodian from "components/insights/gitCustodian/GitCustodian";
import SonarPipelineScanReport from "components/insights/reports/sonar/SonarPipelineScanReport";
import CoverityScanReport from "components/insights/reports/coverity/CoverityScanReport";
import GitScraperScanReport from "../components/insights/reports/git_scraper/GitScraperScanReport";

export default function InsightsRoutes() {
  return (
    <>
      <SecureRoute path="/insights/analytics" exact component={Analytics} />
      <SecureRoute path="/insights" exact component={Insights} />
      <SecureRoute path="/insights/dashboards/:id/:tab?" exact component={DashboardDetailView} />
      <SecureRoute path="/insights/marketplace/:dashboardId?" component={Marketplace} />
      <SecureRoute path="/insights/lookup" exact component={Lookup} />
      <SecureRoute path="/insights/release360" exact component={Release360} />
      <SecureRoute path="/insights/synopsis" component={InsightsSynopsis} />
      <SecureRoute path="/insights/connected-assets" component={ConnectedAssets} />
      <SecureRoute path="/insights/git-custodian" component={GitCustodian} />
      <SecureRoute path={"/git-custodian"} component={GitCustodian} />

      {/* Reports */}
      <SecureRoute path="/insights/reports/scans/sonar/:pipelineId/:stepId/:runCount/:issueType"
                   component={SonarPipelineScanReport} />
      <SecureRoute path="/insights/reports/scans/coverity/:pipelineId/:projectName/:runCount/:coveritySeverity"
                   component={CoverityScanReport} />
        <SecureRoute path="/insights/reports/scans/gitscraper/:repository/:branch"
                     component={GitScraperScanReport} />
    </>
  );
}

InsightsRoutes.propTypes = {};

