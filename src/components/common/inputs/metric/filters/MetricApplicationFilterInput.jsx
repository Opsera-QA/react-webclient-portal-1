import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ManualKpiMultiSelectInputBase from "components/common/list_of_values_input/settings/analytics/ManualKpiMultiSelectInputBase";

function MetricApplicationFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName,
  }) {

  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.APPLICATION}
      supportedFilters={metricModel?.getData("filters")}
    >
        <ManualKpiMultiSelectInputBase
        type={"application"}
        fieldName={fieldName}
        setDataObject={setMetricFilterModel}
        dataObject={metricFilterModel}
        />
    </SupportedMetricFilterInputContainer>
  );
}

MetricApplicationFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricApplicationFilterInput.defaultProps = {
  fieldName: "application",
};

export default MetricApplicationFilterInput;