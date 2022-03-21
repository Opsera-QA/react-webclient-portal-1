import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import AmexDirectorSelectInput from "components/common/list_of_values_input/insights/charts/AmexDirectorSelectInput";

function MetricAmexDirectorFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.AMEX_DIRECTOR}
      supportedFilters={metricModel?.getData("filters")}
    >
      <AmexDirectorSelectInput
        dataObject={metricFilterModel}
        setDataObject={setMetricFilterModel}
        fieldName={fieldName}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricAmexDirectorFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricAmexDirectorFilterInput.defaultProps = {
  fieldName: "amex-director",
};

export default MetricAmexDirectorFilterInput;