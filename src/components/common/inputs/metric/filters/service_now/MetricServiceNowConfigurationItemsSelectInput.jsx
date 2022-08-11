import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ServiceNowConfigurationItemsSelectInput
  from "../../../../list_of_values_input/insights/charts/servicenow/ServiceNowConfigurationItemsSelectInput";

function MetricServiceNowConfigurationItemsSelectInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.SERVICE_NOW_CONFIGURATION_ITEMS}
      supportedFilters={metricModel?.getData("filters")}
    >
      <ServiceNowConfigurationItemsSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        dataObject={metricFilterModel}
        setDataObject={setMetricFilterModel}
        serviceNowToolId={metricFilterModel.getData("servicenow-tools")}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricServiceNowConfigurationItemsSelectInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string
};

MetricServiceNowConfigurationItemsSelectInput.defaultProps = {
  fieldName: "servicenow-configuration-items",
};

export default MetricServiceNowConfigurationItemsSelectInput;