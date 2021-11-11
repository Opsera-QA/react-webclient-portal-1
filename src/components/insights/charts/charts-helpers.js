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
    end: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
  };
}

export function getUseKpiTagsFromKpiConfiguration(kpiConfiguration) {
  return kpiConfiguration?.settings?.useKpiTags !== false;
}

export function getUseDashboardTagsFromKpiConfiguration(kpiConfiguration) {
  return kpiConfiguration?.settings?.useDashboardTags !== false;
}

export function getTagsFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")]?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")].value;
  }
  return null;
}

export function getJenkinsResultFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-result")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-result")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-result")].value;
  }
  return null;
}

export function getJenkinsJobUrlFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-job-url")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-job-url")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-job-url")].value;
  }
  return null;
}

export function getJenkinsBuildNumberFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-build-number")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-build-number")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-build-number")]
      .value;
  }
  return null;
}

export function getJiraIssueTypeFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-type")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-type")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-type")].value;
  }
  return null;
}

export function getJiraIssueComponentsFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-components")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-components")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-components")]
      .value;
  }
  return null;
}

export function getJiraIssueLabelsFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-labels")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-labels")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-labels")]
      .value;
  }
  return null;
}

export function getJiraIssueStatusFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-status")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-status")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-status")]
      .value;
  }
  return null;
}

export function getJiraIssueStartStatusFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-start-status")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-start-status")]
      ?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-start-status")]
      .value;
  }
  return null;
}

export function getJiraIssueDoneStatusFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-done-status")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-done-status")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-done-status")]
      .value;
  }
  return null;
}

export function getSonarProjectKeyFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sonar-project-key")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sonar-project-key")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sonar-project-key")]
      .value;
  }
  return null;
}

export function getDomainFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "domain")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "domain")]?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "domain")].value;
  }
  return null;
}

export function getApplicationFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "application")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "application")]?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "application")].value;
  }
  return null;
}

export function getReleaseFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "release")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "release")]?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "release")].value;
  }
  return null;
}

export function getSprintFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sprint")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sprint")]?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sprint")].value;
  }
  return null;
}

export function getProjectFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "project")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "project")]?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "project")].value;
  }
  return null;
}

export function getSeleniumTestSuitesFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "selenium-test-suites")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "selenium-test-suites")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "selenium-test-suites")]
      .value;
  }
  return null;
}

export function getSonarProjectLanguagesFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sonar-project-languages")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sonar-project-languages")]
      ?.value.length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "sonar-project-languages")]
      .value;
  }
  return null;
}

export function getServiceNowPrioritiesFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-priorities")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-priorities")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-priorities")]
      .value;
  }
  return null;
}

export function getServiceNowToolsFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-tools")]?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-tools")]?.value
      .length > 0
  ) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-tools")].value;
  }
  return null;
}

export function getServiceNowAssignmentGroupsFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-assignment-groups")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-assignment-groups")]
      ?.value.length > 0
  ) {
    return kpiConfiguration.filters[
      kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-assignment-groups")
    ].value;
  }
  return null;
}

export function getServiceNowServiceOfferingsFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-service-offerings")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-service-offerings")]
      ?.value.length > 0
  ) {
    return kpiConfiguration.filters[
      kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-service-offerings")
    ].value;
  }
  return null;
}

export function getServiceNowConfigurationItemsFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[
      kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-configuration-items")
    ]?.value &&
    kpiConfiguration?.filters[
      kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-configuration-items")
    ]?.value.length > 0
  ) {
    return kpiConfiguration.filters[
      kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-configuration-items")
    ].value;
  }
  return null;
}

export function getServiceNowBusinessServicesFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-business-services")]
      ?.value &&
    kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-business-services")]
      ?.value.length > 0
  ) {
    return kpiConfiguration.filters[
      kpiConfiguration.filters.findIndex((obj) => obj.type === "servicenow-business-services")
    ].value;
  }
  return null;
}

export function getChartIconFromKpiConfiguration(kpiConfiguration) {
  return faChartBar;
}
