import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ServiceNowPrioritiesMultiSelectInput
  from "components/common/list_of_values_input/insights/charts/servicenow/ServiceNowPrioritiesMultiSelectInput";

function MetricServiceNowPrioritiesMultiSelectFilter(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.SERVICE_NOW_PRIORITIES}
      supportedFilters={metricModel?.getData("filters")}
    >
      <ServiceNowPrioritiesMultiSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        dataObject={metricFilterModel}
        setDataObject={setMetricFilterModel}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricServiceNowPrioritiesMultiSelectFilter.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricServiceNowPrioritiesMultiSelectFilter.defaultProps = {
  fieldName: "servicenow-priorities",
};

export default MetricServiceNowPrioritiesMultiSelectFilter;