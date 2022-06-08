import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import provarSummaryLogResultMetadata from "./provarSummaryLogResultMetadata";
import {
    getColumnHeader, getColumnId,
    getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";

function ProvarLogSummaryTable({ provarObj }) {
    const fields = provarSummaryLogResultMetadata?.fields;

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "className")),
            getTableTextColumn(getField(fields, "name")),
            getTableTextColumn(getField(fields, "time")),
        ],
        []
    );

    const getComponentResultsTable = () => {
        return (
            <VanityTable
                data={provarObj}
                columns={columns}
                tableHeight={"28.2vh"}
            />
        );
    };

    if (!Array.isArray(provarObj) || provarObj.length === 0) {
        return (
            <div className={"mt-3"}>
                <IconBase className={"mr-2"} icon={faCheckCircle} />
                There was no test data identified with this execution.
            </div>
        );
    }

    return (
        <FilterContainer
            showBorder={false}
            body={getComponentResultsTable()}
            titleIcon={faExclamationCircle}
            title={`Report`}
            className={"mt-2"}
        />
    );
}

ProvarLogSummaryTable.propTypes = {
    provarObj: PropTypes.array,
};

export default ProvarLogSummaryTable;