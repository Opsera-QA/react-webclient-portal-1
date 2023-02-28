import React from "react";
import PropTypes from "prop-types";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraChangeTypesFilterSelectInput from "components/common/list_of_values_input/insights/charts/jira/JiraChangeTypesFilterSelectInput";

function MetricJiraChangeTypesFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    fieldName,
    projectFieldName
  }) {
  return (
    <JiraChangeTypesFilterSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
      project={metricFilterModel?.getData(projectFieldName)}
    />
  );
}

MetricJiraChangeTypesFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  projectFieldName: PropTypes.string,
};

MetricJiraChangeTypesFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.JIRA_CHANGE_TYPES,
  projectFieldName: KPI_FILTER_TYPES.JIRA_PROJECTS
};

export default MetricJiraChangeTypesFilterInput;