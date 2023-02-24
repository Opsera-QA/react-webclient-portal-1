import React from "react";
import PropTypes from "prop-types";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GitLogAuthorsList from "../../../../list_of_values_input/insights/charts/gitlog/GitlogAuthorsList";

function MetricGitLogAuthorFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
      <GitLogAuthorsList
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
      />
  );
}

MetricGitLogAuthorFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricGitLogAuthorFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.GITLOG_AUTHORS,
};

export default MetricGitLogAuthorFilterInput;