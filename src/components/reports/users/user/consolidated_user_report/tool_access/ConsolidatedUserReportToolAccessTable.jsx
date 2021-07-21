import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {
  getTableTextColumn,
  getStaticInfoColumn,
  getRoleAccessLevelColumn
} from "components/common/table/table-column-helpers-v2";
import {useHistory} from "react-router-dom";
import toolMetadata from "components/inventory/tools/tool-metadata";
import VanityTable from "components/common/table/VanityTable";

function ConsolidatedUserReportToolAccessTable({ data, isLoading, paginationModel, setPaginationModel, loadData }) {
  let history = useHistory();
  const fields = toolMetadata.fields;

  const onRowSelect = (rowData) => {
    history.push(`/inventory/tools/details/${rowData.original._id}`);
  };
 
  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getRoleAccessLevelColumn(fields.find(field => { return field.id === "role_access_level";})),
      getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      // getStaticInfoColumn()
    ],
    [],
  );

  return (
    <VanityTable
      columns={columns}
      onRowSelect={onRowSelect}
      paginationModel={paginationModel}
      loadData={loadData}
      setPaginationModel={setPaginationModel}
      data={data}
      isLoading={isLoading}
    />
  );
}

ConsolidatedUserReportToolAccessTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default ConsolidatedUserReportToolAccessTable;