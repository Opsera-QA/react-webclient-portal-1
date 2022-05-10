import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {serviceNowMeanTimeToResolutionMetadata} from "./serviceNowMeanTimeToResolution.metadata";
import ServiceNowPrioritiesMultiSelectInput
  from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowPrioritiesMultiSelectInput";
import ServiceNowToolsSelectInput
  from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowToolsSelectInput";
import ServiceNowAssignmentGroupSelectInput
  from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowGroupsSelectInput";
import ServiceNowServiceOfferingsSelectInput
  from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowServiceOfferingsSelectInput";
import ServiceNowConfigurationItemsSelectInput
  from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowConfigurationItemsSelectInput";
import ServiceNowBusinessServicesSelectInput
  from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowBusinessServicesSelectInput";
import GoalsInputBase from "../../../../marketplace/charts/goals/GoalsInputBase";
import kpiConfigurationMetadata, {
  kpiGoalsFilterMetadata,
  kpiServiceNowAssignmentGroupsFilterMetadata,
  kpiServiceNowBusinessServicesFilterMetadata,
  kpiServiceNowConfigurationItemsFilterMetadata,
  kpiServiceNowPrioritiesFilterMetadata,
  kpiServiceNowServiceOfferingsFilterMetadata,
  kpiServiceNowToolsFilterMetadata
} from "../../../../marketplace/charts/kpi-configuration-metadata";
import Model from "../../../../../../core/data_model/model";

function ServiceNowMeanTimeToResolutionEditorPanel(
  {
    metricModel,
    unpackedFilterData,
    metricFilterModel,
    setMetricFilterModel,
    kpiConfiguration
  }) {
  const [kpiSettings, setKpiSettings] = useState(new Model(kpiConfiguration, kpiConfigurationMetadata, false));
  const [kpiServiceNowPrioritiesFilter, setKpiServiceNowPrioritiesFilter] = useState(
    modelHelpers.getDashboardFilterModel(
      kpiConfiguration,
      "servicenow-priorities",
      kpiServiceNowPrioritiesFilterMetadata
    )
  );
  const [kpiServiceNowToolsFilter, setKpiServiceNowToolsFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "servicenow-tools", kpiServiceNowToolsFilterMetadata)
  );
  const [kpiServiceNowAssignmentGroupsFilter, setKpiServiceNowAssignmentGroupsFilter] = useState(
    modelHelpers.getDashboardFilterModel(
      kpiConfiguration,
      "servicenow-assignment-groups",
      kpiServiceNowAssignmentGroupsFilterMetadata
    )
  );
  const [kpiServiceNowServiceOfferingsFilter, setKpiServiceNowServiceOfferingsFilter] = useState(
    modelHelpers.getDashboardFilterModel(
      kpiConfiguration,
      "servicenow-service-offerings",
      kpiServiceNowServiceOfferingsFilterMetadata
    )
  );
  const [kpiServiceNowConfigurationItemsFilter, setKpiServiceNowConfigurationItemsFilter] = useState(
    modelHelpers.getDashboardFilterModel(
      kpiConfiguration,
      "servicenow-configuration-items",
      kpiServiceNowConfigurationItemsFilterMetadata
    )
  );
  const [kpiServiceNowBusinessServicesFilter, setKpiServiceNowBusinessServicesFilter] = useState(
    modelHelpers.getDashboardFilterModel(
      kpiConfiguration,
      "servicenow-business-services",
      kpiServiceNowBusinessServicesFilterMetadata
    )
  );
  const [kpiGoalsFilter, setKpiGoalsFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "goals", kpiGoalsFilterMetadata)
  );
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
      <div>
        <ServiceNowPrioritiesMultiSelectInput
          placeholderText={"Select Priorities"}
          type={"kpi_filter"}
          fieldName={"value"}
          valueField={"value"}
          textField={"text"}
          setDataObject={setKpiServiceNowPrioritiesFilter}
          dataObject={kpiServiceNowPrioritiesFilter}
        />
      </div>
      <div>
        <ServiceNowToolsSelectInput
          placeholderText={"Select Tools"}
          type={"kpi_filter"}
          fieldName={"value"}
          valueField={"_id"}
          textField={"name"}
          setDataObject={setKpiServiceNowToolsFilter}
          dataObject={kpiServiceNowToolsFilter}
          groupsDataObject={kpiServiceNowAssignmentGroupsFilter}
          groupsSetDataObject={setKpiServiceNowAssignmentGroupsFilter}
        />
      </div>
      <div>
        <ServiceNowAssignmentGroupSelectInput
          visible={true}
          placeholderText={"Select Assignment Groups"}
          type={"kpi_filter"}
          fieldName={"value"}
          valueField={"sys_id"}
          textField={"name"}
          setDataObject={setKpiServiceNowAssignmentGroupsFilter}
          dataObject={kpiServiceNowAssignmentGroupsFilter}
          serviceNowToolId={kpiServiceNowToolsFilter.getData("value")}
        />
      </div>
      <div>
        <ServiceNowServiceOfferingsSelectInput
          visible={true}
          placeholderText={"Select Service Offerings"}
          type={"kpi_filter"}
          fieldName={"value"}
          valueField={"sys_id"}
          textField={"name"}
          setDataObject={setKpiServiceNowServiceOfferingsFilter}
          dataObject={kpiServiceNowServiceOfferingsFilter}
          serviceNowToolId={kpiServiceNowToolsFilter.getData("value")}
        />
      </div>
      <div>
        <ServiceNowConfigurationItemsSelectInput
          visible={true}
          placeholderText={"Select Configuration Items"}
          type={"kpi_filter"}
          fieldName={"value"}
          valueField={"sys_id"}
          textField={"name"}
          setDataObject={setKpiServiceNowConfigurationItemsFilter}
          dataObject={kpiServiceNowConfigurationItemsFilter}
          serviceNowToolId={kpiServiceNowToolsFilter.getData("value")}
        />
      </div>
      <div>
        <ServiceNowBusinessServicesSelectInput
          visible={true}
          placeholderText={"Select Business Services"}
          type={"kpi_filter"}
          fieldName={"value"}
          valueField={"sys_id"}
          textField={"name"}
          setDataObject={setKpiServiceNowBusinessServicesFilter}
          dataObject={kpiServiceNowBusinessServicesFilter}
          serviceNowToolId={kpiServiceNowToolsFilter.getData("value")}
        />
      </div>
      <div>
        <GoalsInputBase
          type={"kpi_filter"}
          fieldName={"value"}
          setDataObject={setKpiGoalsFilter}
          dataObject={kpiGoalsFilter}
          kpiName={kpiSettings.getData("kpi_identifier")}
        />
      </div>
    </div>
  );
}

ServiceNowMeanTimeToResolutionEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  kpiConfiguration: PropTypes.object,
};

export default ServiceNowMeanTimeToResolutionEditorPanel;
