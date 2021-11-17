import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {
  KPI_FILTER_TYPE_LABELS,
  KPI_FILTER_TYPES
} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";

export const KPI_FILTER_SELECT_OPTIONS = [
  {
    type: KPI_FILTER_TYPES.TAGS,
    text: KPI_FILTER_TYPE_LABELS.TAGS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.DATE,
    text: KPI_FILTER_TYPE_LABELS.DATE,
    value: null,
  },
  {
    type: KPI_FILTER_TYPES.GOALS,
    text: KPI_FILTER_TYPE_LABELS.GOALS,
    value: {},
  },
  {
    type: KPI_FILTER_TYPES.NOTES,
    text: KPI_FILTER_TYPE_LABELS.NOTES,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.JENKINS_RESULT,
    text: KPI_FILTER_TYPE_LABELS.JENKINS_RESULT,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.JENKINS_JOB_URL,
    text: KPI_FILTER_TYPE_LABELS.JENKINS_JOB_URL,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.JENKINS_BUILD_NUMBER,
    text: KPI_FILTER_TYPE_LABELS.JENKINS_BUILD_NUMBER,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_TYPE,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_TYPE,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_COMPONENTS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_COMPONENTS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_STATUS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_STATUS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_START_STATUS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_START_STATUS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_DONE_STATUS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_DONE_STATUS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SONAR_PROJECT_KEY,
    text: KPI_FILTER_TYPE_LABELS.SONAR_PROJECT_KEY,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.DOMAIN,
    text: KPI_FILTER_TYPE_LABELS.DOMAIN,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.APPLICATION,
    text: KPI_FILTER_TYPE_LABELS.APPLICATION,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.RELEASE,
    text: KPI_FILTER_TYPE_LABELS.RELEASE,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SPRINT,
    text: KPI_FILTER_TYPE_LABELS.SPRINT,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.PROJECT,
    text: KPI_FILTER_TYPE_LABELS.PROJECT,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SELENIUM_TEST_SUITES,
    text: KPI_FILTER_TYPE_LABELS.SELENIUM_TEST_SUITES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SONAR_PROJECT_LANGUAGES,
    text: KPI_FILTER_TYPE_LABELS.SONAR_PROJECT_LANGUAGES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_PRIORITIES,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_PRIORITIES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_TOOLS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_TOOLS,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_ASSIGNMENT_GROUPS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_ASSIGNMENT_GROUPS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_SERVICE_OFFERINGS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_SERVICE_OFFERINGS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_CONFIGURATION_ITEMS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_CONFIGURATION_ITEMS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_BUSINESS_SERVICES,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_BUSINESS_SERVICES,
    value: [],
  },
];

function KpiFilterMultiSelectInput({ fieldName, model, setModel, disabled }) {
  const parseValueFunction = (selectOption) => {
    return (
      {
        type: selectOption?.type,
        value: selectOption?.value,
      }
    );
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={KPI_FILTER_SELECT_OPTIONS}
      valueField={"type"}
      textField={"text"}
      disabled={disabled}
      parseValueFunction={parseValueFunction}
    />
  );
}

KpiFilterMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiFilterMultiSelectInput.defaultProps = {
  fieldName: "filters"
};

export default KpiFilterMultiSelectInput;