import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import boomiReportMetaData
    from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/boomi/metadata/boomiReport.metadata";
import {
    getColumnHeader, getColumnId, getTableBooleanIconColumn, getTableDateColumn,
    getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "../../../../../../../common/icons/IconBase";

function BoomiErrorSummaryTable({ boomiObj }) {
    const fields = boomiReportMetaData?.fields;

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields,"componentId")),
            getTableTextColumn(getField(fields,"packageVersion"),undefined, 130),
            getTableTextColumn(getField(fields,"notes")),
            getTableTextColumn(getField(fields,"packageId")),
            getTableTextColumn(getField(fields,"componentVersion"),undefined, 150),
            getTableTextColumn(getField(fields,"componentType"),undefined, 150),
            getTableTextColumn(getField(fields,"createdDate")),
            getTableTextColumn(getField(fields,"createdBy")),
            getTableBooleanIconColumn(getField(fields,"shareable"),undefined, 80),
            getTableTextColumn(getField(fields,"errorMessage")),
        ],
        []
    );

    const getComponentResultsTable = () => {
        if (!Array.isArray(boomiObj) || boomiObj.length === 0) {
            return (
                <div className={"my-3 p-2"}>
                    <IconBase className={"mr-2"} icon={faCheckCircle} />
                    There were no errors identified with this execution.
                </div>
            );
        }

        return (
            <VanityTable
                data={boomiObj}
                columns={columns}
                tableHeight={"14.1vh"}
            />
        );
    };

    return (
        <FilterContainer
            showBorder={false}
            body={getComponentResultsTable()}
            titleIcon={faExclamationCircle}
            title={`Failed Components`}
            className={"mt-5"}
        />
    );
}

BoomiErrorSummaryTable.propTypes = {
    boomiObj: PropTypes.array,
};

export default BoomiErrorSummaryTable;