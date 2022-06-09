import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import DeploymentStatisticsActionableTasksMetadata from "./deployment-statistics-actionable-tasks-metadata";
import {
    getTableTextColumn,
    getTableTextColumnWithoutField,
    getTableDurationTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {faDraftingCompass, faTasks} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import {faClipboardCheck} from "@fortawesome/pro-light-svg-icons";

// TODO: Convert to cards
function DeploymentStatisticsTasksActionableTable({
                                                      data,
                                                      isLoading,
                                                      loadData,
                                                      filterModel,
                                                      setFilterModel,
                                                      title,
                                                  }) {
    console.log("data", data);
    const toastContext = useContext(DialogToastContext);
    const fields = DeploymentStatisticsActionableTasksMetadata.fields;
    const tableTitle = "Tasks Deployments Report";
    const noDataMessage = "Tasks report is currently unavailable at this time";

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "task_name"), "task_name"),
            getTableTextColumn(getField(fields, "total"), "total"),
            getTableTextColumn(getField(fields, "success"), "success"),
            getTableTextColumn(getField(fields, "failure"), "failure"),
            getTableDurationTextColumn(getField(fields, "duration"), "duration"),
            getTableDurationTextColumn(getField(fields, "timeToResolve"), "timeToResolve"),
        ],
        []
    );

    // const onRowSelect = (rowData) => {
    //     toastContext.showOverlayPanel(
    //         <BlueprintLogOverlay
    //             pipelineId={rowData?.original?.latest_run[0]?._id?.pipelineId}
    //             runCount={rowData?.original?.latest_run[0]?._id?.run}
    //         />
    //     );
    // };

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
                //onRowSelect={onRowSelect}
            />
        );
    };

    return (
        <FilterContainer
            isLoading={isLoading}
            title={tableTitle}
            titleIcon={faTasks}
            body={getTable()}
            className={"px-2 pb-2"}
            loadData={loadData}
            setFilterDto={setFilterModel}
            filterDto={filterModel}
        />
    );
}

DeploymentStatisticsTasksActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    title: PropTypes.string,
};

export default DeploymentStatisticsTasksActionableTable;
