import React from "react";
import PropTypes from "prop-types";
import GitScraperBranchFilterMultiSelectInput from "../../../list_of_values_input/insights/charts/gitscraper/GitScraperBranchFilterMultiSelectInput";

function MetricGitScraperBranchFilterInput({
  metricFilterModel,
  setMetricFilterModel,
  metricModel,
  fieldName,
  tags,
}) {
  return(
    <GitScraperBranchFilterMultiSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
      tags={tags}
    />
  );
}

MetricGitScraperBranchFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
  tags: PropTypes.array
};

MetricGitScraperBranchFilterInput.defaultProps = {
  fieldName: "gitscraper-branch",
};

export default MetricGitScraperBranchFilterInput;
