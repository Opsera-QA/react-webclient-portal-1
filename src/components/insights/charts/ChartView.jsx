import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import KpiSettingsForm from "../marketplace/kpi_marketplace_detail_view/KpiSettingsForm";

// Opsera KPIs
import OpseraPipelineByStatusBarChart from "./opsera/bar_chart/pipeline_by_status/OpseraPipelineByStatusBarChart";
import OpseraBuildDurationBarChart from "./opsera/bar_chart/build_duration/OpseraBuildDurationBarChart";
import OpseraBuildsByUserBarChart from "./opsera/bar_chart/builds_by_user/OpseraBuildsByUserBarChart";
import OpseraDeploymentFrequencyLineChart from "./opsera/line_chart/deployment_frequency/OpseraDeploymentFrequencyLineChart";
import OpseraRecentPipelineStatus from "./opsera/OpseraRecentPipelineStatus";

// Jenkins KPIs
import JenkinsBuildsByUserBarChart from "./jenkins/bar_chart/builds_by_user/JenkinsBuildsByUserBarChart";
import JenkinsBuildDurationBarChart from "./jenkins/bar_chart/build_duration/JenkinsBuildDurationBarChart";
import JenkinsStatusByJobNameBarChart from "./jenkins/bar_chart/status_by_job_name/JenkinsStatusByJobNameBarChart"
import JenkinsDeploymentFrequencyLineChart from "./jenkins/line_chart/deployment_frequency/JenkinsDeploymentFrequencyLineChart";

// Jira KPIs
import JiraIssuesByPriorityBarChart from "./jira/bar_chart/issues_by_priority/JiraIssuesByPriorityBarChart";
import JiraTicketsAssignedByUserBarChart from "./jira/bar_chart/tickets_assigned_by_user/JiraTicketsAssignedByUserBarChart";
import JiraHealthBySprintBarChart from "./jira/bar_chart/health_by_sprint/JiraHealthBySprintBarChart";
import JiraVelocityReportBarChart from "./jira/bar_chart/velocity_report/JiraVelocityReportBarChart"

// Anchore KPIs
import AnchoreVulnerabilitySeverityByPackageBarChart from "./anchore/bar_chart/vulnerability_severity_by_package/AnchoreVulnerabilitySeverityByPackageBarChart";

// Sonar KPIs
import SonarCodeSmellsLineChart from "./sonar/line_chart/code_smells/SonarCodeSmellsLineChart";
import SonarMaintainabilityRatingLineChart from "./sonar/line_chart/maintainability_rating/SonarMaintainabilityRatingLineChart";

function ChartView({kpiConfiguration, dashboardData, index}) {
    const [view, setView] = useState("chart");

    const getView = () => {
      // TODO: make container
      if (view === "chart") {
        return (
          <div>
            <FontAwesomeIcon icon={faCogs} className="float-right pointer mr-2 mt-1" onClick={() => {changeView()}}/>
            <h5>{kpiConfiguration.kpi_name}</h5>
            {getChart(kpiConfiguration)}
          </div>
        );
      }


      if (view === "settings") {
        return (
          <div>
            {getSettings(kpiConfiguration)}
          </div>
        );
      }
    }

  const changeView = () => {
    setView(view === "chart" ? "settings" : "chart");
  }

  const getSettings = (kpiConfiguration) => {
    return <KpiSettingsForm kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} index={index} setView={setView}/>
  }

  const getDateObject = (kpiConfiguration) => {
    if (kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")] &&
      kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value) {
      return ({
        "start": kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.startDate,
        "end": kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.endDate
      })
    }
    return ({
      "start": "now-90d",
      "end": "now"
    });
  };

  const getChart = (kpiConfiguration) => {
    switch (kpiConfiguration.kpi_identifier) {

      // Opsera KPIs
      case "opsera-status-by-pipeline":
        return (<OpseraPipelineByStatusBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "opsera-pipeline-duration":
        return (<OpseraBuildDurationBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "opsera-pipelines-by-user":
        return (<OpseraBuildsByUserBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "opsera-deployment-frequency":
        return (<OpseraDeploymentFrequencyLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "opsera-recent-pipeline-status":
        return (<OpseraRecentPipelineStatus persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

      // Jenkins KPIs
      case "jenkins-builds-by-user":
        return (<JenkinsBuildsByUserBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jenkins-build-duration":
        return (<JenkinsBuildDurationBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jenkins-status-by-job-name":
        return (<JenkinsStatusByJobNameBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jenkins-deployment-frequency":
        return (<JenkinsDeploymentFrequencyLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

      // Jira KPIs
      case "jira-tickets-assigned-by-user":
        return (<JiraTicketsAssignedByUserBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jira-issues-by-priority":
        return (<JiraIssuesByPriorityBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jira-health-by-sprint":
        return (<JiraHealthBySprintBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jira-velocity-report":
        return (<JiraVelocityReportBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      
      // Anchore KPIs
      case "anchore-vulnerability-severity-by-package":
        return (<AnchoreVulnerabilitySeverityByPackageBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

      // Sonar KPIs
      case "sonar-code-smells":
        return (<SonarCodeSmellsLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "sonar-maintainability-rating":
        return (<SonarMaintainabilityRatingLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

    }
  }

  return (
    <div className="p-2" style={{border: "1px solid rgba(0, 0, 0, 0.125)", minHeight: "365px"}}>
      {getView()}
    </div>
  )
}

ChartView.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number
}

export default ChartView;

