import React, { useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import { gitlabLeadTimeMetadata } from "./gitlabLeadTime.metadata";
import {
     getTableDurationTextColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {faTable} from "@fortawesome/pro-light-svg-icons";

function GitlabLeadTimeInsightsModal({ data, isLoading, loadData, filterModel, setFilterModel, tableTitleIcon, count, range }) {
    const fields = gitlabLeadTimeMetadata.commitFields;
    const tableTitle = "Deployments Report";
    const noDataMessage = "No data available";

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "authorName")),
            getTableTextColumn(getField(fields, "branch")),
            getTableTextColumn(getField(fields, "commitTimeStamp")),
            getTableTextColumn(getField(fields, "commitTitle")),
            getTableDurationTextColumn(getField(fields, "leadTime")),
            getTableTextColumn(getField(fields, "repositoryUrl")),
            getTableTextColumn(getField(fields, "stepId")),
        ],
        []
    );

    const getTable = () => {
        return (
            <CustomTable
                // isLoading={isLoading}
                // loadData={loadData}
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
            {/*show={visible}*/}
            {/*onHide={() => onHide()}*/}
            <FilterContainer
                //isLoading={isLoading}
                title={tableTitle}
                titleIcon={faTable}
                body={getTable()}
                className={"px-2 pb-2"}
                // loadData={loadData}
                // setFilterDto={setFilterModel}
                // filterDto={filterModel}
            />
        </div>
    );
}

GitlabLeadTimeInsightsModal.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    priority: PropTypes.number,
    tableTitleIcon: PropTypes.object,
    count: PropTypes.number,
    range: PropTypes.string,
};

export default GitlabLeadTimeInsightsModal;
