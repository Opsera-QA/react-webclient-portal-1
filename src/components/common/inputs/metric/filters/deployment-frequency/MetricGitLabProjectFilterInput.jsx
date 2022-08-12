import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
    from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import MetricFilterGitLabProjectSelectInput from "components/common/list_of_values_input/insights/charts/gitlab/MetricFilterGitLabProjectSelectInput";

function MetricGitLabProjectFilterInput({
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
}) {
    return (
        <SupportedMetricFilterInputContainer
            filterType={KPI_FILTER_TYPES.GITLAB_PROJECT}
            supportedFilters={metricModel?.getData("filters")}
        >
            <MetricFilterGitLabProjectSelectInput
                fieldName={fieldName}
                valueField={"value"}
                textField={"text"}
                model={metricFilterModel}
                setModel={setMetricFilterModel}
            />
        </SupportedMetricFilterInputContainer>
    );
}

MetricGitLabProjectFilterInput.propTypes = {
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
    metricModel: PropTypes.object,
    fieldName: PropTypes.string
};

MetricGitLabProjectFilterInput.defaultProps = {
    fieldName: "gitlab-project",
};

export default MetricGitLabProjectFilterInput;
