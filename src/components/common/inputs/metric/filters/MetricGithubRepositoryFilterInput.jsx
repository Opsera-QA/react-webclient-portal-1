import React from "react";
import PropTypes from "prop-types";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GithubRepositoryFilterMultiSelectInput from "components/common/list_of_values_input/insights/charts/github/GithubRepositoryFilterMultiSelectInput";

function MetricGithubRepositoryFilterInput({
  metricFilterModel,
  setMetricFilterModel,
  metricModel,
  fieldName,
}) {
  return (
    <GithubRepositoryFilterMultiSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
    />
  );
}

MetricGithubRepositoryFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricGithubRepositoryFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.GITHUB_REPOSITORY,
};

export default MetricGithubRepositoryFilterInput;
