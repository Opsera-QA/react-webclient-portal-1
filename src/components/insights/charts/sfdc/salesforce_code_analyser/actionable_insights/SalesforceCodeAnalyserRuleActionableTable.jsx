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

function SalesforceCodeAnalyserRuleActionableTable({ data, isLoading, loadData, filterModel, setFilterModel, tableTitleIcon,kpiConfiguration,dashboardData }) {
    const fields = SalesforceCodeAnalyserActionableMetadata.fields;
    const tableTitle = "Salesforce Code Analyser Rule Report";
    const noDataMessage = "No data available";
    const toastContext = useContext(DialogToastContext);

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "_id"), "_id"),
            getTableTextColumn(getField(fields, "ruleIssues"), "ruleIssues"),
        ],
        []
    );

    const onRowSelect = (rowData) => {
        toastContext.showOverlayPanel(
            <SalesforceCodeAnalyserRuleActionableTwoOverlay
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
                rule={rowData?.original?._id}
            />
        );
    };


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
                onRowSelect={onRowSelect}
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

SalesforceCodeAnalyserRuleActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    priority: PropTypes.number,
    tableTitleIcon: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default SalesforceCodeAnalyserRuleActionableTable;