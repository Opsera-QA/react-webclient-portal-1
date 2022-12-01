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

function GitlabDeploymentActionablePipelinesTable({ data, isLoading, loadData, filterModel, setFilterModel, priority, tableTitleIcon }) {
    const fields = GitlabDeploymentFrequencyActionableMetadata.fields;
    const tableTitle = "Gitlab Pipeline Actionable Report";
    const noDataMessage = "No report found";



    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "_id"), "_id"),
            getTableTextColumn(getField(fields, "taskDescription"), "taskDescription"),
            getTableTextColumn(getField(fields, "status"), "status"),
            getTableDateTimeColumn(getField(fields, "dateOpened"), "dateOpened"),
            getTableDateTimeColumn(getField(fields, "dateClosed"), "dateClosed"),
            getTableTextColumn(getField(fields, "assignmentGroup"), "assignmentGroup"),
            getTableTextColumn(getField(fields, "openedBy"), "openedBy"),
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

GitlabDeploymentActionablePipelinesTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    priority: PropTypes.number,
    tableTitleIcon: PropTypes.object
};

export default GitlabDeploymentActionablePipelinesTable;