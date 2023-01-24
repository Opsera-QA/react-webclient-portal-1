import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTally} from "@fortawesome/pro-light-svg-icons";
import gitScraperScanReportMetadata from "./gitScraperReportTable.metadata";
import ExportGitScraperScanDetailsButton from "./export/ExportGitScraperScanDetailsButton";

function GitScraperScanReportTable(
    {
        data,
        isLoading,
        loadData,
        filterModel,
        setFilterModel,
        repository,
        branch
    }) {
    const fields = gitScraperScanReportMetadata.fields;

    const columns = useMemo(
        () => [
            getTableTextColumn(fields.find(field => { return field.id === "path";})),
            getTableTextColumn(fields.find(field => { return field.id === "author";})),
            getTableTextColumn(fields.find(field => { return field.id === "lineNumber";})),
            getTableTextColumn(fields.find(field => { return field.id === "commit";})),
            getTableTextColumn(fields.find(field => { return field.id === "commitDate";})),
            getTableTextColumn(fields.find(field => { return field.id === "reason";})),
        ],
        []
    );

    const getGitScraperScanReportTable = () => {
        return (
            <CustomTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                paginationDto={filterModel}
                setPaginationDto={setFilterModel}
                loadData={loadData}
            />
        );
    };

    return (
        <div>
            <div className={"d-flex details-title-text"}>
                <div className={'mr-4'}>
                    <b>Repository:</b> {repository}
                </div>
                <div className={'mr-4'}>
                    <b>Branch:</b> {branch}
                </div>
            </div>
        <FilterContainer
            loadData={loadData}
            isLoading={isLoading}
            body={getGitScraperScanReportTable()}
            titleIcon={faTally}
            title={"Git Scraper Vulnerabilities Report"}
            className={"px-2 pb-2"}
            exportButton={<ExportGitScraperScanDetailsButton className={"ml-2"} isLoading={isLoading} scanData={data} />}
        />
        </div>
    );
}

GitScraperScanReportTable.propTypes = {
    data: PropTypes.array,
    allCoverityIssues: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    repository: PropTypes.string,
    branch: PropTypes.string,
};

export default GitScraperScanReportTable;