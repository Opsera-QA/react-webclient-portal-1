import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import SalesforcePipelineTableMetadata from "./salesforce-duration-by-stage-actionable-deploy";
import {
    getTableTextColumn,
    getTableTextColumnWithoutField,
    getTableDurationTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass, faTasks } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";

// TODO: Convert to cards
function SalesforceDurationByStageTasksActionableTable({
                                                           data,
                                                           isLoading,
                                                           loadData,
                                                           filterModel,
                                                           setFilterModel,
                                                           title,
                                                       }) {
    const toastContext = useContext(DialogToastContext);
    const fields = SalesforcePipelineTableMetadata.fields;
    const tableTitle = "Tasks Deployments Report";
    const noDataMessage = "Tasks report is currently unavailable at this time";

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "jobType"), "jobType"),
            getTableTextColumn(getField(fields, "total"), "total"),
            getTableTextColumn(getField(fields, "total_success"), "total_success"),
            getTableTextColumn(getField(fields, "total_failed"), "total_failed"),
            getTableDurationTextColumn(getField(fields, "duration"), "duration"),
            getTableDurationTextColumn(getField(fields, "time_to_resolve"), "time_to_resolve"),
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

SalesforceDurationByStageTasksActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    title: PropTypes.string,
};

export default SalesforceDurationByStageTasksActionableTable;
