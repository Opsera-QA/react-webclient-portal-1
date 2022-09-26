import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {
  getTableTextColumn,
  getStaticInfoColumn,
  getRoleAccessLevelColumn
} from "components/common/table/table-column-helpers-v2";
import {useHistory} from "react-router-dom";
import VanityTable from "components/common/table/VanityTable";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";

function ConsolidatedUserReportToolAccessTable({ data, isLoading, paginationModel, setPaginationModel, loadData }) {
  let history = useHistory();
  const fields = registryToolMetadata.fields;

  const onRowSelect = (grid, row) => {
    history.push(`/inventory/tools/details/${row?._id}`);
  };
 
  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getRoleAccessLevelColumn(fields.find(field => { return field.id === "role_access_level";})),
      // getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      getStaticInfoColumn()
    ],
    [],
  );

  const getNoDataMessage = () => {
    const activeFilters = paginationModel?.getActiveFilters();
    if (activeFilters && activeFilters.length > 0) {
      return "No tools meeting the filter requirements were found.";
    }

    return "No tools found for this user account.";
  };

  return (
    <VanityTable
      columns={columns}
      onRowSelect={onRowSelect}
      paginationModel={paginationModel}
      loadData={loadData}
      noDataMessage={getNoDataMessage()}
      tableHeight={"250px"}
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