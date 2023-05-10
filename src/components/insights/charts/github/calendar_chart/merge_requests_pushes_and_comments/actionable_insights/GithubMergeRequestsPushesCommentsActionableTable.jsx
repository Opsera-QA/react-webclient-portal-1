import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {getTableDateTimeColumn, getTableTextColumn,} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import GithubMergesPushesCommentsActionableMetadata from "./github-merges-pushes-comments-actionable-metadata";

function GithubMergeRequestsPushesCommentsActionableTable({ data, isLoading, loadData, filterModel, setFilterModel, projectName }) {
    const fields = GithubMergesPushesCommentsActionableMetadata.fields;
    const tableTitle = "Insights Table: " +projectName;
    const noDataMessage = "No report is currently unavailable at this time";



    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "branch"), "branch"),
            getTableTextColumn(getField(fields, "elasticId"), "elasticId"),
            getTableTextColumn(getField(fields, "userName"), "userName"),
            getTableTextColumn(getField(fields, "repositoryName"), "repositoryName"),
            getTableDateTimeColumn(getField(fields, "repositoryCreatedAt"), "repositoryCreatedAt"),
            getTableTextColumn(getField(fields, "repositoryUrl"), "repositoryUrl"),
        ],
        []
    );

    const pullRequestColumns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "elasticId"), "elasticId"),
            getTableTextColumn(getField(fields, "repositoryName"), "repositoryName"),
            getTableDateTimeColumn(getField(fields, "repositoryCreatedAt"), "repositoryCreatedAt"),
            getTableTextColumn(getField(fields, "repositoryUrl"), "repositoryUrl"),
        ],
        []
    );

    const getTable = () => {
        return (
            <CustomTable
                isLoading={isLoading}
                loadData={loadData}
                columns={projectName === "pull_request" ? pullRequestColumns : columns}
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
            titleIcon={faDraftingCompass}
            body={getTable()}
            className={"px-2 pb-2"}
            loadData={loadData}
            setFilterDto={setFilterModel}
            filterDto={filterModel}
        />
    );
}

GithubMergeRequestsPushesCommentsActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    projectName: PropTypes.string,
};

export default GithubMergeRequestsPushesCommentsActionableTable;
