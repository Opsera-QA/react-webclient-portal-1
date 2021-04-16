const kpiConfigurationMetadata = {
    idProperty: "_id",
    type: "KPI Configuration",
    fields: [
      {
        label: "Name",
        id: "kpi_name"
      },
      {
        label: "Category",
        id: "kpi_category"
      },
      {
        label: "Settings",
        id: "kpi_settings"
      },
      {
        label: "Filters",
        id: "filters"
      },
      {
        label: "Tags",
        id: "tags"
      },
      {
        label: "Active",
        id: "active"
      },
      {
        label: "Updated",
        id: "updatedAt"
      }
    ]
  };

export const kpiDateFilterMetadata = {
  type: "Date Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Date",
      id: "value"
    }
  ],
  newObjectFields: {
    value: undefined
  }
};

export const kpiTagsFilterMetadata = {
  type: "Tags Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Tags",
      id: "value"
    }
  ],
  newObjectFields: {
    value: []
  }
};

export const kpiJenkinsResultFilterMetadata = {
  type: "Jenkins Result Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Result",
      id: "value"
    }
  ],
  newObjectFields: {
    value: ""
  }
};

export const kpiJenkinsJobUrlFilterMetadata = {
  type: "Jenkins Job URL Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Job URL",
      id: "value"
    }
  ],
  newObjectFields: {
    value: ""
  }
};

export const kpiJenkinsBuildNumberFilterMetadata = {
  type: "Jenkins Build Number Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Build Number",
      id: "value"
    }
  ],
  newObjectFields: {
    value: []
  }
};

export const kpiJiraIssueTypeFilterMetadata = {
  type: "Jira Issue Type Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Jira Issue Type",
      id: "value"
    }
  ],
  newObjectFields: {
    value: []
  }
};

export const kpiJiraIssueStartStatusFilterMetadata = {
  type: "Jira Issue Start Status Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Jira Issue Start Status",
      id: "value"
    }
  ],
  newObjectFields: {
    value: []
  }
};

export const kpiJiraIssueDoneStatusFilterMetadata = {
  type: "Jira Issue Done Status Filter",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Jira Issue Done Status",
      id: "value"
    }
  ],
  newObjectFields: {
    value: []
  }
};

export default kpiConfigurationMetadata;