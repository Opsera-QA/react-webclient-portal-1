import React from "react";
import PropTypes from "prop-types";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GithubRepositoryFilterMultiSelectInput from "components/common/list_of_values_input/insights/charts/github/GithubRepositoryFilterMultiSelectInput";

// This component is used only in Github KPIs, setDataFunction and clearDataFunction is common for all the Github KPIs. 
function MetricGithubRepositoryFilterInput({
  metricFilterModel,
  setMetricFilterModel,
  metricModel,
  fieldName,
}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...metricFilterModel };
    newModel.setData(fieldName, selectedOption.map(option => option.value));
    if (selectedOption?.length === 0) {
      newModel.setData("github-branch", []);
    }
    setMetricFilterModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...metricFilterModel };
    newModel.setData("github-branch", []);
    newModel.setData(fieldName, []);
    setMetricFilterModel({ ...newModel });
  };

  return (
    <GithubRepositoryFilterMultiSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
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
