import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ServiceNowToolSelectInput
  from "../../../../list_of_values_input/insights/charts/servicenow/ServiceNowToolSelectInput";

function MetricServiceNowToolsSelectInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.SERVICE_NOW_TOOLS}
      supportedFilters={metricModel?.getData("filters")}
    >
      <ServiceNowToolSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricServiceNowToolsSelectInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricServiceNowToolsSelectInput.defaultProps = {
  fieldName: "servicenow-tools",
};

export default MetricServiceNowToolsSelectInput;