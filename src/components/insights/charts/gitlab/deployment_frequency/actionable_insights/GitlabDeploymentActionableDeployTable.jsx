import React, { useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import GitlabDeploymentFrequencyActionableMetadata from "../actionable_insights/GitlabDeploymentFrequencyActionableMetadata";
import {
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";

function GitlabDeploymentActionableDeployTable({ data, isLoading, loadData, filterModel, setFilterModel, priority, tableTitleIcon }) {
    const fields = GitlabDeploymentFrequencyActionableMetadata.fields;
    const tableTitle = "Gitlab Deployments Actionable Report";
    const noDataMessage = "No report found";



    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "stepName"), "stepName"),
            getTableTextColumn(getField(fields, "duration"), "duration"),
            getTableTextColumn(getField(fields, "stepStatus"), "stepStatus"),
            getTableDateTimeColumn(getField(fields, "activityDate"), "activityDate"),
            getTableTextColumn(getField(fields, "commitId"), "commitId"),
            getTableTextColumn(getField(fields, "pipelineId"), "pipelineId"),
            getTableTextColumn(getField(fields, "repoUrl"), "repoUrl"),
            getTableTextColumn(getField(fields, "repoName"), "repoName"),
            getTableTextColumn(getField(fields, "branch"), "branch"),
        ],
        []
    );

    const getTable = () => {
        return (
            <CustomTable
                isLoading={isLoading}
                loadData={loadData}
                columns={columns}
                data={data}
                noDataMessage={noDataMessage}
                paginationDto={filterModel}
                setPaginationDto={setFilterModel}
            />
        );
    };

    return (
        <FilterContainer
            isLoading={isLoading}
            title={tableTitle}
            titleIcon={tableTitleIcon}
            body={getTable()}
            className={"px-2 pb-2"}
            loadData={loadData}
            setFilterDto={setFilterModel}
            filterDto={filterModel}
        />
    );
}

GitlabDeploymentActionableDeployTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    priority: PropTypes.number,
    tableTitleIcon: PropTypes.object
};

export default GitlabDeploymentActionableDeployTable;