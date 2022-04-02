// TODO: Please keep aligned with node's version (if we add one, keep alphabetized, and remove inaccurate identifiers
export const kpiIdentifierConstants = {};

kpiIdentifierConstants.KPI_IDENTIFIERS = {
  ADOPTION_PERCENTAGE: "adoption-percentage",

  // Github Actions
  ALL_GITHUB_ACTIONS_DATA_BLOCK: "all-github-actions-data-block",

  ANCHORE_VULNERABILITIES_BY_DATE: "anchore-vulnerabilities-by-date",
  AUTOMATED_TEST_RESULTS: "automated-test-results",
  AUTOMATION_PERCENTAGE: "automation-percentage",

  // Bitbucket
  BITBUCKET_COMMITS_BY_AUTHOR: "bitbucket-commits-by-author",
  BITBUCKET_MERGE_REQUESTS_BY_MAXIMUM_TIME: "bitbucket-merge-request-by-maximum-time",
  BITBUCKET_MERGE_REQUESTS_BY_USER: "bitbucket-merge-requests-by-user",
  BITBUCKET_MERGE_REQUESTS_PUSHES_AND_COMMENTSS: "bitbucket-merge-requests-pushes-and-comments",
  BITBUCKET_MOST_ACTIVE_CONTRIBUTORS: "bitbucket-most-active-contributors",
  BITBUCKET_PENDING_MERGE_REQUESTS: "bitbucket-pending-merge-requests",
  BITBUCKET_RECENT_MERGE_REQUESTS: "bitbucket-recent-merge-requests",
  BITBUCKET_REJECTED_MERGE_REQUESTS: "bitbucket-rejected-merge-requests",
  BITBUCKET_TIME_TAKEN_TO_COMPLETE_MERGE_REQUEST_REVIEW: "bitbucket-time-taken-to-complete-merge-request-review",
  BITBUCKET_TOTAL_COMMITS_BY_PROJECT: "bitbucket-total-commits-by-project",

  BUILD_DEPLOYMENT_STATISTICS: "build-deployment-statistics",
  CUMULATIVE_OPEN_DEFECTS: "cumulative-open-defects",
  CYPRESS_TEST_RESULTS: "cypress-test-results",
  DEFECT_REMOVAL_EFFICIENCY: "defect-removal-efficiency",
  FIRST_PASS_YIELD: "first-pass-yield",

  // Github
  GITHUB_COMMITS_BY_AUTHOR: "github-commits-by-author",
  GITHUB_MERGE_REQUESTS_BY_USER: "github-merge-requests-by-user",
  GITHUB_MERGE_REQUESTS_PUSHES_AND_COMMENTS: "github-merge-requests-pushes-and-comments",
  GITHUB_MOST_ACTIVE_CONTRIBUTORS: "github-most-active-contributors",
  GITHUB_PENDING_MERGE_REQUESTS: "github-pending-merge-requests",
  GITHUB_RECENT_MERGE_REQUESTS: "github-recent-merge-requests",
  GITHUB_TIME_TAKEN_TO_COMPLETE_MERGE_REQUEST_REVIEW: "github-time-taken-to-complete-merge-request-review",
  GITHUB_TOTAL_COMMITS_BY_PROJECT: "github-total-commits-by-project",

  // Gitlab
  GITLAB_COMMITS_BY_AUTHOR: "gitlab-commits-by-author",
  GITLAB_MERGE_REQUESTS_BY_MAXIMUM_TIME: "gitlab-merge-request-by-maximum-time",
  GITLAB_MERGE_REQUESTS_BY_USER: "gitlab-merge-requests-by-user",
  GITLAB_MERGE_REQUESTS_PUSHES_AND_COMMENTS: "gitlab-merge-requests-pushes-and-comments",
  GITLAB_MOST_ACTIVE_CONTRIBUTOR: "gitlab-most-active-contributors",
  GITLAB_PENDING_MERGE_REQUESTS: "gitlab-pending-merge-requests",
  GITLAB_RECENT_MERGE_REQUESTS: "gitlab-recent-merge-requests",
  GITLAB_TIME_TAKEN_TO_COMPLETE_MERGE_REQUEST_REVIEW: "gitlab-time-taken-to-complete-merge-request-review",
  GITLAB_TOTAL_COMMITS_BY_PROJECT: "gitlab-total-commits-by-project",

  // Jenkins
  JENKINS_BUILD_DURATION: "jenkins-build-duration",
  JENKINS_BUILDS_BY_USER: "jenkins-builds-by-user",
  JENKINS_CHANGE_FAILURE_RATE: "jenkins-change-failure-rate",
  JENKINS_DEPLOYMENT_FREQUENCY: "jenkins-deployment-frequency",
  JENKINS_DEPLOYMENT_COUNTS: "jenkins-deployments-counts",
  JENKINS_RECENT_BUILD_STATUS: "jenkins-recent-build-status",
  JENKINS_STATUS_BY_JOB_NAME: "jenkins-status-by-job-name",

  // Jira
  JIRA_HEALTH_BY_SPRINT: "jira-health-by-sprint",
  JIRA_ISSUES_ASSIGNED_TO_ME: "jira-issues-assigned-to-me",
  JIRA_ISSUES_BY_PRIORITY: "jira-issues-by-priority",
  JIRA_ISSUES_CREATED_VS_RESOLVED: "jira-issues-created-vs-resolved",
  JIRA_LEAD_TIME: "jira-lead-time",
  JIRA_SPRINT_BURNDOWN: "jira-sprint-burndown",
  JIRA_TICKETS_ASSIGNED_BY_USER: "jira-tickets-assigned-by-user",
  JIRA_VELOCITY_REPORT: "jira-velocity-report",

  // JMeter
  JMETER_CONNECT_TIME: "jmeter-connect-time",
  JMETER_ERRORS: "jmeter-errors",
  JMETER_HITS: "jmeter-hits",
  JMETER_RESPONSE_TIME: "jmeter-response-time",
  JMETER_THROUGHPUT: "jmeter-throughput",

  // JUnit
  JUNIT_TEST_RESULTS: "junit-test-results",

  // Metricbeat
  METRICBEAT_KUBERNETES_CPU_USAGE: "metricbeat-kubernetes-cpu-usage",
  METRICBEAT_KUBERNETES_IN_NETWORK_USAGE: "metricbeat-kubernetes-in-network-usage",
  METRICBEAT_KUBERNETES_MEMORY_USAGE: "metricbeat-kubernetes-memory-usage",
  METRICBEAT_KUBERNETES_OUT_NETWORK_USAGE: "metricbeat-kubernetes-out-network-usage",

  // Opsera
  OPSERA_DEPLOYMENT_FREQUENCY: "opsera-deployment-frequency",
  OPSERA_DEPLOYMENT_FREQUENCY_STATS: "opsera-deployment-frequency-stats",
  OPSERA_DURATION_BY_STAGE: "opsera-duration-by-stage",
  OPSERA_MEAN_TIME_TO_RESTORE: "opsera-mean-time-to-restore",
  OPSERA_NEXUS_PIPELINE_STEP_INFO: "opsera-nexus-pipeline-step-info",
  OPSERA_PIPELINE_DURATION: "opsera-pipeline-duration",
  OPSERA_PIPELINES_BY_USER: "opsera-pipelines-by-user",
  OPSERA_RECENT_CD_STATUS: "opsera-recent-cd-status",
  OPSERA_RECENT_PIPELINE_STATUS: "opsera-recent-pipeline-status",
  OPSERA_STATUS_BY_PIPELINE: "opsera-status-by-pipeline",

  QA_MANUAL_TEST: "qa-manual-test",

  SALESFORCE_DURATION_BY_STAGE: "salesforce-duration-by-stage",
  SDLC_DURATION_STATISTICS: "sdlc-duration-statistics",

  // Selenium
  SELENIUM_TEST_RESULTS: "selenium-test-results",
  SELENIUM_TEST_SUMMARY_PERCENTAGES: "selenium-test-summary-percentages",

  // Service Now
  SERVICE_NOW_MEAN_TIME_TO_ACKNOWLEDGE: "servicenow-mean-time-to-acknowledge",
  SERVICE_NOW_MEAN_TIME_TO_RESOLUTION: "servicenow-mean-time-to-resolution",

  // Salesforce
  SALESFORCE_BACKUPS: "sfdc-backups",
  SALESFORCE_MANUAL_TEST: "sfdc-manual-test",
  SALESFORCE_PROFILE_MIGRATIONS: "sfdc-profile-migrations",
  SALESFORCE_UNIT_TESTING: "sfdc-unit-testing",

  // Sonar
  SONAR_BUGS: "sonar-bugs",
  SONAR_BUGS_METRICS_SCORECARD: "sonar-bugs-metric-scorecard",
  SONAR_CODE_COVERAGE: "sonar-code-coverage",
  SONAR_CODE_SMELLS: "sonar-code-smells",
  SONAR_CODE_SMELLS_BY_PROJECT: "sonar-code-smells-by-project",
  SONAR_CODE_SMELLS_METRIC_SCORECARD: "sonar-codesmells-metric-scorecard",
  SONAR_LINES_TO_COVER: "sonar-lines-to-cover",
  SONAR_MAINTAINABILITY_RATING: "sonar-maintainability-rating",
  SONAR_NEW_BUGS: "sonar-new-bugs",
  SONAR_NEW_TECHNICAL_DEBT_BY_PROJECT: "sonar-new-technical-debt-by-project",
  SONAR_NEW_VULNERABILITIES_BY_PROJECT: "sonar-new-vulnerabilities-by-project",
  SONAR_RATINGS_LEGACY: "sonar-ratings",
  SONAR_RATINGS: "sonar-ratings-v2",
  SONAR_RELIABILITY_RATING: "sonar-reliability-rating",
  SONAR_RELIABILITY_REMEDIATION_EFFORT: "sonar-reliability-remediation-effort",
  SONAR_RELIABILITY_REMEDIATION_EFFORT_BY_PROJECT: "sonar-reliability-remediation-effort-by-project",
  SONAR_SECURITY_SCORECARD: "sonar-security-scorecard",
  SONAR_VULNERABILITIES_BY_PROJECT: "sonar-vulnerabilities-by-project",
  SONAR_VULNERABILITIES_METRIC_SCORECARD: "sonar-vulnerabilities-metric-scorecard",

  // XUnit
  XUNIT_TEST_RESULTS: "xunit-test-results",

  // GitScrapper
  GIT_SCRAPPER_METRICS: "git-scrapper-metrics",
};