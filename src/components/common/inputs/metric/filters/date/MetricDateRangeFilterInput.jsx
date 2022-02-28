import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import DateRangeInput from "components/common/inputs/date/DateRangeInput";

function MetricDateRangeFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.DATE}
      supportedFilters={metricModel?.getData("filters")}
    >
      <DateRangeInput
        dataObject={metricFilterModel}
        setDataObject={setMetricFilterModel}
        fieldName={fieldName}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricDateRangeFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricDateRangeFilterInput.defaultProps = {
  fieldName: "date",
};

export default MetricDateRangeFilterInput;