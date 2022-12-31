import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraTeamNamesFilterMultiSelectInput
    from "../../../../list_of_values_input/insights/charts/jira/JiraTeamNamesFilterMultiSelectInput";

function MetricJiraTeamNamesFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.JIRA_TEAM_NAMES}
      supportedFilters={metricModel?.getData("filters")}
    >
      <JiraTeamNamesFilterMultiSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        model={metricFilterModel}
        setModel={setMetricFilterModel}
        project={metricFilterModel?.getData('jira-projects')}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricJiraTeamNamesFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricJiraTeamNamesFilterInput.defaultProps = {
  fieldName: KPI_FILTER_TYPES.JIRA_TEAM_NAMES,
};

export default MetricJiraTeamNamesFilterInput;