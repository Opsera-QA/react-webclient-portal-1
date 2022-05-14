import React, {useEffect} from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {serviceNowMeanTimeToResolutionMetadata} from "./serviceNowMeanTimeToResolution.metadata";
import MetricServiceNowPrioritiesMultiSelectFilter
  from "components/common/inputs/metric/filters/service_now/MetricServiceNowPrioritiesMultiSelectFilter";
import MetricServiceNowToolsSelectInput
  from "../../../../../common/inputs/metric/filters/service_now/MetricServiceNowToolsSelectInput";
import MetricServiceNowAssignmentGroupSelectInput
  from "../../../../../common/inputs/metric/filters/service_now/MetricServiceNowAssignmentGroupSelectInput";
import MetricServiceNowServiceOfferingsSelectInput
  from "../../../../../common/inputs/metric/filters/service_now/MetricServiceNowServiceOfferingsSelectInput";
import ServiceNowToolSelectInput
  from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowToolSelectInput";
import MetricServiceNowConfigurationItemsSelectInput
  from "../../../../../common/inputs/metric/filters/service_now/MetricServiceNowConfigurationItemsSelectInput";
import MetricServiceNowBusinessServicesSelectInput
  from "../../../../../common/inputs/metric/filters/service_now/MetricServiceNowBusinessServicesSelectInput";

function ServiceNowMeanTimeToResolutionEditorPanel(
  {
    metricModel,
    unpackedFilterData,
    metricFilterModel,
    setMetricFilterModel
  }) {
  useEffect(() => {
    setMetricFilterModel(undefined);

    if (unpackedFilterData) {
      setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, serviceNowMeanTimeToResolutionMetadata));
    }

  }, [unpackedFilterData]);

  if (metricFilterModel == null) {
    return null;
  }

  return (
    <div>
      <MetricTagFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricDateRangeFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricServiceNowPrioritiesMultiSelectFilter
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricServiceNowToolsSelectInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricServiceNowAssignmentGroupSelectInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricServiceNowServiceOfferingsSelectInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricServiceNowConfigurationItemsSelectInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricServiceNowBusinessServicesSelectInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
    </div>
  );
}

ServiceNowMeanTimeToResolutionEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func
};

export default ServiceNowMeanTimeToResolutionEditorPanel;
