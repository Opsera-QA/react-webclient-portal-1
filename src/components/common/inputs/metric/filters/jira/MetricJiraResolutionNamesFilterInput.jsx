import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraResolutionNamesFilterSelectInput from "../../../../list_of_values_input/insights/charts/jira/JiraResolutionNamesFilterSelectInput";

function MetricJiraResolutionNamesFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <>
      <SupportedMetricFilterInputContainer
        filterType={KPI_FILTER_TYPES.JIRA_RESOLUTION_NAMES}
        supportedFilters={metricModel?.getData("filters")}
      >
        <JiraResolutionNamesFilterSelectInput
          fieldName={fieldName}
          valueField={"value"}
          textField={"text"}
          model={metricFilterModel}
          setModel={setMetricFilterModel}
          project={metricFilterModel?.getData('jira-projects')}
        />
      </SupportedMetricFilterInputContainer>
    </>
  );
}

MetricJiraResolutionNamesFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricJiraResolutionNamesFilterInput.defaultProps = {
  fieldName: "jira-resolution-names",
};

export default MetricJiraResolutionNamesFilterInput;