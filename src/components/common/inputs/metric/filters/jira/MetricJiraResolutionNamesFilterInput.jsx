import React from "react";
import PropTypes from "prop-types";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraResolutionNamesFilterSelectInput from "components/common/list_of_values_input/insights/charts/jira/JiraResolutionNamesFilterSelectInput";

function MetricJiraResolutionNamesFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    fieldName,
    projectFieldName
  }) {
  return (
    <JiraResolutionNamesFilterSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
      project={metricFilterModel?.getData(projectFieldName)}
    />
  );
}

MetricJiraResolutionNamesFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  projectFieldName: PropTypes.string,
};

MetricJiraResolutionNamesFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.JIRA_RESOLUTION_NAMES,
  projectFieldName: KPI_FILTER_TYPES.JIRA_PROJECTS
};

export default MetricJiraResolutionNamesFilterInput;