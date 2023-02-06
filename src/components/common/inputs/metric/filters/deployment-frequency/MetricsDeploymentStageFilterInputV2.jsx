import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
    from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import DeploymentFrequencyConfigurationItemsSelectInputV2 from "components/common/list_of_values_input/insights/charts/gitlab/DeploymentFrequencyConfigurationItemsSelectInputV2";

function MetricDeploymentStageFilterInputV2({
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
}) {
    return (
        <DeploymentFrequencyConfigurationItemsSelectInputV2
            fieldName={fieldName}
            valueField={"value"}
            textField={"text"}
            model={metricFilterModel}
            setModel={setMetricFilterModel}
        />
    );
}

MetricDeploymentStageFilterInputV2.propTypes = {
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
    metricModel: PropTypes.object,
    fieldName: PropTypes.string
};

MetricDeploymentStageFilterInputV2.defaultProps = {
    fieldName: "deployment-stage",
};

export default MetricDeploymentStageFilterInputV2;
