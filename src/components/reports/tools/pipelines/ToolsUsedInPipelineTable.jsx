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
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import ExportToolsUsedInPipelineReportButton from 'components/common/buttons/export/reports/ExportToolsUsedInPipelineReportButton';
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
    history.push("/workflow/details/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const getPipelinesTable = () => {
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
      body={getPipelinesTable()}
      metadata={dashboardMetadata}
      titleIcon={faDraftingCompass}
      title={"Pipelines"}
      exportButton={<ExportToolsUsedInPipelineReportButton className={"ml-2"} isLoading={isLoading} pipelineData={data} />}
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