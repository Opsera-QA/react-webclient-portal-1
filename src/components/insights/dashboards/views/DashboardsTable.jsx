import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {
  getLimitedTableTextColumn,
  getTableDateColumn,
  getTableFavoriteColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";

function DashboardsTable({dashboards, dashboardFilterModel, setDashboardFilterModel, loadData, isLoading}) {
  let history = useHistory();
  const fields = dashboardMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "owner_name")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      {...getTableTextColumn(getField(fields, "type")), class: "upper-case-first"},
      getTableDateColumn(getField(fields, "createdAt")),
      getTableFavoriteColumn(getField(fields, "isFavorite")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/insights/dashboards/${rowData.original._id}/viewer`);
  };

  return (
    <CustomTable
      data={dashboards}
      columns={columns}
      onRowSelect={onRowSelect}
      isLoading={isLoading}
      paginationDto={dashboardFilterModel}
      setPaginationDto={setDashboardFilterModel}
      loadData={loadData}
    />
  );
}

DashboardsTable.propTypes = {
  dashboards: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  dashboardFilterModel: PropTypes.object,
  setDashboardFilterModel: PropTypes.func,
};

export default DashboardsTable;