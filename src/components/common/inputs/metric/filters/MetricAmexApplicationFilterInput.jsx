import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import AmexApplicationSelectInput from "components/common/list_of_values_input/insights/charts/AmexApplicationSelectInput";

function MetricAmexApplicationFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.AMEX_APPLICATION}
      supportedFilters={metricModel?.getData("filters")}
    >
      <AmexApplicationSelectInput
        dataObject={metricFilterModel}
        setDataObject={setMetricFilterModel}
        fieldName={fieldName}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricAmexApplicationFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricAmexApplicationFilterInput.defaultProps = {
  fieldName: "amex-application",
};

export default MetricAmexApplicationFilterInput;