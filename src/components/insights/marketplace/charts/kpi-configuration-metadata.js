// TODO: Once all Metrics are updated, this should just be the KPI configuration metadata and metrics should have their own editor panels
const kpiConfigurationMetadata = {
  idProperty: "_id",
  type: "KPI",
  fields: [
    {
      label: "Name",
      id: "kpi_name",
    },
    {
      label: "Category",
      id: "kpi_category",
    },
    {
      label: "Settings",
      id: "kpi_settings",
    },
    {
      label: "Filters",
      id: "filters",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
  ],
};

export const kpiSettingsMetadata = {
  type: "KPI Settings",
  fields: [
    {
      label: "Use KPI Tags",
      id: "useKpiTags",
    },
    {
      label: "Use Dashboard Tags",
      id: "useDashboardTags",
    },
  ],
  newObjectFields: {
    useKpiTags: true,
    useDashboardTags: true,
  },
};

export const kpiDateFilterMetadata = {
  type: "Date Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Date",
      id: "value",
    },
  ],
  newObjectFields: {
    value: undefined,
  },
};

export const kpiTagsFilterMetadata = {
  type: "Tags Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Tags",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiGoalsFilterMetadata = {
  type: "Goals Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Goals",
      id: "value",
    },
  ],
  newObjectFields: {
    value: {},
  },
};

export const kpiNotesFilterMetadata = {
  type: "Notes Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Notes",
      id: "value",
      maxLength: 300,
    },
  ],
  newObjectFields: {
    value: "",
  },
};

export const kpiJenkinsResultFilterMetadata = {
  type: "Jenkins Result Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Result",
      id: "value",
    },
  ],
  newObjectFields: {
    value: "",
  },
};

export const kpiJenkinsJobUrlFilterMetadata = {
  type: "Jenkins Job URL Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Job URL",
      id: "value",
    },
  ],
  newObjectFields: {
    value: "",
  },
};

export const kpiJenkinsBuildNumberFilterMetadata = {
  type: "Jenkins Build Number Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Build Number",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiJiraIssueTypeFilterMetadata = {
  type: "Jira Issue Type Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Issue Type",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiJiraIssueComponentsFilterMetadata = {
  type: "Jira Issue Components Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Issue Components",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiJiraIssueLabelsFilterMetadata = {
  type: "Jira Issue Labels Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Issue Labels",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiJiraIssueStatusFilterMetadata = {
  type: "Jira Issue Status Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Issue Status",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiJiraIssueStartStatusFilterMetadata = {
  type: "Jira Issue Start Status Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Issue Start Status",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiJiraIssueDoneStatusFilterMetadata = {
  type: "Jira Issue Done Status Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Issue Done Status",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiSonarProjectKeyFilterMetadata = {
  type: "Sonar Project Key Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Sonar Project Key",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiDomainFilterMetadata = {
  type: "Domain Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Domain",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiApplicationFilterMetadata = {
  type: "Application Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Application",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiSprintFilterMetadata = {
  type: "Sprint Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Sprint",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiReleaseFilterMetadata = {
  type: "Release Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Release",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiSeleniumTestSuitesFilterMetadata = {
  type: "Selenium Test Suites Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Test Suites",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiProjectFilterMetadata = {
  type: "Project Filter",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Project",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiSonarProjectLanguagesFilterMetadata = {
  type: "Sonar Project Languages",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Language(s)",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiServiceNowPrioritiesFilterMetadata = {
  type: "Service Now Priorities",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Service Now Priorities",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiServiceNowToolsFilterMetadata = {
  type: "Service Now Tools",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Service Now Tool",
      id: "value",
    },
  ],
  newObjectFields: {
    value: "",
  },
};

export const kpiServiceNowAssignmentGroupsFilterMetadata = {
  type: "Service Now Assignment Groups",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Service Now Assignment Groups",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiServiceNowServiceOfferingsFilterMetadata = {
  type: "Service Now Service Offerings",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Service Now Service Offerings",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiServiceNowConfigurationItemsFilterMetadata = {
  type: "Service Now Configuration Items",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Service Now Configuration Items",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export const kpiServiceNowBusinessServicesFilterMetadata = {
  type: "Service Now Business Services",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Service Now Business Services",
      id: "value",
    },
  ],
  newObjectFields: {
    value: [],
  },
};

export default kpiConfigurationMetadata;
