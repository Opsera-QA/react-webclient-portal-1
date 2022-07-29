import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
    from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import DeploymentFrequencyConfigurationItemsSelectInput from "components/common/list_of_values_input/insights/charts/gitlab/DeploymentFrequencyConfigurationItemsSelectInput";

function MetricDeploymentStageFilterInput({
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
}) {
    return (
        <SupportedMetricFilterInputContainer
            filterType={KPI_FILTER_TYPES.DEPLOYMENT_STAGE}
            supportedFilters={metricModel?.getData("filters")}
        >
            <DeploymentFrequencyConfigurationItemsSelectInput
                fieldName={fieldName}
                valueField={"value"}
                textField={"text"}
                model={metricFilterModel}
                setModel={setMetricFilterModel}
            />
        </SupportedMetricFilterInputContainer>
    );
}

MetricDeploymentStageFilterInput.propTypes = {
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
    metricModel: PropTypes.object,
    fieldName: PropTypes.string
};

MetricDeploymentStageFilterInput.defaultProps = {
    fieldName: "deployment-stage",
};

export default MetricDeploymentStageFilterInput;
