import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ServiceNowServiceOfferingsSelectInput
  from "../../../../list_of_values_input/insights/charts/servicenow/ServiceNowServiceOfferingsSelectInput";

function MetricServiceNowServiceOfferingsSelectInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.SERVICE_NOW_SERVICE_OFFERINGS}
      supportedFilters={metricModel?.getData("filters")}
    >
      <ServiceNowServiceOfferingsSelectInput
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

MetricServiceNowServiceOfferingsSelectInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string
};

MetricServiceNowServiceOfferingsSelectInput.defaultProps = {
  fieldName: "servicenow-service-offerings",
};

export default MetricServiceNowServiceOfferingsSelectInput;