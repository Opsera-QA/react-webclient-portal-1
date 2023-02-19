import React from "react";
import PropTypes from "prop-types";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GitlogRepositoriesList from "../../../../list_of_values_input/insights/charts/gitlog/GitlogRepositoriesList";

function MetricGitLogRepositoryFilterInput({
    metricFilterModel,
    setMetricFilterModel,
    metricModel,
    fieldName
}) {
    return (
        <GitlogRepositoriesList
            fieldName={fieldName}
            valueField={"value"}
            textField={"text"}
            model={metricFilterModel}
            setModel={setMetricFilterModel}
        />
    );
}

MetricGitLogRepositoryFilterInput.propTypes = {
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
    metricModel: PropTypes.object,
    fieldName: PropTypes.string
};

MetricGitLogRepositoryFilterInput.defaultProps = {
    fieldName: KPI_FILTER_TYPES.GITLOG_REPOSITORIES,
};

export default MetricGitLogRepositoryFilterInput;
