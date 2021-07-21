import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableTextColumn, getStaticIconColumn} from "components/common/table/table-column-helpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {useHistory} from "react-router-dom";
import {faSearch} from "@fortawesome/pro-light-svg-icons";


function LimitedFieldsTable({ data, isLoading, paginationModel, setPaginationModel, loadData, type }) {
  let history = useHistory();
  const fields = pipelineMetadata.fields;

  const onRowSelect = (rowData) => {
    if (type === "pipeline") {
      history.push(`/workflow/details/${rowData.original._id}/summary`);
    }

    if (type === "tool") {
      history.push(`/inventory/tools/details/${rowData.original._id}`);
    }

    if (type === "task") {
      history.push(`/inventory/tools/details/${rowData.original._id}`);
    }
  };
 
  const initialState = {
    pageIndex: 0,
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getStaticIconColumn(faSearch)
    ],
    [],
  );

  const limitedTaskColumns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      getStaticIconColumn(faSearch)
    ],
    [],
  );

  const getColumns = () => {
    if (type === "task") {
      return limitedTaskColumns;
    }

    return columns;
  };

  return (
    <CustomTable
      className="table-no-border"
      columns={getColumns()}
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

LimitedFieldsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  type: PropTypes.string,
};

export default LimitedFieldsTable;