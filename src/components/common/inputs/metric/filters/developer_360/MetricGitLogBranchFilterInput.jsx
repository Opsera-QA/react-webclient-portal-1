import React from "react";
import PropTypes from "prop-types";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GitLogBranchesList from "../../../../list_of_values_input/insights/charts/gitlog/GitlogBranchesList";

function MetricGitLogBranchFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
      <GitLogBranchesList
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
      />
  );
}

MetricGitLogBranchFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricGitLogBranchFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.GITLOG_BRANCHES,
};

export default MetricGitLogBranchFilterInput;