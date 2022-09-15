import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraChangeFailureRateFilterSelectInput from "../../../../list_of_values_input/insights/charts/jira/JiraChangeFailureRateFilterSelectInput";

function MetricJiraChangeFailureRateFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <>
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.JIRA_CHANGE_FAILURE_RATE}
      supportedFilters={metricModel?.getData("filters")}
    >
      <JiraChangeFailureRateFilterSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
      />
    </SupportedMetricFilterInputContainer>
    </>
  );
}

MetricJiraChangeFailureRateFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string
};

MetricJiraChangeFailureRateFilterInput.defaultProps = {
  fieldName: "jira-change-failure-rate",
};

export default MetricJiraChangeFailureRateFilterInput;