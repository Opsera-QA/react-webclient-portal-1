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

function BoomiErrorSummaryTable({ boomiObj, jobType }) {
    const fields = boomiReportMetaData?.fields;

    const deployPackageCols = useMemo(
        () => [
            getTableTextColumn(getField(fields,"componentId")),
            getTableTextColumn(getField(fields,"packageVersion")),
            getTableTextColumn(getField(fields,"message")),
            getTableTextColumn(getField(fields, "environmentName")),
        ],
        []
    );

    const migrateCreatePackageCols = useMemo(
        () => [
            getTableTextColumn(getField(fields,"componentId")),
            getTableTextColumn(getField(fields,"packageVersion")),
            getTableTextColumn(getField(fields,"message")),
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
                columns={jobType === "CREATE_PACKAGE_COMPONENT" ? migrateCreatePackageCols : deployPackageCols}
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
    jobType: PropTypes.string
};

export default BoomiErrorSummaryTable;