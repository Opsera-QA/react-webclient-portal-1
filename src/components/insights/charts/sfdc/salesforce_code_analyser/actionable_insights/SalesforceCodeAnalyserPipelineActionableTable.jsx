import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import SalesforceCodeAnalyserActionableMetadata from "./SalesforceCodeAnalyserActionable.metadata";
import {
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import SalesforceCodeAnalyserRuleActionableTwoOverlay
    from "./actionable_insights2/SalesforceCodeAnalyserRuleActionableTwoOverlay";

function SalesforceCodeAnalyserPipelineActionableTable({ data, isLoading, loadData, filterModel, setFilterModel, tableTitleIcon,total }) {
    const fields = SalesforceCodeAnalyserActionableMetadata.fields;
    const tableTitle = "Pipeline Report";
    const noDataMessage = "No data available";
    const toastContext = useContext(DialogToastContext);

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "pipeline"), "pipeline"),
            getTableTextColumn(getField(fields, "stepId"), "stepId"),
            getTableTextColumn(getField(fields, "jobType"), "jobType"),
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
            <div className={'ml-4'}>
                <b>Total Issues:</b> {total}
            </div>
            <div className="mb-3"/>
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
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    total: PropTypes.number,
};

export default SalesforceCodeAnalyserPipelineActionableTable;