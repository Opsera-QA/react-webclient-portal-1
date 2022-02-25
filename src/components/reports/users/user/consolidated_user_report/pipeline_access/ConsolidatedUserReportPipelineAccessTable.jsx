import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {
  getTableTextColumn,
  getStaticInfoColumn, getRoleAccessLevelColumn
} from "components/common/table/table-column-helpers-v2";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {useHistory} from "react-router-dom";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";

function ConsolidatedUserReportPipelineAccessTable({ data, isLoading, paginationModel, setPaginationModel, loadData }) {
  let history = useHistory();
  const fields = pipelineMetadata.fields;

  const onRowSelect = (grid, row) => {
    history.push(`/workflow/details/${row?._id}/summary`);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getRoleAccessLevelColumn(fields.find(field => { return field.id === "role_access_level";})),
      getStaticInfoColumn()
    ],
    [],
  );

  const getNoDataMessage = () => {
    const activeFilters = paginationModel?.getActiveFilters();
    if (activeFilters && activeFilters.length > 0) {
      return "No pipelines meeting the filter requirements were found.";
    }

    return "No pipelines found for this user account.";
  };

  return (
    <VanityTable
      columns={columns}
      onRowSelect={onRowSelect}
      paginationModel={paginationModel}
      loadData={loadData}
      noDataMessage={getNoDataMessage()}
      setPaginationModel={setPaginationModel}
      data={data}
      tableHeight={"250px"}
      isLoading={isLoading}
    />
  );
}

ConsolidatedUserReportPipelineAccessTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default ConsolidatedUserReportPipelineAccessTable;