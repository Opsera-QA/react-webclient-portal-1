import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import JenkinsChangeFailureRateActionableMetadata from "./jenkins-change-failure-actionable-metadata";
import {
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";

function JenkinsChangeFailureRateActionableTable({ data, isLoading, loadData, filterModel, setFilterModel, title }) {
    const fields = JenkinsChangeFailureRateActionableMetadata.fields;
    const tableTitle = "Jenkins Failures Actionable Insights Table";
    const noDataMessage = "Jenkins report is currently unavailable at this time";

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "jenkinsJobName"), "jenkinsJobName"),
            getTableTextColumn(getField(fields, "buildNumber"), "buildNumber"),
            getTableDateTimeColumn(getField(fields, "timestamp"), "timestamp"),
            getTableTextColumn(getField(fields, "duration"), "duration"),
            getTableTextColumn(getField(fields, "url"), "url"),
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
            titleIcon={faDraftingCompass}
            body={getTable()}
            className={"px-2 pb-2"}
            loadData={loadData}
            setFilterDto={setFilterModel}
            filterDto={filterModel}
        />
    );
}

JenkinsChangeFailureRateActionableTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    title: PropTypes.string,
};

export default JenkinsChangeFailureRateActionableTable;