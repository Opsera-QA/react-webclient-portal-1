import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import BoomiActionableMetadata from "./boomi-actionable-insights-metadata";
import {
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { useHistory } from "react-router-dom";
import BlueprintLogOverlay from "../../../../blueprint/BlueprintLogOverlay";

// TODO: Convert to cards
function BoomiActionableInsightsMigrateTable({ data, isLoading, loadData, filterModel, setFilterModel, title }) {
    const toastContext = useContext(DialogToastContext);
    const fields = BoomiActionableMetadata.fields;
    const tableTitle = "Boomi Actionable Insights Table";
    const noDataMessage = "Boomi report is currently unavailable at this time";
    let history = useHistory();

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "pipeline"), "pipeline"),
            getTableTextColumn(getField(fields, "runCount"), "runCount"),
            getTableDateTimeColumn(getField(fields, "timestamp"), "timestamp"),
            getTableTextColumn(getField(fields, "totalPackages"), "totalPackages"),
            getTableTextColumn(getField(fields, "successfulPackages"), "successfulPackages"),
            getTableTextColumn(getField(fields, "failedPackages"), "failedPackages"),
        ],
        []
    );

    const onRowSelect = (rowData) => {
        toastContext.showOverlayPanel(
            <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount}/>
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

BoomiActionableInsightsMigrateTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    title: PropTypes.string,
};

export default BoomiActionableInsightsMigrateTable;