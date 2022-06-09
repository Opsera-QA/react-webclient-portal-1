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
import CustomTable from "../../../../../../../../common/table/CustomTable";

function ProvarLogSummaryTable({ provarObj }) {
    const fields = provarSummaryLogResultMetadata?.fields;

    const columns = useMemo(
        () => [
            {
                Header: "Class Name",
                accessor: "className",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Time",
                accessor: "time"
            },
            {
                Header: "Failure Reason",
                accessor: "failure",
                Cell: function formatValue(row) {
                    if (row?.value?.content) {
                        return row?.value?.content;
                    }
                    return "N/A";
                }
            },
        ],
        []
    );

    const getComponentResultsTable = () => {
        return (
            <CustomTable
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