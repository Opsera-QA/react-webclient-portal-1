import { addDays } from "date-fns";
import { faChartBar } from "@fortawesome/pro-light-svg-icons";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {METRIC_QUALITY_LEVELS} from "../../common/metrics/text/MetricTextBase";

export function getDateObjectFromKpiConfiguration(kpiConfiguration) {
  const date = kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")]?.value;
  if(date?.label) {
    const dateRange = getDatesFromLabel(date?.label);
    return {
      label: date?.label,
      start: dateRange.startDate,
      end: dateRange.endDate
    };
  } else if (date) {
    return {
      start: date.startDate,
      end: addDays(
        new Date(
          date.endDate
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

export function getDatesFromLabel(label) {
  switch (label) {
    case 'Last 24 Hours':
      return {
        startDate: new Date(addDays(new Date(), -1)),
        endDate: new Date(),
      };
    case 'Last Week':
      return {
        startDate: new Date(addDays(new Date(), -7)),
        endDate: new Date(),
      };
    case 'Last Month':
      return {
        startDate: new Date(addDays(new Date(), -30)),
        endDate: new Date(),
      };
    case 'Last 3 Months':
      return {
        startDate: new Date(addDays(new Date(), -90)),
        endDate: new Date(),
      };
    case 'Last 6 Months':
      return {
        startDate: new Date(addDays(new Date(), -180)),
        endDate: new Date(),
      };
    case 'Last 1 Year':
      return {
        startDate: new Date(addDays(new Date(), -365)),
        endDate: new Date(),
      };
    default:
      return {
        startDate: new Date(addDays(new Date(), -90)),
        endDate: new Date(),
      };
  }
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

export function getJiraChangeTypesFromKpiConfiguration(kpiConfiguration) {
  if (
    kpiConfiguration?.filters[
      kpiConfiguration.filters.findIndex(
        (obj) => obj.type === "jira-change-types",
      )
    ]?.value &&
    kpiConfiguration?.filters[
      kpiConfiguration.filters.findIndex(
        (obj) => obj.type === "jira-change-types",
      )
    ]?.value.length > 0
  ) {
    return kpiConfiguration.filters[
      kpiConfiguration.filters.findIndex(
        (obj) => obj.type === "jira-change-types",
      )
    ].value;
  }
  return null;
}

/*
* This method is to calculate the trend and decide the color of the icon.
* @param currentValue Value of selected date range
* @param previousValue Value of date range before the selected date range.
* Returns the classname for trend
*/
export const getTrend = (currentValue, previousValue) => {
  currentValue = !isNaN(currentValue)? parseFloat(currentValue) : 0;
  previousValue = !isNaN(previousValue)? parseFloat(previousValue) : 0;

  let trend = "";
  if(currentValue > previousValue){
    trend = "green";
  }
  else if(currentValue === previousValue){
    trend = "light-gray-text-secondary";
  }
  else if(currentValue < previousValue){
    trend = "red";
  }
  else{ trend = "black";}
  return trend;
};

export const getReverseTrend = (currentValue, previousValue) => {
  currentValue = !isNaN(currentValue)? parseFloat(currentValue) : 0;
  previousValue = !isNaN(previousValue)? parseFloat(previousValue) : 0;

  let trend = "";
  if(currentValue > previousValue){
    trend = "red";
  }
  else if(currentValue === previousValue){
    trend = "light-gray-text-secondary";
  }
  else if(currentValue < previousValue){
    trend = "green";
  }
  else{ trend = "black";}
  return trend;
};


/*
* This method is to get the icon according to the severity.
* @param severity Value of trend
* Returns the icon
*/

export const getReverseTrendIcon = (severity) => {
  switch (severity) {
    case "red":
      return faArrowCircleUp;
    case "green":
      return faArrowCircleDown;
    case "light-gray-text-secondary":
      return faMinusCircle;
    default:
      break;
  }
};

export const getTrendIcon = (severity) => {
  switch (severity) {
    case "red":
      return faArrowCircleDown;
    case "green":
      return faArrowCircleUp;
    case "light-gray-text-secondary":
      return faMinusCircle;
    default:
      break;
  }
};

/*
* Converts minutes in to Days Hours Minutes
* @param mins Minutes
* Returns the string in D Days H hours M minutes format
*/

export const getTimeDisplay = (mins) => {
  const seconds = Number(mins * 60);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const arrayToDisplay = [];
  if (days > 0) {
    arrayToDisplay.push(days + (days === 1 ? " day" : " days"));
  }
  if (hours > 0) {
    arrayToDisplay.push(hours + (hours === 1 ? " hr" : " hrs"));
  }
  if (minutes > 0) {
    arrayToDisplay.push(minutes + (minutes === 1 ? " min" : " min"));
  }
  if (remainingSeconds > 0) {
    arrayToDisplay.push(remainingSeconds + (remainingSeconds === 1 ? " sec" : " sec"));
  }
  if (arrayToDisplay.length === 0) {
    return "0 sec";
  }
  return [arrayToDisplay.slice(0, 2).join(", "),arrayToDisplay.join(", ")];
};


/**
 * Get score text for given value
 * @param maturityScore string
 * @returns Returns score text.
 */
export const getMaturityScoreText = (maturityScore) => {
  switch (maturityScore) {
    case `elite`:
      return "Elite";
    case `high`:
      return "High";
    case `medium`:
      return "Medium";
    case `low`:
      return "Low";
    default:
      return "NA";
  }
};

/**
 * Get css class from maturityScore
 * @param maturityScore string
 * @returns Returns css class name
 */
export const getMaturityColorClass = (maturityScore) => {
  switch (maturityScore) {
    case `elite`:
      return "maturity-card-elite-color";
    case `high`:
      return "maturity-card-high-color";
    case `medium`:
      return "maturity-card-medium-color";
    case `low`:
      return "maturity-card-low-color";
    default:
      return "maturity-card-default-color";
  }
};

/**
 * Get css class from strategic criteria color class
 * @param qualityLevel string
 * @returns Returns css class name
 */
export const getQualityBasedClassName = (qualityLevel) => {
  switch (qualityLevel) {
    case METRIC_QUALITY_LEVELS.SUCCESS:
      return "green";
    case METRIC_QUALITY_LEVELS.WARNING:
      return "yellow";
    case METRIC_QUALITY_LEVELS.DANGER:
      return "danger-red";
    default:
      return '';
  }
};

/**
 * Get given milliseconds as days
 * @param milliseconds string
 * @returns number
 */
export const convertMStoDays = (milliseconds) => {
  return milliseconds/(1000*3600*24);
};

/**
 * Get given milliseconds as hours
 * @param milliseconds string
 * @returns number
 */
export const convertMStoHours = (milliseconds) => {
  return milliseconds/(1000*3600);
};

export function getCustomMappingFields(kpiConfiguration) {
  if (kpiConfiguration?.dataPoints && kpiConfiguration?.dataPoints?.length > 0 && kpiConfiguration?.dataPoints.filter((point) => point?.customFieldsMapping?.enabled && point?.customFieldsMapping?.mappedFields).length > 0) {
    let customFields = {};
    kpiConfiguration?.dataPoints.forEach((point) => {
      if (point?.customFieldsMapping?.enabled && point?.customFieldsMapping?.mappedFields) {
        customFields = {...customFields, ...point?.customFieldsMapping?.mappedFields};
      }
    });
    return customFields;
  }
  return null;
}
