import { KPI_FILTER_TYPE_LABELS, KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";

export const systemDrivenMaturityMetadata = {
  type: "System Driven Maturity",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Deployment Stage",
      id: "deployment-stage",
    },
    {
      label: "Gitlab Project",
      id: "gitlab-project",
    },
    {
      label: "Jira Project for MTTR",
      id: "jira-projects-mttr",
    },
    {
      label: "Jira Project for CFR",
      id: "jira-projects-cfr",
    },
    {
      label: "Exclude Jira Change Types (Values will be excluded from results)",
      id: "jira-change-types",
    },
    {
      label: KPI_FILTER_TYPE_LABELS.JIRA_EXCLUDED_RESOLUTION_NAMES,
      id: KPI_FILTER_TYPES.JIRA_EXCLUDED_RESOLUTION_NAMES
    },
    {
      label: "Jira Service Components",
      id: "jira-service-components",
    },
    {
      label: "Jira Resolution Names",
      id: "jira-resolution-names",
    },
    {
      label: "Date Range",
      id: "date",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
  },
};
