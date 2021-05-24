import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import DateRangeInput from "components/common/inputs/date/DateRangeInput";
import kpiConfigurationMetadata from "components/insights/marketplace/charts/kpi-configuration-metadata";
import {
  kpiDateFilterMetadata,
  kpiTagsFilterMetadata,
  kpiJenkinsResultFilterMetadata,
  kpiJenkinsJobUrlFilterMetadata,
  kpiJenkinsBuildNumberFilterMetadata,
  kpiJiraIssueTypeFilterMetadata,
  kpiJiraIssueStartStatusFilterMetadata,
  kpiJiraIssueDoneStatusFilterMetadata,
  kpiSonarProjectKeyFilterMetadata,
  kpiDomainFilterMetadata,
  kpiApplicationFilterMetadata,
  kpiSprintFilterMetadata,
  kpiReleaseFilterMetadata,
  kpiProjectFilterMetadata,
  kpiSeleniumTestSuitesFilterMetadata,
} from "components/insights/marketplace/charts/kpi-configuration-metadata";
import Model from "core/data_model/model";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TagManager from "components/common/inputs/tags/TagManager";
import JenkinsResultFilterInput from "components/common/list_of_values_input/insights/charts/jenkins/JenkinsResultFilterInput";
import ManualKpiMultiSelectInputBase from "components/common/list_of_values_input/settings/analytics/ManualKpiMultiSelectInputBase";
import SeleniumTestSuitesMultiSelectInput from "components/common/list_of_values_input/insights/charts/selenium/SeleniumTestSuitesMultiSelectInput";
import modelHelpers from "components/common/model/modelHelpers";

function KpiSettingsForm({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setView, loadChart, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [kpiSettings, setKpiSettings] = useState(new Model(kpiConfiguration, kpiConfigurationMetadata, false));
  const [kpiDateFilter, setKpiDateFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "date", kpiDateFilterMetadata)
  );
  const [kpiTagsFilter, setKpiTagsFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "tags", kpiTagsFilterMetadata)
  );
  const [kpiJenkinsResultFilter, setKpiJenkinsResultFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "jenkins-result", kpiJenkinsResultFilterMetadata)
  );
  const [kpiJenkinsJobUrlFilter, setKpiJenkinsJobUrlFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "jenkins-job-url", kpiJenkinsJobUrlFilterMetadata)
  );
  const [kpiJenkinsBuildNumberFilter, setKpiJenkinsBuildNumberFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "jenkins-build-number", kpiJenkinsBuildNumberFilterMetadata)
  );
  const [kpiJiraIssueTypeFilter, setKpiJiraIssueTypeFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "jira-issue-type", kpiJiraIssueTypeFilterMetadata)
  );
  const [kpiJiraIssueStartStatusFilter, setKpiJiraIssueStartStatusFilter] = useState(
    modelHelpers.getDashboardFilterModel(
      kpiConfiguration,
      "jira-issue-start-status",
      kpiJiraIssueStartStatusFilterMetadata
    )
  );
  const [kpiJiraIssueDoneStatusFilter, setKpiJiraIssueDoneStatusFilter] = useState(
    modelHelpers.getDashboardFilterModel(
      kpiConfiguration,
      "jira-issue-done-status",
      kpiJiraIssueDoneStatusFilterMetadata
    )
  );
  const [kpiSonarProjectKeyFilter, setKpiSonarProjectKeyFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "sonar-project-key", kpiSonarProjectKeyFilterMetadata)
  );
  const [kpiDomainFilter, setKpiDomainFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "domain", kpiDomainFilterMetadata)
  );
  const [kpiApplicationFilter, setKpiApplicationFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "application", kpiApplicationFilterMetadata)
  );
  const [kpiReleaseFilter, setKpiReleaseFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "release", kpiReleaseFilterMetadata)
  );
  const [kpiSprintFilter, setKpiSprintFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "sprint", kpiSprintFilterMetadata)
  );
  const [kpiSeleniumTestSuitesFilter, setKpiSeleniumTestSuitesFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "selenium-test-suites", kpiSeleniumTestSuitesFilterMetadata)
  );
  const [kpiProjectFilter, setKpiProjectFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "project", kpiProjectFilterMetadata)
  );

  const tagFilterEnabled = [
    "opsera-pipeline-duration",
    "opsera-pipelines-by-user",
    "opsera-deployment-frequency",
    "opsera-recent-pipeline-status",
    "opsera-status-by-pipeline",
    "opsera-recent-cd-status",
    "opsera-deployment-frequency-stats",
    "opsera-duration-by-stage",
    "jenkins-builds-by-user",
    "jenkins-build-duration",
    "jenkins-status-by-job-name",
    "jenkins-recent-build-status",
    "sonar-code-smells",
    "sonar-maintainability-rating",
    "sonar-bugs",
    "sonar-new-bugs",
    "sonar-reliability-rating",
    "sonar-reliability-remediation-effort",
    "sonar-vulnerabilities-by-project",
    "sonar-new-vulnerabilities-by-project",
    "sonar-new-technical-debt-by-project",
    "sonar-code-smells-by-project",
    "sonar-code-coverage",
    "sonar-lines-to-cover",
    "jira-tickets-assigned-by-user",
    "jira-issues-created-vs-resolved",
    "jira-velocity-report",
    "jira-sprint-burndown",
    "jira-health-by-sprint",
    "jira-issues-by-priority",
    "jira-issues-assigned-to-me",
    "gitlab-merge-request-by-maximum-time",
    "gitlab-merge-requests-by-user",
    "gitlab-time-taken-to-complete-merge-request-review",
    "gitlab-merge-requests-pushes-and-comments",
    "gitlab-total-commits-by-project",
    "gitlab-commits-by-author",
    "gitlab-recent-merge-requests",
    "gitlab-most-active-contributors",
    "gitlab-pending-merge-requests",
    "cypress-test-results",
    "junit-test-results",
    "xunit-test-results",
    "jmeter-hits",
    "jmeter-errors",
    "jmeter-throughput",
    "jmeter-response-time",
    "jmeter-connect-time",
    "anchore-vulnerability-severity-by-package",
    "anchore-vulnerabilities-by-date",
    "github-merge-request-by-maximum-time",
    "github-merge-requests-by-user",
    "github-time-taken-to-complete-merge-request-review",
    "github-merge-requests-pushes-and-comments",
    "github-total-commits-by-project",
    "github-commits-by-author",
    "github-recent-merge-requests",
    "github-most-active-contributors",
    "github-pending-merge-requests",
    "sonar-ratings",
    "jira-lead-time",
    "bitbucket-merge-request-by-maximum-time",
    "bitbucket-merge-requests-by-user",
    "bitbucket-time-taken-to-complete-merge-request-review",
    "bitbucket-merge-requests-pushes-and-comments",
    "bitbucket-total-commits-by-project",
    "bitbucket-commits-by-author",
    "bitbucket-recent-merge-requests",
    "bitbucket-most-active-contributors",
    "bitbucket-pending-merge-requests",
    "bitbucket-rejected-merge-requests",
    "opsera-mean-time-to-restore",
    "opsera-nexus-pipeline-step-info",
    "qa-manual-test",
    "selenium-test-results",
    "sonar-reliability-remediation-effort-by-project",
    "first-pass-yield",
    "cumulative-open-defects",
    "automation-percentage",
    "adoption-percentage",
    "sfdc-backups",
    "sfdc-profile-migrations",
    "sfdc-unit-testing",
    "sonar-security-scorecard",
    "selenium-test-summary-percentages",
  ];

  const getKpiFilters = (filter) => {
    switch (filter.type) {
      case "date":
        return (
          <div>
            <DateRangeInput dataObject={kpiDateFilter} setDataObject={setKpiDateFilter} fieldName={"value"} />
          </div>
        );
      case "tags":
        return (
          <div>
            <TagManager
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiTagsFilter}
              dataObject={kpiTagsFilter}
              disabled={!tagFilterEnabled.includes(kpiSettings.getData("kpi_identifier"))}
            />
          </div>
        );
      case "jenkins-result":
        return (
          <div>
            <JenkinsResultFilterInput
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiJenkinsResultFilter}
              dataObject={kpiJenkinsResultFilter}
            />
          </div>
        );
      case "jenkins-job-url":
        return (
          <div>
            <TextInputBase
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiJenkinsJobUrlFilter}
              dataObject={kpiJenkinsJobUrlFilter}
            />
          </div>
        );
      case "jenkins-build-number":
        return (
          <div>
            <MultiTextInputBase
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiJenkinsBuildNumberFilter}
              dataObject={kpiJenkinsBuildNumberFilter}
            />
          </div>
        );
      case "jira-issue-type":
        return (
          <div>
            <MultiTextInputBase
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiJiraIssueTypeFilter}
              dataObject={kpiJiraIssueTypeFilter}
            />
          </div>
        );
      case "jira-issue-start-status":
        return (
          <div>
            <MultiTextInputBase
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiJiraIssueStartStatusFilter}
              dataObject={kpiJiraIssueStartStatusFilter}
            />
          </div>
        );
      case "jira-issue-done-status":
        return (
          <div>
            <MultiTextInputBase
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiJiraIssueDoneStatusFilter}
              dataObject={kpiJiraIssueDoneStatusFilter}
            />
          </div>
        );
      case "sonar-project-key":
        return (
          <div>
            <MultiTextInputBase
              type={"kpi_filter"}
              fieldName={"value"}
              setDataObject={setKpiSonarProjectKeyFilter}
              dataObject={kpiSonarProjectKeyFilter}
            />
          </div>
        );
      case "domain":
        return (
          <div>
            <ManualKpiMultiSelectInputBase
              type={"domain"}
              fieldName={"value"}
              setDataObject={setKpiDomainFilter}
              dataObject={kpiDomainFilter}
            />
          </div>
        );
      case "project":
        return (
          <div>
            <ManualKpiMultiSelectInputBase
              type={"project"}
              fieldName={"value"}
              setDataObject={setKpiProjectFilter}
              dataObject={kpiProjectFilter}
            />
          </div>
        );
      case "application":
        return (
          <div>
            <ManualKpiMultiSelectInputBase
              type={"application"}
              fieldName={"value"}
              setDataObject={setKpiApplicationFilter}
              dataObject={kpiApplicationFilter}
            />
          </div>
        );
      case "release":
        return (
          <div>
            <ManualKpiMultiSelectInputBase
              type={"release"}
              fieldName={"value"}
              setDataObject={setKpiReleaseFilter}
              dataObject={kpiReleaseFilter}
            />
          </div>
        );
      case "sprint":
        return (
          <div>
            <ManualKpiMultiSelectInputBase
              type={"sprint"}
              fieldName={"value"}
              setDataObject={setKpiSprintFilter}
              dataObject={kpiSprintFilter}
            />
          </div>
        );
      case "selenium-test-suites":
        return (
          <div>
            <SeleniumTestSuitesMultiSelectInput
              placeholderText={"Select Test Suites"}
              type={"kpi_filter"}
              fieldName={"value"}
              valueField={"value"}
              textField={"text"}
              setDataObject={setKpiSeleniumTestSuitesFilter}
              dataObject={kpiSeleniumTestSuitesFilter}
            />
          </div>
        );
    }
  };

  const saveKpiSettings = async () => {
    let newKpiSettings = kpiSettings;
    if (newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "date")]) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "date")
      ].value = kpiDateFilter.getData("value");
    }
    if (newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "tags")]) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "tags")
      ].value = kpiTagsFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jenkins-result")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jenkins-result")
      ].value = kpiJenkinsResultFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jenkins-job-url")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jenkins-job-url")
      ].value = kpiJenkinsJobUrlFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jenkins-build-number")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jenkins-build-number")
      ].value = kpiJenkinsBuildNumberFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jira-issue-type")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jira-issue-type")
      ].value = kpiJiraIssueTypeFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jira-issue-start-status")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jira-issue-start-status")
      ].value = kpiJiraIssueStartStatusFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jira-issue-done-status")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "jira-issue-done-status")
      ].value = kpiJiraIssueDoneStatusFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "sonar-project-key")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "sonar-project-key")
      ].value = kpiSonarProjectKeyFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "domain")]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "domain")
      ].value = kpiDomainFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "project")]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "project")
      ].value = kpiProjectFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "application")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "application")
      ].value = kpiApplicationFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "sprint")]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "sprint")
      ].value = kpiSprintFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "project")]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "project")
      ].value = kpiProjectFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "release")]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "release")
      ].value = kpiReleaseFilter.getData("value");
    }
    if (
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "selenium-test-suites")
      ]
    ) {
      newKpiSettings.getData("filters")[
        newKpiSettings.getData("filters").findIndex((obj) => obj.type === "selenium-test-suites")
      ].value = kpiSeleniumTestSuitesFilter.getData("value");
    }

    setKpiSettings({ ...newKpiSettings });
    dashboardData.getData("configuration")[index] = kpiSettings.data;
    setKpiConfiguration(kpiSettings.data);
    loadChart(dashboardData);
    setView("chart");
    return await dashboardsActions.update(dashboardData, getAccessToken);
  };

  const cancelKpiSettings = async () => {
    setKpiSettings(dashboardData.getData("configuration")[index]);
    setView("chart");
  };

  const deleteKpi = async () => {
    dashboardData.getData("configuration").splice(index, 1);
    setKpis(dashboardData.getData("configuration"));
    setView("chart");
    return await dashboardsActions.update(dashboardData, getAccessToken);
  };

  return (
    <>
      <EditorPanelContainer
        showRequiredFieldsMessage={false}
        handleClose={cancelKpiSettings}
        updateRecord={saveKpiSettings}
        recordDto={kpiSettings}
        lenient={true}
      >
        <TextInputBase fieldName={"kpi_name"} dataObject={kpiSettings} setDataObject={setKpiSettings} />
        {kpiSettings.getData("filters").map((filter, index) => (
          <div key={index}>{getKpiFilters(filter)}</div>
        ))}
      </EditorPanelContainer>
      <ActionBarDeleteButton2
        relocationPath={`/insights/dashboards/${dashboardData.getData("_id")}`}
        dataObject={kpiSettings}
        handleDelete={deleteKpi}
      />
    </>
  );
}

KpiSettingsForm.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setView: PropTypes.func,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadChart: PropTypes.func,
};

export default KpiSettingsForm;
