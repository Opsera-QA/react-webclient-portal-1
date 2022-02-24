import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import TagManager from "components/common/inputs/tags/TagManager";

function MetricTagFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.TAGS}
      supportedFilters={metricModel?.getData("filters")}
    >
      <TagManager
        type={"kpi_filter"}
        fieldName={"tags"}
        setDataObject={setMetricFilterModel}
        dataObject={metricFilterModel}
        disabled={metricModel?.getData("settings")?.useKpiTags === false}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricTagFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
};

export default MetricTagFilterInput;