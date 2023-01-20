import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraPrioritiesSelectInput from "../../../../list_of_values_input/insights/charts/jira/JiraPrioritiesSelectInput";

function MetricJiraPrioritiesFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.JIRA_PRIORITIES}
      supportedFilters={metricModel?.getData("filters")}
    >
      <JiraPrioritiesSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricJiraPrioritiesFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string
};

MetricJiraPrioritiesFilterInput.defaultProps = {
  fieldName: "jira-priorities",
};

export default MetricJiraPrioritiesFilterInput;