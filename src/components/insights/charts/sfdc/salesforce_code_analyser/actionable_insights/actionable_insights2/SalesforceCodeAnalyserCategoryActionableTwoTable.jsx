import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import SalesforceCodeAnalyserActionableTwoMetadata from "./SalesforceCodeAnalyserActionableTwo.metadata";
import {
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import BlueprintLogOverlay from "../../../../../../blueprint/BlueprintLogOverlay";
import {DialogToastContext} from "../../../../../../../contexts/DialogToastContext";

function SalesforceCodeAnalyserCategoryActionableTwoTable({ data, isLoading, loadData, filterModel, setFilterModel, tableTitleIcon, kpiConfiguration, dashboardData }) {
    const fields = SalesforceCodeAnalyserActionableTwoMetadata.fields;
    const tableTitle = " Category Issues Report";
    const noDataMessage = "No data available";
    const toastContext = useContext(DialogToastContext);

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "fileName"), "fileName"),
            getTableTextColumn(getField(fields, "rule"), "rule"),
            getTableTextColumn(getField(fields, "description"), "description"),
            getTableTextColumn(getField(fields, "engine"), "engine"),
            getTableTextColumn(getField(fields, "lineNumber"), "lineNumber"),
            getTableTextColumn(getField(fields, "column"), "column"),
            getTableTextColumn(getField(fields, "severity"), "severity"),

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

SalesforceCodeAnalyserCategoryActionableTwoTable.propTypes = {
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

export default SalesforceCodeAnalyserCategoryActionableTwoTable;