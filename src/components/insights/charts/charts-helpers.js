import {addDays} from "date-fns";
import {faChartBar} from "@fortawesome/pro-light-svg-icons";

export function getDateObjectFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")]?.value) {
    return ({
      "start": kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.startDate,
      "end": addDays(new Date(kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.endDate), 1).toISOString()
    });
  }
  return ({
    "start": addDays(new Date(), -90).toISOString(),
    "end": new Date().toISOString()
  });
}

export function getTagsFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")].value;
  }
  return null;
}

export function getJenkinsResultFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-result")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-result")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-result")].value;
  }
  return null;
}

export function getJenkinsJobUrlFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-job-url")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-job-url")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-job-url")].value;
  }
  return null;
}

export function getJenkinsBuildNumberFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-build-number")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-build-number")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jenkins-build-number")].value;
  }
  return null;
}

export function getJiraIssueTypeFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-type")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-type")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-type")].value;
  }
  return null;
}

export function getJiraIssueStartStatusFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-start-status")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-start-status")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-start-status")].value;
  }
  return null;
}

export function getJiraIssueDoneStatusFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-done-status")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-done-status")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "jira-issue-done-status")].value;
  }
  return null;
}

export function getChartIconFromKpiConfiguration(kpiConfiguration) {
  return faChartBar;
}