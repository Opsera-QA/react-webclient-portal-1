import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";

// Opsera KPIs
import OpseraPipelineByStatusBarChart from "./opsera/bar_chart/pipeline_by_status/OpseraPipelineByStatusBarChart";
import OpseraBuildDurationBarChart from "./opsera/bar_chart/build_duration/OpseraBuildDurationBarChart";
import OpseraBuildsByUserBarChart from "./opsera/bar_chart/builds_by_user/OpseraBuildsByUserBarChart";
import OpseraDeploymentFrequencyLineChart from "./opsera/line_chart/deployment_frequency/OpseraDeploymentFrequencyLineChart";
import OpseraRecentPipelineStatus from "components/insights/charts/opsera/table/recent_pipeline_status/OpseraRecentPipelineStatus";
import OpseraRecentCDStatusTable from "components/insights/charts/opsera/table/recent_cd_status/OpseraRecentCDStatusTable";
import OpseraPipelineDeploymentFrequencyStats from "./opsera/OpseraPipelineDeploymentFrequencyStats";
import OpseraBuildDurationByStageBarChart from "./opsera/bar_chart/duration_by_stage/OpseraBuildDurationByStageBarChart";
import OpseraMeanTimeToRestoreBarChart from "./opsera/bar_chart/mean_time_to_restore/OpseraMeanTimeToRestoreBarChart";
import OpseraNexusPipelineStepInfo from "components/insights/charts/opsera/table/nexus_pipeline_step_info/OpseraNexusPipelineStepInfo";

// Jenkins KPIs
import JenkinsBuildsByUserBarChart from "./jenkins/bar_chart/builds_by_user/JenkinsBuildsByUserBarChart";
import JenkinsBuildDurationBarChart from "./jenkins/bar_chart/build_duration/JenkinsBuildDurationBarChart";
import JenkinsStatusByJobNameBarChart from "./jenkins/bar_chart/status_by_job_name/JenkinsStatusByJobNameBarChart";
import JenkinsDeploymentFrequencyLineChart from "./jenkins/line_chart/deployment_frequency/JenkinsDeploymentFrequencyLineChart";
import JenkinsChangeFailureRate from "./jenkins/JenkinsChangeFailureRate";
import JenkinsDeploymentsCountsBarChart from "./jenkins/bar_chart/deployments_counts/JenkinsDeploymentsCountsBarChart";
import JenkinsRecentPipelineStatus from "components/insights/charts/jenkins/table/recent_pipeline_status/JenkinsRecentBuildStatusTable";

// Jira KPIs
import JiraIssuesByPriorityBarChart from "./jira/bar_chart/issues_by_priority/JiraIssuesByPriorityBarChart";
import JiraTicketsAssignedByUserBarChart from "./jira/bar_chart/tickets_assigned_by_user/JiraTicketsAssignedByUserBarChart";
import JiraHealthBySprintBarChart from "./jira/bar_chart/health_by_sprint/JiraHealthBySprintBarChart";
import JiraVelocityReportBarChart from "./jira/bar_chart/velocity_report/JiraVelocityReportBarChart";
import JiraIssuesCreatedVsResolvedLineChart from "./jira/line_chart/issues_created_vs_resolved/JiraIssuesCreatedVsResolvedLineChart";
import JiraIssuesAssignedToMe from "./jira/table/issues_assigned_to_me/JiraIssuesAssignedToMe";
import JiraSprintBurndownLineChart from "./jira/line_chart/sprint_burndown/JiraSprintBurndownLineChart";
import JiraLeadTimeLineChart from "./jira/line_chart/lead_time/JiraLeadTimeLineChart";

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
import SonarRatings from "./sonar/SonarRatings";

// Jmeter KPIs
import JmeterHitsLineChart from "./jmeter/line_chart/hits/JmeterHitsLineChart";
import JmeterErrorsLineChart from "./jmeter/line_chart/errors/JmeterErrorsLineChart";
import JmeterThroughputLineChart from "./jmeter/line_chart/throughput/JmeterThroughputLineChart";
import JmeterResponseTimeLineChart from "./jmeter/line_chart/response_time/JmeterResponseTimeLineChart";
import JmeterConnectTimeTable from "./jmeter/table/connect_time/JmeterConnectTimeTable";

// Gitlab KPIs
import GitlabMostActiveContributors from "./gitlab/table/most_active_contributors/GitlabMostActiveContributors";
import GitlabMergeRequestByMaximumTimeChart from "./gitlab/bar_chart/merge_request_by_maximum_time/GitlabMergeRequestByMaximumTimeChart";
import GitlabMergeRequestsByUserChart from "./gitlab/bar_chart/merge_requests_by_user/GitlabMergeRequestsByUserChart";
import GitlabTimeTakenToCompleteMergeRequestReview from "./gitlab/bar_chart/time_taken_to_complete_merge_request_review/GitlabTimeTakenToCompleteMergeRequestReview";
import GitlabCommitsByAuthor from "./gitlab/calendar_chart/commits_by_author/GitlabCommitsByAuthor";
import GitlabMergeRequestsPushesAndComments from "./gitlab/calendar_chart/merge_requests_pushes_and_comments/GitlabMergeRequestsPushesAndComments";
import GitlabTotalCommitsByProjectChart from "./gitlab/pie_chart/total_commits_by_project/GitlabTotalCommitsByProjectChart";
import GitlabRecentMergeRequests from "./gitlab/table/recent_merge_requests/GitlabRecentMergeRequests";
import GitlabPendingMergeRequests from "./gitlab/table/pending_merge_requests/GitlabPendingMergeRequests.jsx";

// Github KPIs
import GithubMergeRequestsByUser from "./github/bar_chart/merge_requests_by_user/GithubMergeRequestsByUserChart";
import GithubMergeRequestsPushesAndComments from "./github/calendar_chart/merge_requests_pushes_and_comments/GithubMergeRequestsPushesAndComments";
import GithubTotalCommitsByProjectChart from "./github/pie_chart/total_commits_by_project/GithubTotalCommitsByProjectChart";
import GithubMostActiveContributors from "./github/table/most_active_contributors/GithubMostActiveContributors";
import GithubRecentMergeRequests from "./github/table/recent_merge_requests/GithubRecentMergeRequests";
import GithubTimeTakenToCompleteMergeRequestReview from "./github/bar_chart/time_taken_to_complete_merge_request_review/GithubTimeTakenToCompleteMergeRequestReview";
import GithubMergeRequestByMaximumTimeChart from "./github/bar_chart/merge_request_by_maximum_time/GithubMergeRequestByMaximumTimeChart";
import GithubCommitsByAuthor from "./github/calendar_chart/commits_by_author/GithubCommitsByAuthor";
import GithubPendingMergeRequests from "./github/table/pending_merge_requests/GithubPendingMergeRequests";

// Bitbucket KPIs
import BitbucketMostActiveContributors from "./bitbucket/table/bitbucket_most_active_contributors/BitbucketMostActiveContributors";
import BitbucketMergeRequestByMaximumTimeChart from "./bitbucket/bar_chart/merge_request_by_maximum_time/BitbucketMergeRequestByMaximumTimeChart";
import BitbucketMergeRequestsByUserChart from "./bitbucket/bar_chart/merge_requests_by_user/BitbucketMergeRequestsByUserChart";
import BitbucketTimeTakenToCompleteMergeRequestReview from "./bitbucket/bar_chart/time_taken_to_complete_merge_request_review/BitbucketTimeTakenToCompleteMergeRequestReview";
import BitbucketCommitsByAuthor from "./bitbucket/calendar_chart/commits_by_author/BitbucketCommitsByAuthor";
import BitbucketMergeRequestsPushesAndComments from "./bitbucket/calendar_chart/merge_requests_pushes_and_comments/BitbucketMergeRequestsPushesAndComments";
import BitbucketTotalCommitsByProjectChart from "./bitbucket/pie_chart/total_commits_by_project/BitbucketTotalCommitsByProjectChart";
import BitbucketRecentMergeRequests from "./bitbucket/table/bitbucket-recent-merge-requests/BitbucketRecentMergeRequests";
import BitbucketPendingMergeRequests from "./bitbucket/table/bitbucket-pending-merge-requests/BitbucketPendingMergeRequests.jsx";
import BitbucketRejectedMergeRequests from "./bitbucket/table/bitbucket-rejected-merge-requests/BitbucketRejectedMergeRequests.jsx";

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

import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";
//QA Testing
import ManualQATestPieChart from "./qaMetrics/ManualQATestPieChart";


// TODO: This is getting rather large. We should break it up into ChartViews based on type. OpseraChartView, JiraChartView etc..
function ChartView({ kpiConfiguration, dashboardData, index, loadChart, setKpis }) {
  const [kpiConfig, setKpiConfig] = useState(kpiConfiguration);
  // TODO: This is only being used until each chart is updated to use ChartContainer inside.
  //  After everything is refactored,
  //  this should be deleted and we should just return getChart() at bottom of component instead
  const getView = () => {
    if (
      kpiConfig?.kpi_identifier !== "jenkins-deployment-frequency" &&
      kpiConfig?.kpi_identifier !== "jenkins-change-failure-rate" &&
      kpiConfig?.kpi_identifier !== "jenkins-deployments-counts" &&
      kpiConfig?.kpi_identifier !== "metricbeat-kubernetes-cpu-usage" &&
      kpiConfig?.kpi_identifier !== "metricbeat-kubernetes-memory-usage" &&
      kpiConfig?.kpi_identifier !== "metricbeat-kubernetes-in-network-usage" &&
      kpiConfig?.kpi_identifier !== "metricbeat-kubernetes-out-network-usage"
    ) {
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
  };

  // TODO: Remove all references and reference directly from helper class
  const getDateObject = (kpiConfiguration) => {
    return getDateObjectFromKpiConfiguration(kpiConfiguration);
  };

  const getChart = () => {
    switch (kpiConfig?.kpi_identifier) {
      // Opsera KPIs
      case "opsera-status-by-pipeline":
        return (
          <OpseraPipelineByStatusBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-pipeline-duration":
        return (
          <OpseraBuildDurationBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-pipelines-by-user":
        return (
          <OpseraBuildsByUserBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-deployment-frequency":
        return (
          <OpseraDeploymentFrequencyLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-recent-pipeline-status":
        return (
          <OpseraRecentPipelineStatus
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-recent-cd-status":
        return (
          <OpseraRecentCDStatusTable
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-duration-by-stage":
        return (
          <OpseraBuildDurationByStageBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-deployment-frequency-stats":
        return (
          <OpseraPipelineDeploymentFrequencyStats
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-mean-time-to-restore":
        return (
          <OpseraMeanTimeToRestoreBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "opsera-nexus-pipeline-step-info":
        return (
          <OpseraNexusPipelineStepInfo
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Jenkins KPIs
      case "jenkins-builds-by-user":
        return (
          <JenkinsBuildsByUserBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jenkins-build-duration":
        return (
          <JenkinsBuildDurationBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jenkins-status-by-job-name":
        return (
          <JenkinsStatusByJobNameBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jenkins-deployment-frequency":
        return <JenkinsDeploymentFrequencyLineChart persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "jenkins-change-failure-rate":
        return <JenkinsChangeFailureRate persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "jenkins-deployments-counts":
        return <JenkinsDeploymentsCountsBarChart persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "jenkins-recent-build-status":
        return (
          <JenkinsRecentPipelineStatus
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Jira KPIs
      case "jira-tickets-assigned-by-user":
        return (
          <JiraTicketsAssignedByUserBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jira-issues-by-priority":
        return (
          <JiraIssuesByPriorityBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jira-health-by-sprint":
        return (
          <JiraHealthBySprintBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jira-velocity-report":
        return (
          <JiraVelocityReportBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jira-issues-created-vs-resolved":
        return (
          <JiraIssuesCreatedVsResolvedLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jira-sprint-burndown":
        return (
          <JiraSprintBurndownLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jira-issues-assigned-to-me":
        return (
          <JiraIssuesAssignedToMe
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jira-lead-time":
        return (
          <JiraLeadTimeLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Anchore KPIs
      case "anchore-vulnerability-severity-by-package":
        return (
          <AnchoreVulnerabilitySeverityByPackageBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "anchore-vulnerabilities-by-date":
        return (
          <AnchoreVulnerabilitiesByDateLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Sonar KPIs
      case "sonar-code-smells":
        return (
          <SonarCodeSmellsLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-maintainability-rating":
        return (
          <SonarMaintainabilityRatingLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-bugs":
        return (
          <SonarBugsCountLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-new-bugs":
        return (
          <SonarNewBugsCountLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-reliability-rating":
        return (
          <SonarReliabilityRatingLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-reliability-remediation-effort":
        return (
          <SonarReliabilityRemediationEffortLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-vulnerabilities-by-project":
        return (
          <SonarMetricByProjectLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
            sonarMeasure={"vulnerabilities"}
          />
        );
      case "sonar-new-vulnerabilities-by-project":
        return (
          <SonarMetricByProjectLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
            sonarMeasure={"new_vulnerabilities"}
          />
        );
      case "sonar-new-technical-debt-by-project":
        return (
          <SonarMetricByProjectLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
            sonarMeasure={"new_technical_debt"}
          />
        );
      case "sonar-code-smells-by-project":
        return (
          <SonarMetricByProjectLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
            sonarMeasure={"code_smells"}
          />
        );
      case "sonar-code-coverage":
        return (
          <SonarCodeCoverageBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-lines-to-cover":
        return (
          <SonarLinesToCoverBarChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "sonar-ratings":
        return (
          <SonarRatings
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Jmeter KPIs
      case "jmeter-hits":
        return (
          <JmeterHitsLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jmeter-errors":
        return (
          <JmeterErrorsLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jmeter-throughput":
        return (
          <JmeterThroughputLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jmeter-response-time":
        return (
          <JmeterResponseTimeLineChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "jmeter-connect-time":
        return (
          <JmeterConnectTimeTable
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Gitlab KPIs
      case "gitlab-most-active-contributors":
        return (
          <GitlabMostActiveContributors
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-merge-request-by-maximum-time":
        return (
          <GitlabMergeRequestByMaximumTimeChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-merge-requests-by-user":
        return (
          <GitlabMergeRequestsByUserChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-time-taken-to-complete-merge-request-review":
        return (
          <GitlabTimeTakenToCompleteMergeRequestReview
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-commits-by-author":
        return (
          <GitlabCommitsByAuthor
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-merge-requests-pushes-and-comments":
        return (
          <GitlabMergeRequestsPushesAndComments
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-total-commits-by-project":
        return (
          <GitlabTotalCommitsByProjectChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-recent-merge-requests":
        return (
          <GitlabRecentMergeRequests
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "gitlab-pending-merge-requests":
        return (
          <GitlabPendingMergeRequests
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Cypress KPIs
      case "cypress-test-results":
        return (
          <CypressTestResultsTable
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Junit KPIs
      case "junit-test-results":
        return (
          <JunitTestResultsTable
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Xunit KPIs
      case "xunit-test-results":
        return (
          <XunitTestResultsTable
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Metricbeat KPIs
      case "metricbeat-kubernetes-cpu-usage":
        return <MetricbeatCpuUsageByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "metricbeat-kubernetes-memory-usage":
        return <MetricbeatMemoryUsageByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "metricbeat-kubernetes-in-network-usage":
        return <MetricbeatInNetworkTrafficByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "metricbeat-kubernetes-out-network-usage":
        return <MetricbeatOutNetworkTrafficByTimeLineChart persona={"developer"} date={getDateObject(kpiConfig)} />;

      // Github KPIs
      case "github-merge-requests-by-user":
        return (
          <GithubMergeRequestsByUser
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-merge-requests-pushes-and-comments":
        return (
          <GithubMergeRequestsPushesAndComments
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-total-commits-by-project":
        return (
          <GithubTotalCommitsByProjectChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-most-active-contributors":
        return (
          <GithubMostActiveContributors
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-recent-merge-requests":
        return (
          <GithubRecentMergeRequests
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-time-taken-to-complete-merge-request-review":
        return (
          <GithubTimeTakenToCompleteMergeRequestReview
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-merge-request-by-maximum-time":
        return (
          <GithubMergeRequestByMaximumTimeChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-commits-by-author":
        return (
          <GithubCommitsByAuthor
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "github-pending-merge-requests":
        return (
          <GithubPendingMergeRequests
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );

      // Bitbucket KPIs
      case "bitbucket-most-active-contributors":
        return (
          <BitbucketMostActiveContributors
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-merge-request-by-maximum-time":
        return (
          <BitbucketMergeRequestByMaximumTimeChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-merge-requests-by-user":
        return (
          <BitbucketMergeRequestsByUserChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-time-taken-to-complete-merge-request-review":
        return (
          <BitbucketTimeTakenToCompleteMergeRequestReview
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-commits-by-author":
        return (
          <BitbucketCommitsByAuthor
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-merge-requests-pushes-and-comments":
        return (
          <BitbucketMergeRequestsPushesAndComments
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-total-commits-by-project":
        return (
          <BitbucketTotalCommitsByProjectChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-recent-merge-requests":
        return (
          <BitbucketRecentMergeRequests
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-pending-merge-requests":
        return (
          <BitbucketPendingMergeRequests
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      case "bitbucket-rejected-merge-requests":
        return (
          <BitbucketRejectedMergeRequests
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      // QA Testing
      case "qa-manual-test":
        return (
          <ManualQATestPieChart
            kpiConfiguration={kpiConfig}
            setKpiConfiguration={setKpiConfig}
            dashboardData={dashboardData}
            setKpis={setKpis}
            index={index}
          />
        );
      default:
        return null;
    }
  };

  // TODO: Chart container should be inside each chart component
  //  with loading passed in to allow chart to refresh while keeping existing data and also informing users it's updating.
  return getView();
}

ChartView.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
};

export default ChartView;
