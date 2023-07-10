import React, { useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import GitlabCommitsByAuthorActionableMetadata from "./GitlabCommitsByAuthorActionableMetadata";
import ExportGitlabCommitsByAuthorDetailsButton from "./export/ExportGitlabCommitsByAuthorDetailsButton";
function GitlabCommitsByAuthorActionableTable({ data, isLoading, loadData, filterModel, setFilterModel, tableTitleIcon }) {
    const fields = GitlabCommitsByAuthorActionableMetadata.fields;
    const tableTitle = "Commits By Author Report";
    const noDataMessage = "No data available";
    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "userName"), "userName"),
            getTableDateTimeColumn(getField(fields, "commitTimeStamp"), "commitTimeStamp"),
            getTableDateTimeColumn(getField(fields, "commitId"), "commitId"),
            getTableTextColumn(getField(fields, "repositoryName"), "repositoryName"),
            getTableTextColumn(getField(fields, "commitMessage"), "commitMessage"),

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
        <div>
            <FilterContainer

                isLoading={isLoading}
                title={tableTitle}
                titleIcon={tableTitleIcon}
                body={getTable()}
                className={"px-2 pb-2"}
                loadData={loadData}
                setFilterDto={setFilterModel}
                filterDto={filterModel}
                exportButton={<ExportGitlabCommitsByAuthorDetailsButton className={"ml-2"} isLoading={isLoading} scanData={data} />}
            />
        </div>
    );
}

GitlabCommitsByAuthorActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    tableTitleIcon: PropTypes.object,
};

export default GitlabCommitsByAuthorActionableTable;
