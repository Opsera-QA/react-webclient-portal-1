import React, { useState } from "react";
import PropTypes from "prop-types";
import {faChartBar} from "@fortawesome/pro-light-svg-icons";
import KpiSettingsForm from "../marketplace/kpi_marketplace_detail_view/KpiSettingsForm";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";

// Opsera KPIs
import OpseraPipelineByStatusBarChart from "./opsera/bar_chart/pipeline_by_status/OpseraPipelineByStatusBarChart";
import OpseraBuildDurationBarChart from "./opsera/bar_chart/build_duration/OpseraBuildDurationBarChart";
import OpseraBuildsByUserBarChart from "./opsera/bar_chart/builds_by_user/OpseraBuildsByUserBarChart";
import OpseraDeploymentFrequencyLineChart from "./opsera/line_chart/deployment_frequency/OpseraDeploymentFrequencyLineChart";
import OpseraRecentPipelineStatus from "./opsera/OpseraRecentPipelineStatus";
import OpseraRecentCDStatus from "./opsera/OpseraRecentCDStatus";

// Jenkins KPIs
import JenkinsBuildsByUserBarChart from "./jenkins/bar_chart/builds_by_user/JenkinsBuildsByUserBarChart";
import JenkinsBuildDurationBarChart from "./jenkins/bar_chart/build_duration/JenkinsBuildDurationBarChart";
import JenkinsStatusByJobNameBarChart from "./jenkins/bar_chart/status_by_job_name/JenkinsStatusByJobNameBarChart"
import JenkinsDeploymentFrequencyLineChart from "./jenkins/line_chart/deployment_frequency/JenkinsDeploymentFrequencyLineChart";
import JenkinsChangeFailureRate from "./jenkins/JenkinsChangeFailureRate";
import JenkinsDeploymentsCountsBarChart from "./jenkins/bar_chart/deployments_counts/JenkinsDeploymentsCountsBarChart";
import JenkinsRecentBuildStatusTable from "./jenkins/JenkinsRecentBuildStatusTable";

// Jira KPIs
import JiraIssuesByPriorityBarChart from "./jira/bar_chart/issues_by_priority/JiraIssuesByPriorityBarChart";
import JiraTicketsAssignedByUserBarChart from "./jira/bar_chart/tickets_assigned_by_user/JiraTicketsAssignedByUserBarChart";
import JiraHealthBySprintBarChart from "./jira/bar_chart/health_by_sprint/JiraHealthBySprintBarChart";
import JiraVelocityReportBarChart from "./jira/bar_chart/velocity_report/JiraVelocityReportBarChart";
import JiraIssuesCreatedVsResolvedLineChart from "./jira/line_chart/issues_created_vs_resolved/JiraIssuesCreatedVsResolvedLineChart";
import JiraIssuesAssignedToMe from "./jira/JiraIssuesAssignedToMe";
import JiraSprintBurndownLineChart from "./jira/line_chart/sprint_burndown/JiraSprintBurndownLineChart";

// Anchore KPIs
import AnchoreVulnerabilitySeverityByPackageBarChart from "./anchore/bar_chart/vulnerability_severity_by_package/AnchoreVulnerabilitySeverityByPackageBarChart";
import AnchoreVulnerabilitiesByDateLineChart from "./anchore/line_chart/AnchoreVulnerabilitiesByDateLineChart";

// Sonar KPIs
import SonarCodeSmellsLineChart from "./sonar/line_chart/code_smells/SonarCodeSmellsLineChart";
import SonarMaintainabilityRatingLineChart from "./sonar/line_chart/maintainability_rating/SonarMaintainabilityRatingLineChart";
import SonarBugsCountLineChart from "./sonar/line_chart/bugs/SonarBugsCountLineChart";
import SonarNewBugsCountLineChart from "./sonar/line_chart/new_bugs/SonarNewBugsCountLineChart";
import SonarReliabilityRatingLineChart from "./sonar/line_chart/reliability_rating/SonarReliabilityRatingLineChart";
import SonarReliabilityRemediationEffortLineChart from "./sonar/line_chart/reliability_remediation_effort/SonarReliabilityRemediationEffortLineChart";
import SonarMetricByProjectLineChart from "./sonar/line_chart/metric-by-project/SonarMetricByProjectLineChart";
import SonarCodeCoverageBarChart from "./sonar/bar_chart/code_coverage/SonarCodeCoverageBarChart";
import SonarLinesToCoverBarChart from "./sonar/bar_chart/code_coverage/SonarLinesToCoverBarChart";

// Jmeter KPIs
import JmeterHitsLineChart from "./jmeter/line_chart/hits/JmeterHitsLineChart";
import JmeterErrorsLineChart from "./jmeter/line_chart/errors/JmeterErrorsLineChart";
import JmeterThroughputLineChart from "./jmeter/line_chart/throughput/JmeterThroughputLineChart";
import JmeterResponseTimeLineChart from "./jmeter/line_chart/response_time/JmeterResponseTimeLineChart";
import JmeterConnectTimeTable from "./jmeter/JmeterConnectTimeTable";

// Gitlab KPIs
import GitlabMostActiveContributors from "./gitlab/GitlabMostActiveContributors";
import GitlabMergeRequestByMaximumTimeChart from "./gitlab/bar_chart/merge_request_by_maximum_time/GitlabMergeRequestByMaximumTimeChart";
import GitlabMergeRequestsByUserChart from "./gitlab/bar_chart/merge_requests_by_user/GitlabMergeRequestsByUserChart";
import GitlabTimeTakenToCompleteMergeRequestReview from "./gitlab/bar_chart/time_taken_to_complete_merge_request_review/GitlabTimeTakenToCompleteMergeRequestReview";
import GitlabCommitsByAuthor from "./gitlab/calendar_chart/commits_by_author/GitlabCommitsByAuthor";
import GitlabMergeRequestsPushesAndComments from "./gitlab/calendar_chart/merge_requests_pushes_and_comments/GitlabMergeRequestsPushesAndComments";
import GitlabTotalCommitsByProjectChart from "./gitlab/pie_chart/total_commits_by_project/GitlabTotalCommitsByProjectChart";
import GitlabRecentMergeRequests from "./gitlab/GitlabRecentMergeRequests";

// Cypress KPIs
import CypressTestResultsTable from "./cypress/CypressTestResultsTable";

// Junit KPIs
import JunitTestResultsTable from "./junit/JunitTestResultsTable";

// Xunit KPIs
import XunitTestResultsTable from "./xunit/XunitTestResultsTable";

// Metricbeat KPIs
import MetricbeatCpuUsageByTimeLineChart from "./metricbeat/line_chart/cpu_usage/MetricbeatCpuUsageByTimeLineChart";
import MetricbeatInNetworkTrafficByTimeLineChart from "./metricbeat/line_chart/in_network_usage/MetricbeatInNetworkTrafficByTimeLineChart";
import MetricbeatMemoryUsageByTimeLineChart from "./metricbeat/line_chart/memory_usage/MetricbeatMemoryUsageByTimeLineChart";
import MetricbeatOutNetworkTrafficByTimeLineChart from "./metricbeat/line_chart/out_network_usage/MetricbeatOutNetworkTrafficByTimeLineChart";
import {getDateObjectFromKpiConfiguration, getTagsFromKpiConfiguration} from "components/insights/charts/charts-helpers";

function ChartView({kpiConfiguration, dashboardData, index, loadChart, setKpis}) {
  const [kpiConfig, setKpiConfig] = useState(kpiConfiguration);
  // TODO: This is only being used until each chart is updated to use ChartContainer inside.
  //  After everything is refactored,
  //  this should be deleted and we should just return getChart() at bottom of component instead
  const getView = () => {
    if (kpiConfig?.kpi_identifier === "opsera-status-by-pipeline") {
      return getChart();
    }

    return (
      <ChartContainer
        title={kpiConfig?.kpi_name}
        chart={getChart()}
        loadChart={loadChart}
        kpiConfiguration={kpiConfig}
        setKpiConfiguration={setKpiConfig}
        dashboardData={dashboardData}
        setKpis={setKpis}
        index={index}
      />
    );
  }

  // TODO: Remove all references and reference directly from helper class
  const getDateObject = (kpiConfiguration) => {
    return getDateObjectFromKpiConfiguration(kpiConfiguration);
  };

  // TODO: chart is global in this component, so it doesn't need to be passed in to this or getDateObject,
  //  unless those functions are moved into a helper component
  const getChart = () => {
    switch (kpiConfig?.kpi_identifier) {

      // Opsera KPIs
      case "opsera-status-by-pipeline":
        return (
            <OpseraPipelineByStatusBarChart
              persona={"developer"}
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          );
      case "opsera-pipeline-duration":
        return (<OpseraBuildDurationBarChart persona={"developer"} date={getDateObject(kpiConfig)} tags={getTagsFromKpiConfiguration(kpiConfig)}/>);
      case "opsera-pipelines-by-user":
        return (<OpseraBuildsByUserBarChart persona={"developer"} date={getDateObject(kpiConfig)} tags={getTagsFromKpiConfiguration(kpiConfig)}/>);
      case "opsera-deployment-frequency":
        return (<OpseraDeploymentFrequencyLineChart persona={"developer"} date={getDateObject(kpiConfig)} tags={getTagsFromKpiConfiguration(kpiConfig)}/>);
      case "opsera-recent-pipeline-status":
        return (<OpseraRecentPipelineStatus persona={"developer"} date={getDateObject(kpiConfig)} tags={getTagsFromKpiConfiguration(kpiConfig)}/>);
      case "opsera-recent-cd-status":
        return (<OpseraRecentCDStatus persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Jenkins KPIs
      case "jenkins-builds-by-user":
        return (<JenkinsBuildsByUserBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jenkins-build-duration":
        return (<JenkinsBuildDurationBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jenkins-status-by-job-name":
        return (<JenkinsStatusByJobNameBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jenkins-deployment-frequency":
        return (<JenkinsDeploymentFrequencyLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jenkins-change-failure-rate":
        return (<JenkinsChangeFailureRate persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jenkins-deployments-counts":
        return (<JenkinsDeploymentsCountsBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jenkins-recent-build-status":
        return (<JenkinsRecentBuildStatusTable persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Jira KPIs
      case "jira-tickets-assigned-by-user":
        return (<JiraTicketsAssignedByUserBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jira-issues-by-priority":
        return (<JiraIssuesByPriorityBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jira-health-by-sprint":
        return (<JiraHealthBySprintBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jira-velocity-report":
        return (<JiraVelocityReportBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jira-issues-created-vs-resolved":
        return (<JiraIssuesCreatedVsResolvedLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jira-sprint-burndown":
        return (<JiraSprintBurndownLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jira-issues-assigned-to-me":
        return (<JiraIssuesAssignedToMe persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Anchore KPIs
      case "anchore-vulnerability-severity-by-package":
        return (<AnchoreVulnerabilitySeverityByPackageBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "anchore-vulnerabilities-by-date":
        return (<AnchoreVulnerabilitiesByDateLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Sonar KPIs
      case "sonar-code-smells":
        return (<SonarCodeSmellsLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "sonar-maintainability-rating":
        return (<SonarMaintainabilityRatingLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "sonar-bugs":
        return (<SonarBugsCountLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "sonar-new-bugs":
        return (<SonarNewBugsCountLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "sonar-reliability-rating":
        return (<SonarReliabilityRatingLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "sonar-reliability-remediation-effort":
        return (<SonarReliabilityRemediationEffortLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "sonar-vulnerabilities-by-project":
        return (<SonarMetricByProjectLineChart persona={"developer"} date={getDateObject(kpiConfig)} sonarMeasure={"vulnerabilities"}/>);
      case "sonar-new-vulnerabilities-by-project":
        return (<SonarMetricByProjectLineChart persona={"developer"} date={getDateObject(kpiConfig)} sonarMeasure={"new_vulnerabilities"}/>);
      case "sonar-new-technical-debt-by-project":
        return (<SonarMetricByProjectLineChart persona={"developer"} date={getDateObject(kpiConfig)} sonarMeasure={"new_technical_debt"}/>);
      case "sonar-code-smells-by-project":
        return (<SonarMetricByProjectLineChart persona={"developer"} date={getDateObject(kpiConfig)} sonarMeasure={"code_smells"}/>);
      case "sonar-code-coverage":
        return (<SonarCodeCoverageBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "sonar-lines-to-cover":
        return (<SonarLinesToCoverBarChart persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Jmeter KPIs
      case "jmeter-hits":
        return (<JmeterHitsLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jmeter-errors":
        return (<JmeterErrorsLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jmeter-throughput":
        return (<JmeterThroughputLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jmeter-response-time":
        return (<JmeterResponseTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "jmeter-connect-time":
        return (<JmeterConnectTimeTable persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Gitlab KPIs
      case "gitlab-most-active-contributors":
        return (<GitlabMostActiveContributors persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "gitlab-merge-request-by-maximum-time":
        return (<GitlabMergeRequestByMaximumTimeChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "gitlab-merge-requests-by-user":
        return (<GitlabMergeRequestsByUserChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "gitlab-time-taken-to-complete-merge-request-review":
        return (<GitlabTimeTakenToCompleteMergeRequestReview persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "gitlab-commits-by-author":
        return (<GitlabCommitsByAuthor persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "gitlab-merge-requests-pushes-and-comments":
        return (<GitlabMergeRequestsPushesAndComments persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "gitlab-total-commits-by-project":
        return (<GitlabTotalCommitsByProjectChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "gitlab-recent-merge-requests":
        return (<GitlabRecentMergeRequests persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Cypress KPIs
      case "cypress-test-results":
        return (<CypressTestResultsTable persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Junit KPIs
      case "junit-test-results":
        return (<JunitTestResultsTable persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Xunit KPIs
      case "xunit-test-results":
        return (<XunitTestResultsTable persona={"developer"} date={getDateObject(kpiConfig)}/>);

      // Metricbeat KPIs
      case "metricbeat-kubernetes-cpu-usage":
        return (<MetricbeatCpuUsageByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "metricbeat-kubernetes-memory-usage":
        return (<MetricbeatMemoryUsageByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "metricbeat-kubernetes-in-network-usage":
        return (<MetricbeatInNetworkTrafficByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
      case "metricbeat-kubernetes-out-network-usage":
        return (<MetricbeatOutNetworkTrafficByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)}/>);
    }
  }

  // TODO: Chart container should be inside each chart component
  //  with loading passed in to allow chart to refresh while keeping existing data and also informing users it's updating.
  return (getView());
}

ChartView.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number
}

export default ChartView;

