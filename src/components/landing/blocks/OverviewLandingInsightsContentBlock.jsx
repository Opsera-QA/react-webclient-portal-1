import React from "react";
import {useHistory} from "react-router-dom";
import TopFiveDashboards from "components/insights/dashboards/top_five/TopFiveDashboards";

function OverviewLandingInsightsContentBlock() {
  const history = useHistory();

  const loadDashboardById = (id) => {
    if (id) {
      history.push(`/insights/dashboards/${id}/viewer`);
    }
  };

  const loadAnalytics = () => {
    history.push("/insights");
  };


  return (
    <div className={"landing-content-module"}>
      <div>
        <img
          alt="Insights"
          src="/img/analytics.png"
          width="195"
          height="225"
          className="d-inline-block align-top pointer"
          onClick={() => {
            loadAnalytics();
          }}
        />
      </div>
      <div className="mt-4">
        <div className="h5 text-color">
          <div>Insights</div>
        </div>
        <div className="text-muted pr-2">
          Comprehensive software delivery analytics across your CI/CD process in a unified view — including Lead
          Time, Change Failure Rate, Deployment Frequency, and Time to Restore.
        </div>
        <div className="mt-2">
          <TopFiveDashboards loadDashboardById={loadDashboardById} />
        </div>
      </div>
    </div>
  );
}

export default OverviewLandingInsightsContentBlock;
