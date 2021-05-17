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
    start: addDays(new Date(), -90).toISOString(),
    end: new Date().toISOString(),
  };
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

export function getChartIconFromKpiConfiguration(kpiConfiguration) {
  return faChartBar;
}
