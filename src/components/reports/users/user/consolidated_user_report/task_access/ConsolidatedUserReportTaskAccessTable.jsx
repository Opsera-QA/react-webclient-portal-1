import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableTextColumn, getStaticIconColumn} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import gitTasksMetadata from "components/git/git-tasks-metadata";

function ConsolidatedUserReportTaskAccessTable({ data, isLoading, paginationModel, setPaginationModel, loadData }) {
  let history = useHistory();
  const fields = gitTasksMetadata.fields;

  const onRowSelect = (rowData) => {
    history.push(`/inventory/tools/details/${rowData.original._id}`);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getTableTextColumn(fields.find(field => { return field.id === "_id";})),
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
      data={data}
      isLoading={isLoading}
    />
  );
}

ConsolidatedUserReportTaskAccessTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default ConsolidatedUserReportTaskAccessTable;