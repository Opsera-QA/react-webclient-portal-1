import React, { useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import SalesforceCodeAnalyserActionableMetadata from "./SalesforceCodeAnalyserActionable.metadata";
import {
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";

function SalesforceCodeAnalyserPipelineActionableTable({ data, isLoading, loadData, filterModel, setFilterModel, tableTitleIcon }) {
    const fields = SalesforceCodeAnalyserActionableMetadata.fields;
    const tableTitle = "Salesforce Code Analyser Pipeline Report";
    const noDataMessage = "No data available";

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "pipeline"), "pipeline"),
            getTableTextColumn(getField(fields, "stepId"), "stepId"),
            getTableDateTimeColumn(getField(fields, "jobType"), "jobType"),
            getTableTextColumn(getField(fields, "runCount"), "runCount"),
            getTableTextColumn(getField(fields, "totalCount"), "totalCount"),
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
            />
        </div>
    );
}

SalesforceCodeAnalyserPipelineActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    priority: PropTypes.number,
    tableTitleIcon: PropTypes.object,
};

export default SalesforceCodeAnalyserPipelineActionableTable;