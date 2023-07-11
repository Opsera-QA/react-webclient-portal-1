import React from "react";
import PropTypes from "prop-types";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GithubRepositoryFilterMultiSelectInput from "components/common/list_of_values_input/insights/charts/github/GithubRepositoryFilterMultiSelectInput";
import GitScraperBranchFilterMultiSelectInput
    from "../../../list_of_values_input/insights/charts/gitscraper/GitScraperBranchFilterMultiSelectInput";
import JiraPrioritiesSelectInput from "../../../list_of_values_input/insights/charts/jira/JiraPrioritiesSelectInput";
import SupportedMetricFilterInputContainer from "../../../metrics/container/SupportedMetricFilterInputContainer";

// This component is used only in Github KPIs, setDataFunction and clearDataFunction is common for all the Github KPIs.
function MetricGitScraperBranchFilterInput({
                                               metricFilterModel,
                                               setMetricFilterModel,
                                               metricModel,
                                               fieldName,
                                           }) {
    return(
        <SupportedMetricFilterInputContainer
            filterType={KPI_FILTER_TYPES.GITSCRAPER_BRANCH}
            supportedFilters={metricModel?.getData("filters")}
        >
            <GitScraperBranchFilterMultiSelectInput
                fieldName={fieldName}
                valueField={"value"}
                textField={"text"}
                model={metricFilterModel}
                setModel={setMetricFilterModel}
            />
        </SupportedMetricFilterInputContainer>
    );
}

MetricGitScraperBranchFilterInput.propTypes = {
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
    metricModel: PropTypes.object,
    fieldName: PropTypes.string,
};

MetricGitScraperBranchFilterInput.defaultProps = {
    fieldName: "gitscraper-branch",
};

export default MetricGitScraperBranchFilterInput;
