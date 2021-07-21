import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableTextColumn, getStaticIconColumn} from "components/common/table/table-column-helpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {useHistory} from "react-router-dom";
import {faSearch} from "@fortawesome/pro-light-svg-icons";

function ConsolidatedUserReportPipelineAccessTable({ data, isLoading, paginationModel, setPaginationModel, loadData }) {
  let history = useHistory();
  const fields = pipelineMetadata.fields;

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const initialState = {
    pageIndex: 0,
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "role_access_level";})),
      getStaticIconColumn(faSearch)
    ],
    [],
  );

  return (
    <CustomTable
      className="table-no-border"
      columns={columns}
      onRowSelect={onRowSelect}
      paginationDto={paginationModel}
      loadData={loadData}
      setPaginationDto={setPaginationModel}
      initialState={initialState}
      data={data}
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