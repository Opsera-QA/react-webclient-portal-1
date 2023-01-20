import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {
  getLimitedTableTextColumn, getRoleAccessColumn,
  getTableDateColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function DashboardsTable({dashboards, dashboardFilterModel, setDashboardFilterModel, loadData, isLoading}) {
  const history = useHistory();
  const fields = dashboardMetadata.fields;
  const {
    isSaasUser,
  } = useComponentStateReference();

  const columns = useMemo(
    () => {

      const newColumns = [
        getTableTextColumn(getField(fields, "name")),
        getTableTextColumn(getField(fields, "owner_name")),
        getLimitedTableTextColumn(getField(fields, "description"), 100),
        { ...getTableTextColumn(getField(fields, "type")), class: "upper-case-first" },
        getTableDateColumn(getField(fields, "createdAt")),
      ];

      if (isSaasUser === false) {
        newColumns.push(getRoleAccessColumn("Dashboard"));
      }

      return newColumns;
    },
    [fields, isSaasUser]
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
      nextGeneration={true}
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