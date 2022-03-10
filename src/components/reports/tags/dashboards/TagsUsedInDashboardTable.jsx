import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getLimitedTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import ExportTagReportButton from 'components/common/buttons/export/reports/ExportTagReportButton';
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";

function TagsUsedInDashboardTable({ data, loadData, isLoading}) {
  const history = useHistory();
  let fields = dashboardMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getLimitedTableTextColumn(getField(fields, "description"),100),
      getTableTextColumn(getField(fields, "_id")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/insights/dashboards/${rowData.original._id}/viewer`);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const getTagsTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      supportSearch={false}
      isLoading={isLoading}
      body={getTagsTable()}
      metadata={dashboardMetadata}
      titleIcon={faChartNetwork}
      title={"Dashboards"}
      exportButton={<ExportTagReportButton className={"ml-2"} isLoading={isLoading} tagData={data} />}
    />
  );
}

TagsUsedInDashboardTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  tagFilterDto: PropTypes.object,
  activeTagFilterDto: PropTypes.object,
  setTagFilterDto: PropTypes.func,
  isMounted: PropTypes.object
};

export default TagsUsedInDashboardTable;