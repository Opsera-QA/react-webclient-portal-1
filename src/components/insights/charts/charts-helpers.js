import { addDays } from "date-fns";
import { faChartBar } from "@fortawesome/pro-light-svg-icons";

export function getDateObjectFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")]?.value) {
    return {
      start: kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.startDate,
      end: addDays(
        new Date(
          kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.endDate
        ),
        1
      ).toISOString(),
    };
  }
  return {
    start: new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    end: addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
  };
}

export function getUseKpiTagsFromKpiConfiguration(kpiConfiguration) {
  return kpiConfiguration?.settings?.useKpiTags !== false;
}

export function getUseDashboardTagsFromKpiConfiguration(kpiConfiguration) {
  return kpiConfiguration?.settings?.useDashboardTags !== false;
}

export function getResultFromKpiConfiguration(kpiConfiguration , filter) {
  if (
      typeof(filter) === 'string' &&
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === filter)]?.value &&
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === filter)]?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === filter)].value;
  }
  return null;
}

export function getTagsFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "tags");
}

export function getJenkinsResultFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jenkins-result");

}

export function getJenkinsJobUrlFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jenkins-job-url");
}

export function getJenkinsBuildNumberFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jenkins-build-number");
}

export function getJiraIssueTypeFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jira-issue-type");
}

export function getJiraIssueComponentsFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jira-issue-components");
}

export function getJiraIssueLabelsFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jira-issue-labels");
}

export function getJiraIssueStatusFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jira-issue-status");
}

export function getJiraIssueStartStatusFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jira-issue-start-status");
}

export function getJiraIssueDoneStatusFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "jira-issue-done-status");
}

export function getSonarProjectKeyFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "sonar-project-key");
}

export function getDomainFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "domain");
}

export function getApplicationFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "application");
}

export function getReleaseFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "release");
}

export function getSprintFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "sprint");
}

export function getProjectFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "project");
}

export function getSeleniumTestSuitesFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "selenium-test-suites");
}

export function getSonarProjectLanguagesFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "sonar-project-languages");
}

export function getDeploymentStageFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "deployment-stage");
}

export function getGitlabProjectFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "gitlab-project");
}

export function getServiceNowPrioritiesFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "servicenow-priorities");
}

export function getJiraPrioritiesFromKpiConfiguration(kpiConfiguration) {
  if (
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-priorities")]
          ?.value &&
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-priorities")]?.value
          .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-priorities")]
        .value;
  }
  return null;
}

export function getJiraProjectsFromKpiConfiguration(kpiConfiguration) {
  if (
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-projects")]
          ?.value &&
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-projects")]?.value
          .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-projects")]
        .value;
  }
  return null;
}

export function getServiceNowToolsFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "servicenow-tools");
}

export function getServiceNowAssignmentGroupsFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "servicenow-assignment-groups");
}

export function getServiceNowServiceOfferingsFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "servicenow-service-offerings");
}

export function getServiceNowConfigurationItemsFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "servicenow-configuration-items");
}

export function getServiceNowBusinessServicesFromKpiConfiguration(kpiConfiguration) {
  return getResultFromKpiConfiguration( kpiConfiguration, "servicenow-business-services");
}

export function getHierarchyFiltersFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "hierarchyFilters")]
      ?.value
  ) {
    return kpiConfiguration.filters[
      kpiConfiguration.filters.findIndex((obj) => obj.type === "hierarchyFilters")
    ].value;
  }
  return null;
}

export function getChartIconFromKpiConfiguration(kpiConfiguration) {
  return faChartBar;
}
