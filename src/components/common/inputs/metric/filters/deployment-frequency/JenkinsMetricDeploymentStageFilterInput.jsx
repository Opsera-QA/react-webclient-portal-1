import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JenkinsDeploymentFrequencyConfigurationItemsSelectInput from "components/common/list_of_values_input/insights/charts/jenkins/JenkinsDeploymentFrequencyConfigurationItemsSelectInput";

function JenkinsMetricDeploymentStageFilterInput({
  metricFilterModel,
  setMetricFilterModel,
  metricModel,
  fieldName,
}) {
  return (
    <JenkinsDeploymentFrequencyConfigurationItemsSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
    />
  );
}

JenkinsMetricDeploymentStageFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

JenkinsMetricDeploymentStageFilterInput.defaultProps = {
  fieldName: "deployment-stage",
};

export default JenkinsMetricDeploymentStageFilterInput;
