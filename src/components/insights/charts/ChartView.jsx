import React, {useState, useEffect, useRef} from "react";
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
import OpseraBuildAndDeploymentStatistics from "components/insights/charts/opsera/build_and_deploy_statistics/OpseraBuildAndDeploymentStatistics";

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

//new
import ProjectWiseUnitTestResults from './unit_tests/project_wise_results/ProjectWiseUnitTestResults';

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
import AllGithubActionsDataBlock from "./github_actions/AllGithubActionsDataBlock";

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
import CumulativeOpenDefectsMetric from "./cumulative_open_defects/CumulativeOpenDefectsMetric";
import ManualQaTestPieChart from "components/insights/charts/qa_metrics/ManualQaTestPieChart";
import AutomationPercentageMetric from "./automation_percentage/AutomationPercentageMetric";
import AdoptionTestPercentageMetricV1 from "components/insights/charts/qa_metrics/automation_test_adoption_rate/AdoptionTestPercentageMetricV1";
import AutomatedTestResultsPieChart from "./qa_metrics/AutomatedTestResultsPieChart";
import SFDCManualTestResultsPieChart from "./qa_metrics/SFDCManualTestResultsPieChart";
// import DefectRemovalEfficiencyPieChart from "./qa_metrics/DefectRemovalEfficiencyPieChart";
import DefectRemovalEfficiencyMetrics from "./defect_removal_efficiency/DefectRemovalEfficiencyMetrics";

// SFDC KPIs
import SalesforceBackupsAndRollbacksMetrics from "components/insights/charts/sfdc/salesforce_backups_and_rollbacks/SalesforceBackupsAndRollbacksMetrics";
import SFDCProfileMigrationsBarChart from "components/insights/charts/sfdc/bar_chart/profile_migrations/SFDCProfileMigrationsBarChart";
import SFDCUnitTestingPieChart from "components/insights/charts/sfdc/pie_chart/unit_testing/SFDCUnitTestingPieChart";
import SalesforceDurationByStageMetrics from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageMetrics";

// Service Now KPIs
import ServiceNowMeanTimeToResolutionBarChart from "./servicenow/bar_chart/mean_time_to_resolution/ServiceNowMeanTimeToResolutionBarChart";
import ServiceNowMeanTimeToAcknowledgeBarChart from "./servicenow/bar_chart/mean_time_to_acknowledge/ServiceNowMeanTimeToAcknowledgeBarChart";

// Coverity KPIs
import CoverityIssuesByCategory from "./coverity/CoverityIssuesByCategory/CoverityIssuesByCategory";

//SDLC KPIs
import SdlcDurationByStageMetrics from "components/insights/charts/sdlc/bar_chart/duration_by_stage/SdlcDurationByStageMetrics";

import { getDateObjectFromKpiConfiguration } from "components/insights/charts/charts-helpers";
import { Col } from "react-bootstrap";
import LegacySonarRatingMetrics from "components/insights/charts/sonar/sonar_ratings_legacy/LegacySonarRatingMetrics";
import SonarRatingMetrics from "components/insights/charts/sonar/sonar_ratings/SonarRatingMetrics";
import AutomatedTestAdoptionRateMetric
  from "components/insights/charts/qa_metrics/automation_test_adoption_rate/AutomatedTestAdoptionRateMetric";
import FirstPassYieldMetrics from "./first_pass/FirstPassYieldMetrics";
import LoadingDialog from "components/common/status_notifications/loading";
import {kpiIdentifierConstants} from "components/admin/kpi_identifiers/kpiIdentifier.constants";

// TODO: This is getting rather large. We should break it up into ChartViews based on type. OpseraChartView, JiraChartView etc..
function ChartView({ kpiConfiguration, dashboardData, index, loadChart, setKpis }) {
  const [kpiConfig, setKpiConfig] = useState(undefined);
  const isMounted = useRef(false);


  useEffect(() => {
    isMounted.current = true;

    setKpiConfig({...kpiConfiguration});

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(kpiConfiguration)]);

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
          <Col xl={6} md={12} className="p-2">
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
          <Col xl={6} md={12} className="p-2">
            <SonarReliabilityRemediationEffortAggTrendLineChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
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
            <LegacySonarRatingMetrics
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-ratings-v2":
        return (
          <Col md={12} className="p-2">
            <SonarRatingMetrics
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
          <Col md={12} className="p-2">
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
      case "all-github-actions-data-block":
        return(
          <Col md={12} className="p-2">
            <AllGithubActionsDataBlock
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "sonar-unit-testing":
        return (
          <Col xl={6} md={12} className="p-2">
            <ProjectWiseUnitTestResults
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
            <FirstPassYieldMetrics
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
            <CumulativeOpenDefectsMetric
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      case "automation-percentage":
        console.log(kpiConfig,' ** index',dashboardData);
        return (
          <Col md={12} className="p-2">
            <AutomationPercentageMetric
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
            {/*<AdoptionTestPercentageMetricV1*/}
            {/*  kpiConfiguration={kpiConfig}*/}
            {/*  setKpiConfiguration={setKpiConfig}*/}
            {/*  dashboardData={dashboardData}*/}
            {/*  setKpis={setKpis}*/}
            {/*  index={index}*/}
            {/*/>*/}
            <AutomatedTestAdoptionRateMetric
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
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SALESFORCE_DURATION_BY_STAGE:
        return (
          <Col md={12} className="p-2">
            <SalesforceDurationByStageMetrics
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
            <SalesforceBackupsAndRollbacksMetrics
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
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SDLC_DURATION_STATISTICS:
        return (
          <Col xl={12} md={12} className="p-2">
            <SdlcDurationByStageMetrics
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
          <Col md={12} className="p-2">
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
          <Col md={12} className="p-2">
            <ServiceNowMeanTimeToAcknowledgeBarChart
              kpiConfiguration={kpiConfig}
              setKpiConfiguration={setKpiConfig}
              dashboardData={dashboardData}
              setKpis={setKpis}
              index={index}
            />
          </Col>
        );
      // case "servicenow-mean-time-between-failures":
      //   return (
      //     <Col xl={6} md={12} className="p-2">
      //       <ServiceNowMeanTimeBetweenFailuresBarChart
      //         kpiConfiguration={kpiConfig}
      //         setKpiConfiguration={setKpiConfig}
      //         dashboardData={dashboardData}
      //         setKpis={setKpis}
      //         index={index}
      //       />
      //     </Col>
      //   );
      case "defect-removal-efficiency":
        return (
          <Col md={12} className="p-2">
            <DefectRemovalEfficiencyMetrics
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
      case "build-deployment-statistics":
        return (
          <Col md={12} className="p-2">
            <OpseraBuildAndDeploymentStatistics
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

  if (kpiConfig == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Insights"} />);
  }

  // TODO: Chart container should be inside each chart component
  //  with loading passed in to allow chart to refresh while keeping existing data and also informing users it's updating.
  return getView();
}

ChartView.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  loadChart: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ChartView;
