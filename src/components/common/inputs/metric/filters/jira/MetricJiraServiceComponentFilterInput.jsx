import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import JiraServiceComponentsFilterSelectInput
    from "../../../../list_of_values_input/insights/charts/jira/JiraServiceComponentsFilterSelectInput";

function MetricJiraServiceComponentFilterInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
    console.log('MetricJiraServiceComponentFilterInput', { metricModel: metricModel.data });
  return (
    <>
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.JIRA_SERVICE_COMPONENTS}
      supportedFilters={metricModel?.getData("filters")}
    >
      <JiraServiceComponentsFilterSelectInput
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

MetricJiraServiceComponentFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricJiraServiceComponentFilterInput.defaultProps = {
  fieldName: "jira-service-components",
};

export default MetricJiraServiceComponentFilterInput;