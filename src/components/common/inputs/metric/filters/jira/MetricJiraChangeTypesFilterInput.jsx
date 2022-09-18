import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraChangeTypesFilterSelectInput
    from "../../../../list_of_values_input/insights/charts/jira/JiraChangeTypesFilterSelectInput";

function MetricJiraChangeTypesFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <>
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.JIRA_CHANGE_TYPES}
      supportedFilters={metricModel?.getData("filters")}
    >
      <JiraChangeTypesFilterSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
        project={metricFilterModel?.getData('jira-projects')}
      />
    </SupportedMetricFilterInputContainer>
    </>
  );
}

MetricJiraChangeTypesFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricJiraChangeTypesFilterInput.defaultProps = {
  fieldName: "jira-change-types",
};

export default MetricJiraChangeTypesFilterInput;