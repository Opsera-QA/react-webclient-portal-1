import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import ServiceNowAssignmentGroupSelectInput
  from "../../../../list_of_values_input/insights/charts/servicenow/ServiceNowGroupsSelectInput";

function MetricServiceNowAssignmentGroupSelectInput(
  {
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
  }) {
  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.SERVICE_NOW_ASSIGNMENT_GROUPS}
      supportedFilters={metricModel?.getData("filters")}
    >
      <ServiceNowAssignmentGroupSelectInput
        fieldName={fieldName}
        valueField={"value"}
        textField={"text"}
        dataObject={metricFilterModel}
        setDataObject={setMetricFilterModel}
        serviceNowToolId={metricFilterModel.getData("servicenow-tools")}
      />
    </SupportedMetricFilterInputContainer>
  );
}

MetricServiceNowAssignmentGroupSelectInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string
};

MetricServiceNowAssignmentGroupSelectInput.defaultProps = {
  fieldName: "servicenow-assignment-groups",
};

export default MetricServiceNowAssignmentGroupSelectInput;