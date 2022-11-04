import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GitlabBranchFilterMultiSelectInput
    from "../../../../list_of_values_input/insights/charts/gitlab/GitlabBranchFilterMultiSelectInput";

function MetricGitlabBranchFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.GITLAB_BRANCH}
      supportedFilters={metricModel?.getData("filters")}
    >
      <GitlabBranchFilterMultiSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricGitlabBranchFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricGitlabBranchFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.GITLAB_BRANCH,
};

export default MetricGitlabBranchFilterInput;