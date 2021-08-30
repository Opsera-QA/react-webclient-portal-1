import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";

// Opsera KPIs
import OpseraPipelineByStatusBarChart from "./opsera/bar_chart/pipeline_by_status/OpseraPipelineByStatusBarChart";
import OpseraBuildDurationBarChart from "./opsera/bar_chart/build_duration/OpseraBuildDurationBarChart";
import OpseraBuildsByUserBarChart from "./opsera/bar_chart/builds_by_user/OpseraBuildsByUserBarChart";
import OpseraDeploymentFrequencyLineChart from "./opsera/line_chart/deployment_frequency/OpseraDeploymentFrequencyLineChart";
import OpseraRecentPipelineStatus from "components/insights/charts/opsera/table/recent_pipeline_status/OpseraRecentPipelineStatus";
import OpseraRecentCDStatusTable from "components/insights/charts/opsera/table/recent_cd_status/OpseraRecentCDStatusTable";
import OpseraPipelineDeploymentFrequencyStats from "./opsera/OpseraDeploymentFreqStats/OpseraPipelineDeploymentFrequencyStats";
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
import SonarReliabilityRemediationEffortByProjectLineChart from "./sonar/line_chart/reliability_remediation_effort_by_project/SonarReliabilityRemediationEffortByProjectLineChart";
import SonarMetricByProjectLineChart from "./sonar/line_chart/metric-by-project/SonarMetricByProjectLineChart";
import SonarCodeCoverageBarChart from "./sonar/bar_chart/code_coverage/SonarCodeCoverageBarChart";
import SonarLinesToCoverBarChart from "./sonar/bar_chart/code_coverage/SonarLinesToCoverBarChart";
import SonarRatings from "./sonar/sonar_ratings/SonarRatings";
// import SonarSecurityScorecard from "./sonar/SonarSecurityScorecard";
import SonarBugsMetricScorecard from "./sonar/table/bugs-scorecard/SonarBugsMetricScorecard";
import SonarCodeSmellsMetricScorecard from "./sonar/table/codesmells-scorecard/SonarCodeSmellsMetricScorecard";
import SonarVulnerabilitiesMetricScorecard from "./sonar/table/vulnerabilities-scorecard/SonarVulnerabilitiesMetricScorecard";
import SonarReliabilityRemediationEffortAggByTimetLineChart from "./sonar/line_chart/reliability_remediation_effort_aggregation_by_time/SonarReliabilityRemediationEffortAggBytimeLineChart";
import SonarReliabilityRemediationEffortAggTrendLineChart from "./sonar/line_chart/reliability_remediation_effort_agg_trend/SonarReliabilityRemediationEffortAggTrendLineChart";

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
import BitbucketRejectedMergeRequestsTable from "components/insights/charts/bitbucket/table/bitbucket-rejected-merge-requests/BitbucketRejectedMergeRequestsTable.jsx";

// Cypress KPIs
import CypressTestResultsTable from "./cypress/CypressTestResultsTable";

// Selenium KPIs
import SeleniumTestResultsTable from "./selenium/SeleniumTestResultsTable";
import SeleniumTestSummaryPercentages from "./selenium/pie_chart/SeleniumTestSummaryPercentages";

// Junit KPIs
import JunitTestResultsTable from "./junit/JunitTestResultsTable";

// Xunit KPIs
import XunitTestResultsTable from "./xunit/XunitTestResultsTable";

// Metricbeat KPIs
import MetricbeatCpuUsageByTimeLineChart from "./metricbeat/line_chart/cpu_usage/MetricbeatCpuUsageByTimeLineChart";
import MetricbeatInNetworkTrafficByTimeLineChart from "./metricbeat/line_chart/in_network_usage/MetricbeatInNetworkTrafficByTimeLineChart";
import MetricbeatMemoryUsageByTimeLineChart from "./metricbeat/line_chart/memory_usage/MetricbeatMemoryUsageByTimeLineChart";
import MetricbeatOutNetworkTrafficByTimeLineChart from "./metricbeat/line_chart/out_network_usage/MetricbeatOutNetworkTrafficByTimeLineChart";

//QA Testing
import ManualQaTestPieChart from "components/insights/charts/qa_metrics/ManualQaTestPieChart";
import FirstPassYieldPieChart from "components/insights/charts/qa_metrics/FirstPassYieldPieChart";
import CummulativeOpenDefectsPieChart from "components/insights/charts/qa_metrics/CummulativeOpenDefectsPieChart";
import AutomationPercentagePieChart from "./qa_metrics/AutomationPercentagePieChart";
import AdoptionPercentagePieChart from "./qa_metrics/AdoptionPercentagePieChart";
import AutomatedTestResultsPieChart from "./qa_metrics/AutomatedTestResultsPieChart";
import SFDCManualTestResultsPieChart from "./qa_metrics/SFDCManualTestResultsPieChart";
import DefectRemovalEfficiencyPieChart from "./qa_metrics/DefectRemovalEfficiencyPieChart";

// SFDC KPIs
import SFDCBackups from "components/insights/charts/sfdc/SFDCBackups";
import SFDCProfileMigrationsBarChart from "components/insights/charts/sfdc/bar_chart/profile_migrations/SFDCProfileMigrationsBarChart";
import SFDCUnitTestingPieChart from "components/insights/charts/sfdc/pie_chart/unit_testing/SFDCUnitTestingPieChart";

// Service Now KPIs
import ServiceNowMeanTimeToResolutionBarChart from "./servicenow/bar_chart/mean_time_to_resolution/ServiceNowMeanTimeToResolutionBarChart";
import ServiceNowMeanTimeToAcknowledgeBarChart from "./servicenow/bar_chart/mean_time_to_acknowledge/ServiceNowMeanTimeToAcknowledgeBarChart";
import ServiceNowMeanTimeBetweenFailuresBarChart from "./servicenow/bar_chart/mean_time_between_failures/ServiceNowMeanTimeBetweenFailuresBarChart";

// Coverity KPIs
import CoverityIssuesByCategory from "./coverity/CoverityIssuesByCategory/CoverityIssuesByCategory";

import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";
import { Col } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";

// TODO: This is getting rather large. We should break it up into ChartViews based on type. OpseraChartView, JiraChartView etc..
function ChartView({ kpiConfiguration, dashboardData, index, loadChart, setKpis }) {
  const [kpiConfig, setKpiConfig] = useState(kpiConfiguration);
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();

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
      <Col xl={6} md={12} className="p-2">
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
      </Col>
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
          <Col xl={6} md={12} className="p-2">
            <OpseraPipelineByStatusBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-pipeline-duration":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraBuildDurationBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-pipelines-by-user":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraBuildsByUserBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-deployment-frequency":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraDeploymentFrequencyLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-recent-pipeline-status":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraRecentPipelineStatus
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-recent-cd-status":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraRecentCDStatusTable
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-duration-by-stage":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraBuildDurationByStageBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-deployment-frequency-stats":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraPipelineDeploymentFrequencyStats
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-mean-time-to-restore":
        return (
          <Col md={12} className="p-2">
            <OpseraMeanTimeToRestoreBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "opsera-nexus-pipeline-step-info":
        return (
          <Col xl={6} md={12} className="p-2">
            <OpseraNexusPipelineStepInfo
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Jenkins KPIs
      case "jenkins-builds-by-user":
        return (
          <Col xl={6} md={12} className="p-2">
            <JenkinsBuildsByUserBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jenkins-build-duration":
        return (
          <Col xl={6} md={12} className="p-2">
            <JenkinsBuildDurationBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jenkins-status-by-job-name":
        return (
          <Col xl={6} md={12} className="p-2">
            <JenkinsStatusByJobNameBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jenkins-deployment-frequency":
        return <JenkinsDeploymentFrequencyLineChart persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "jenkins-change-failure-rate":
        return <JenkinsChangeFailureRate persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "jenkins-deployments-counts":
        return <JenkinsDeploymentsCountsBarChart persona={"developer"} date={getDateObject(kpiConfig)} />;
      case "jenkins-recent-build-status":
        return (
          <Col xl={6} md={12} className="p-2">
            <JenkinsRecentPipelineStatus
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Jira KPIs
      case "jira-tickets-assigned-by-user":
        return (
          <Col xl={6} md={12} className="p-2">
            <JiraTicketsAssignedByUserBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jira-issues-by-priority":
        return (
          <Col xl={6} md={12} className="p-2">
            <JiraIssuesByPriorityBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jira-health-by-sprint":
        return (
          <Col xl={6} md={12} className="p-2">
            <JiraHealthBySprintBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jira-velocity-report":
        return (
          <Col xl={6} md={12} className="p-2">
            <JiraVelocityReportBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jira-issues-created-vs-resolved":
        return (
          <Col xl={6} md={12} className="p-2">
            <JiraIssuesCreatedVsResolvedLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jira-sprint-burndown":
        return (
          <Col xl={6} md={12} className="p-2">
            <JiraSprintBurndownLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jira-issues-assigned-to-me":
        return (
          <Col xl={6} md={12} className="p-2">
            <JiraIssuesAssignedToMe
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jira-lead-time":
        return (
          <Col md={12} className="p-2">
            <JiraLeadTimeLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Anchore KPIs
      case "anchore-vulnerability-severity-by-package":
        return (
          <Col xl={6} md={12} className="p-2">
            <AnchoreVulnerabilitySeverityByPackageBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "anchore-vulnerabilities-by-date":
        return (
          <Col xl={6} md={12} className="p-2">
            <AnchoreVulnerabilitiesByDateLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Sonar KPIs
      case "sonar-code-smells":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarCodeSmellsLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-maintainability-rating":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarMaintainabilityRatingLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-bugs":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarBugsCountLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-new-bugs":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarNewBugsCountLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-reliability-rating":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarReliabilityRatingLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-reliability-remediation-effort":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarReliabilityRemediationEffortLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-reliability-remediation-effort-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarReliabilityRemediationEffortByProjectLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-reliability-remediation-agg-by-time":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarReliabilityRemediationEffortAggByTimetLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-reliability-remediation-agg-trend":
        return (
          !envIsProd && (
            <Col xl={6} md={12} className="p-2">
              <SonarReliabilityRemediationEffortAggTrendLineChart
                kpiConfiguration={kpiConfig}
                setKpiConfiguration={setKpiConfig}
                dashboardData={dashboardData}
                setKpis={setKpis}
                index={index}
              />
            </Col>
          )
        );
      case "sonar-vulnerabilities-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarMetricByProjectLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
              sonarMeasure={"vulnerabilities"}
            />
          </Col>
        );
      case "sonar-new-vulnerabilities-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarMetricByProjectLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
              sonarMeasure={"new_vulnerabilities"}
            />
          </Col>
        );
      case "sonar-new-technical-debt-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarMetricByProjectLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
              sonarMeasure={"new_technical_debt"}
            />
          </Col>
        );
      case "sonar-code-smells-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarMetricByProjectLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
              sonarMeasure={"code_smells"}
            />
          </Col>
        );
      case "sonar-code-coverage":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarCodeCoverageBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-lines-to-cover":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarLinesToCoverBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-ratings":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarRatings
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      // case "sonar-security-scorecard":
      //   return (
      //     <Col xl={6} md={12} className="p-2">
      //       <SonarSecurityScorecard
      //         kpiConfiguration={kpiConfig}
      //         setKpiConfiguration={setKpiConfig}
      //         dashboardData={dashboardData}
      //         setKpis={setKpis}
      //         index={index}
      //       />
      //     </Col>
      //   );
      case "sonar-bugs-metric-scorecard":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarBugsMetricScorecard
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-codesmells-metric-scorecard":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarCodeSmellsMetricScorecard
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-vulnerabilities-metric-scorecard":
        return (
          <Col xl={6} md={12} className="p-2">
            <SonarVulnerabilitiesMetricScorecard
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      // Jmeter KPIs
      case "jmeter-hits":
        return (
          <Col xl={6} md={12} className="p-2">
            <JmeterHitsLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jmeter-errors":
        return (
          <Col xl={6} md={12} className="p-2">
            <JmeterErrorsLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jmeter-throughput":
        return (
          <Col xl={6} md={12} className="p-2">
            <JmeterThroughputLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jmeter-response-time":
        return (
          <Col xl={6} md={12} className="p-2">
            <JmeterResponseTimeLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "jmeter-connect-time":
        return (
          <Col xl={6} md={12} className="p-2">
            <JmeterConnectTimeTable
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Gitlab KPIs
      case "gitlab-most-active-contributors":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabMostActiveContributors
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-merge-request-by-maximum-time":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabMergeRequestByMaximumTimeChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-merge-requests-by-user":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabMergeRequestsByUserChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-time-taken-to-complete-merge-request-review":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabTimeTakenToCompleteMergeRequestReview
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-commits-by-author":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabCommitsByAuthor
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-merge-requests-pushes-and-comments":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabMergeRequestsPushesAndComments
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-total-commits-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabTotalCommitsByProjectChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-recent-merge-requests":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabRecentMergeRequests
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "gitlab-pending-merge-requests":
        return (
          <Col xl={6} md={12} className="p-2">
            <GitlabPendingMergeRequests
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Cypress KPIs
      case "cypress-test-results":
        return (
          <Col xl={6} md={12} className="p-2">
            <CypressTestResultsTable
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Selenium KPIs
      case "selenium-test-results":
        return (
          <Col xl={6} md={12} className="p-2">
            <SeleniumTestResultsTable
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "selenium-test-summary-percentages":
        return (
          <Col md={12} className="p-2">
            <SeleniumTestSummaryPercentages
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Junit KPIs
      case "junit-test-results":
        return (
          <Col xl={6} md={12} className="p-2">
            <JunitTestResultsTable
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Xunit KPIs
      case "xunit-test-results":
        return (
          <Col xl={6} md={12} className="p-2">
            <XunitTestResultsTable
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
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
          <Col xl={6} md={12} className="p-2">
            <GithubMergeRequestsByUser
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-merge-requests-pushes-and-comments":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubMergeRequestsPushesAndComments
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-total-commits-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubTotalCommitsByProjectChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-most-active-contributors":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubMostActiveContributors
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-recent-merge-requests":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubRecentMergeRequests
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-time-taken-to-complete-merge-request-review":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubTimeTakenToCompleteMergeRequestReview
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-merge-request-by-maximum-time":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubMergeRequestByMaximumTimeChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-commits-by-author":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubCommitsByAuthor
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "github-pending-merge-requests":
        return (
          <Col xl={6} md={12} className="p-2">
            <GithubPendingMergeRequests
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );

      // Bitbucket KPIs
      case "bitbucket-most-active-contributors":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketMostActiveContributors
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-merge-request-by-maximum-time":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketMergeRequestByMaximumTimeChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-merge-requests-by-user":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketMergeRequestsByUserChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-time-taken-to-complete-merge-request-review":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketTimeTakenToCompleteMergeRequestReview
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-commits-by-author":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketCommitsByAuthor
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-merge-requests-pushes-and-comments":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketMergeRequestsPushesAndComments
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-total-commits-by-project":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketTotalCommitsByProjectChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-recent-merge-requests":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketRecentMergeRequests
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-pending-merge-requests":
        return (
          <Col xl={6} md={12} className="p-2">
            <BitbucketPendingMergeRequests
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "bitbucket-rejected-merge-requests":
        return (
          <Col md={12} className="p-2">
            <BitbucketRejectedMergeRequestsTable
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      // QA Testing
      case "qa-manual-test":
        return (
          <Col md={12} className="p-2">
            <ManualQaTestPieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "first-pass-yield":
        return (
          <Col md={12} className="p-2">
            <FirstPassYieldPieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "cumulative-open-defects":
        return (
          <Col md={12} className="p-2">
            <CummulativeOpenDefectsPieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "automation-percentage":
        return (
          <Col md={12} className="p-2">
            <AutomationPercentagePieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "adoption-percentage":
        return (
          <Col md={12} className="p-2">
            <AdoptionPercentagePieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "automated-test-results":
        return (
          <Col md={12} className="p-2">
            <AutomatedTestResultsPieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sfdc-manual-test":
        return (
          <Col md={12} className="p-2">
            <SFDCManualTestResultsPieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sfdc-backups":
        return (
          <Col xl={6} md={12} className="p-2">
            <SFDCBackups
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sfdc-profile-migrations":
        return (
          <Col xl={6} md={12} className="p-2">
            <SFDCProfileMigrationsBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sfdc-unit-testing":
        return (
          <Col xl={6} md={12} className="p-2">
            <SFDCUnitTestingPieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      // Service Now
      case "servicenow-mean-time-to-resolution":
        return (
          <Col xl={6} md={12} className="p-2">
            <ServiceNowMeanTimeToResolutionBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "servicenow-mean-time-to-acknowledge":
        return (
          <Col xl={6} md={12} className="p-2">
            <ServiceNowMeanTimeToAcknowledgeBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "servicenow-mean-time-between-failures":
        return (
          <Col xl={6} md={12} className="p-2">
            <ServiceNowMeanTimeBetweenFailuresBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "defect-removal-efficiency":
        return (
          <Col md={12} className="p-2">
            <DefectRemovalEfficiencyPieChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      // Coverity
      case "coverity-issues-by-category-trend":
        return (
          <Col xl={6} md={12} className="p-2">
            <CoverityIssuesByCategory
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
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
