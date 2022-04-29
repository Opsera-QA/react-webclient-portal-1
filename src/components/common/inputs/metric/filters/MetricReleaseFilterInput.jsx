import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ManualKpiMultiSelectInputBase from "components/common/list_of_values_input/settings/analytics/ManualKpiMultiSelectInputBase";

function MetricReleaseFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {

  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.RELEASE}
      supportedFilters={metricModel?.getData("filters")}
    >
        <ManualKpiMultiSelectInputBase
        type={"release"}
        fieldName={fieldName}
        setDataObject={setMetricFilterModel}
        dataObject={metricFilterModel}
        />
    </SupportedMetricFilterInputContainer>
  );
}

MetricReleaseFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricReleaseFilterInput.defaultProps = {
  fieldName: "release",
};

export default MetricReleaseFilterInput;