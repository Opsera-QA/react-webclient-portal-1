import React from "react";
import PropTypes from "prop-types";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GithubBranchFilterMultiSelectInput from "components/common/list_of_values_input/insights/charts/github/GithubBranchFilterMultiSelectInput";

function MetricGithubBranchFilterInput({
  metricFilterModel,
  setMetricFilterModel,
  metricModel,
  fieldName,
}) {
  return (
    <GithubBranchFilterMultiSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
    />
  );
}

MetricGithubBranchFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricGithubBranchFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.GITHUB_BRANCH,
};

export default MetricGithubBranchFilterInput;
