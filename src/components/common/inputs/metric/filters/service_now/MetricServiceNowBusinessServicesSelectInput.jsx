import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ServiceNowBusinessServicesSelectInput
  from "../../../../list_of_values_input/insights/charts/servicenow/ServiceNowBusinessServicesSelectInput";

function MetricServiceNowBusinessServicesSelectInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.SERVICE_NOW_BUSINESS_SERVICES}
      supportedFilters={metricModel?.getData("filters")}
    >
      <ServiceNowBusinessServicesSelectInput
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

MetricServiceNowBusinessServicesSelectInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string
};

MetricServiceNowBusinessServicesSelectInput.defaultProps = {
  fieldName: "servicenow-business-services",
};

export default MetricServiceNowBusinessServicesSelectInput;