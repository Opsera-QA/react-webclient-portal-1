import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";

function MetricNotesFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {

  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.NOTES}
      supportedFilters={metricModel?.getData("filters")}
    >
        <TextAreaInput
        type={"kpi_filter"}
        fieldName={fieldName}
        setDataObject={setMetricFilterModel}
        dataObject={metricFilterModel}
        />
    </SupportedMetricFilterInputContainer>
  );
}

MetricNotesFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricNotesFilterInput.defaultProps = {
  fieldName: "notes",
};

export default MetricNotesFilterInput;