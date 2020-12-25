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
import JenkinsChangeFailureRate from "./jenkins/JenkinsChangeFailureRate";
import JenkinsDeploymentsCountsBarChart from "./jenkins/bar_chart/deployments_counts/JenkinsDeploymentsCountsBarChart";

// Jira KPIs
import JiraIssuesByPriorityBarChart from "./jira/bar_chart/issues_by_priority/JiraIssuesByPriorityBarChart";
import JiraTicketsAssignedByUserBarChart from "./jira/bar_chart/tickets_assigned_by_user/JiraTicketsAssignedByUserBarChart";
import JiraHealthBySprintBarChart from "./jira/bar_chart/health_by_sprint/JiraHealthBySprintBarChart";
import JiraVelocityReportBarChart from "./jira/bar_chart/velocity_report/JiraVelocityReportBarChart";
import JiraIssuesCreatedVsResolvedLineChart from "./jira/line_chart/issues_created_vs_resolved/JiraIssuesCreatedVsResolvedLineChart";

// Anchore KPIs
import AnchoreVulnerabilitySeverityByPackageBarChart from "./anchore/bar_chart/vulnerability_severity_by_package/AnchoreVulnerabilitySeverityByPackageBarChart";

// Sonar KPIs
import SonarCodeSmellsLineChart from "./sonar/line_chart/code_smells/SonarCodeSmellsLineChart";
import SonarMaintainabilityRatingLineChart from "./sonar/line_chart/maintainability_rating/SonarMaintainabilityRatingLineChart";
import SonarBugsCountLineChart from "./sonar/line_chart/bugs/SonarBugsCountLineChart";
import SonarNewBugsCountLineChart from "./sonar/line_chart/new_bugs/SonarNewBugsCountLineChart";
import SonarReliabilityRatingLineChart from "./sonar/line_chart/reliability_rating/SonarReliabilityRatingLineChart";
import SonarReliabilityRemediationEffortLineChart from "./sonar/line_chart/reliability_remediation_effort/SonarReliabilityRemediationEffortLineChart";

// Jmeter KPIs
import JmeterHitsLineChart from "./jmeter/line_chart/hits/JmeterHitsLineChart";
import JmeterErrorsLineChart from "./jmeter/line_chart/errors/JmeterErrorsLineChart";
import JmeterThroughputLineChart from "./jmeter/line_chart/throughput/JmeterThroughputLineChart";
import JmeterResponseTimeLineChart from "./jmeter/line_chart/response_time/JmeterResponseTimeLineChart";

// Gitlab KPIs
import GitlabMostActiveContributors from "./gitlab/GitlabMostActiveContributors";
import GitlabMergeRequestByMaximumTimeChart from "./gitlab/bar_chart/merge_request_by_maximum_time/GitlabMergeRequestByMaximumTimeChart";
import GitlabMergeRequestsByUserChart from "./gitlab/bar_chart/merge_requests_by_user/GitlabMergeRequestsByUserChart";
import GitlabTimeTakenToCompleteMergeRequestReview from "./gitlab/bar_chart/time_taken_to_complete_merge_request_review/GitlabTimeTakenToCompleteMergeRequestReview";
import GitlabCommitsByAuthor from "./gitlab/calendar_chart/commits_by_author/GitlabCommitsByAuthor";
import GitlabMergeRequestsPushesAndComments from "./gitlab/calendar_chart/merge_requests_pushes_and_comments/GitlabMergeRequestsPushesAndComments";
import GitlabTotalCommitsByProjectChart from "./gitlab/pie_chart/total_commits_by_project/GitlabTotalCommitsByProjectChart";

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
      case "jenkins-change-failure-rate":
        return (<JenkinsChangeFailureRate persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jenkins-deployments-counts":
        return (<JenkinsDeploymentsCountsBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

      // Jira KPIs
      case "jira-tickets-assigned-by-user":
        return (<JiraTicketsAssignedByUserBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jira-issues-by-priority":
        return (<JiraIssuesByPriorityBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jira-health-by-sprint":
        return (<JiraHealthBySprintBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jira-velocity-report":
        return (<JiraVelocityReportBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jira-issues-created-vs-resolved":
        return (<JiraIssuesCreatedVsResolvedLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      
      // Anchore KPIs
      case "anchore-vulnerability-severity-by-package":
        return (<AnchoreVulnerabilitySeverityByPackageBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

      // Sonar KPIs
      case "sonar-code-smells":
        return (<SonarCodeSmellsLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "sonar-maintainability-rating":
        return (<SonarMaintainabilityRatingLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "sonar-bugs":
        return (<SonarBugsCountLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "sonar-new-bugs":
        return (<SonarNewBugsCountLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "sonar-reliability-rating":
        return (<SonarReliabilityRatingLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "sonar-reliability-remediation-effort":
        return (<SonarReliabilityRemediationEffortLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      
      // Jmeter KPIs
      case "jmeter-hits":
        return (<JmeterHitsLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jmeter-errors":
        return (<JmeterErrorsLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jmeter-throughput":
        return (<JmeterThroughputLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "jmeter-response-time":
        return (<JmeterResponseTimeLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

      // Gitlab KPIs
      case "gitlab-most-active-contributors":
        return (<GitlabMostActiveContributors persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "gitlab-merge-request-by-maximum-time":
        return (<GitlabMergeRequestByMaximumTimeChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "gitlab-merge-requests-by-user":
        return (<GitlabMergeRequestsByUserChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "gitlab-time-taken-to-complete-merge-request-review":
        return (<GitlabTimeTakenToCompleteMergeRequestReview persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "gitlab-commits-by-author":
        return (<GitlabCommitsByAuthor persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "gitlab-merge-requests-pushes-and-comments":
        return (<GitlabMergeRequestsPushesAndComments persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
      case "gitlab-total-commits-by-project":
        return (<GitlabTotalCommitsByProjectChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);

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

