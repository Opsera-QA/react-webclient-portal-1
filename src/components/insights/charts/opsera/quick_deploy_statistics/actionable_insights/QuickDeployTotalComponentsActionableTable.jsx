import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import QuickDeploymentActionableMetadata from "./quick-deploy-actionable-insights-metadata";
import {
    getTableBooleanIconColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { useHistory } from "react-router-dom";

// TODO: Convert to cards
function QuickDeployTotalComponentsActionableTable({ data, component, isLoading, loadData, filterModel, setFilterModel, title }) {
    const toastContext = useContext(DialogToastContext);
    const fields = QuickDeploymentActionableMetadata.fields;
    const tableTitle = "Quick Deploy Total Components Table";
    const noDataMessage = "Quick Deploy report is currently unavailable at this time";
    let history = useHistory();

    const newData = [];
    data.forEach((obj) => {if(obj?.component == component){newData.push(obj);}});

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "task"), "task"),
            getTableTextColumn(getField(fields, "runCount"), "runCount"),
            getTableTextColumn(getField(fields, "timestamp"), "timestamp"),
            getTableBooleanIconColumn(getField(fields, "validation"), "validation"),
            getTableBooleanIconColumn(getField(fields, "unitTests"), "unitTests"),
        ],
        []
    );

    const onRowSelect = (rowData) => {
        const task = rowData?.original?.task;

        toastContext.clearOverlayPanel();
        history.push(`/task/details/${task}`);
    };

    const getTable = () => {
        return (
            <CustomTable
                isLoading={isLoading}
                loadData={loadData}
                columns={columns}
                data={newData}
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

QuickDeployTotalComponentsActionableTable.propTypes = {
    data: PropTypes.array,
    component: PropTypes.string,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    title: PropTypes.string,
};

export default QuickDeployTotalComponentsActionableTable;