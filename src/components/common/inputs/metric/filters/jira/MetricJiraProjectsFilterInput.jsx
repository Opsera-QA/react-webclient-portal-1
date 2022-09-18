import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraProjectSelectInput from "../../../../list_of_values_input/insights/charts/jira/JiraProjectSelectInput";
import JiraProjectSingleSelectInput from "components/common/list_of_values_input/insights/charts/jira/JiraProjectSingleSelectInput";

function MetricJiraProjectsFilterInput({
  metricFilterModel,
  setMetricFilterModel,
  metricModel,
  fieldName,
  type,
}) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.JIRA_PROJECTS}
      supportedFilters={metricModel?.getData("filters")}
    >
      {type === "single" ? (
        <JiraProjectSingleSelectInput
          fieldName={fieldName}
          valueField={"value"}
          textField={"text"}
          model={metricFilterModel}
          setModel={setMetricFilterModel}
        />
      ) : (
        <JiraProjectSelectInput
          fieldName={fieldName}
          valueField={"value"}
          textField={"text"}
          model={metricFilterModel}
          setModel={setMetricFilterModel}
        />
      )}
    </SupportedMetricFilterInputContainer>
  );
}

MetricJiraProjectsFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
  type: PropTypes.string,
};

MetricJiraProjectsFilterInput.defaultProps = {
  fieldName: "jira-projects",
  type: "multi",
};

export default MetricJiraProjectsFilterInput;
