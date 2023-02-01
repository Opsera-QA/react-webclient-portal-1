import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import DoraJiraActionableMetadata from "./doraJiraActionable_metadata";
import {
    getTableTextColumn, getTableTextColumnWithoutField, getCustomTableAccessor
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import {useHistory} from "react-router-dom";

// TODO: Convert to cards
function DoraJiraDashboardsActionableTable({ data, isLoading, loadData, filterModel, setFilterModel, org }) {
    const toastContext = useContext(DialogToastContext);
    const fields = DoraJiraActionableMetadata.fields;
    const tableTitle = org + " Dashboards Report";
    const noDataMessage = "Dora report is currently unavailable at this time";
    let history = useHistory();

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "dashboardName"), "dashboardName"),
            getTableTextColumn(getField(fields, "dashboardId"), "dashboardId"),
            getTableTextColumnWithoutField("Dashboard Link", "_blueprint"),
        ],
        []
    );

    const onRowSelect = (rowData) => {
        const row = rowData?.original;
        const dashboardId = row?.dashboardId;

        toastContext.clearOverlayPanel();
        history.push(`/insights/dashboards/${dashboardId}/viewer`);
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

DoraJiraDashboardsActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    title: PropTypes.string,
    org:PropTypes.string,
};

export default DoraJiraDashboardsActionableTable;