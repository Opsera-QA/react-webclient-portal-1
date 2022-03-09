import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getLimitedTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import ExportTagReportButton from 'components/common/buttons/export/reports/ExportTagReportButton';

function TagsUsedInToolsTable({ data, loadData, isLoading}) {
  const history = useHistory();
  let fields = pipelineSummaryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getTableTextColumn(getField(fields, "_id")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableDateColumn(getField(fields, "updatedAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push("/inventory/tools/details/" + rowData.original._id);
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
      metadata={pipelineSummaryMetadata}
      titleIcon={faTags}
      title={"Tags"}
      className={"px-2 pb-2"}
      exportButton={<ExportTagReportButton className={"ml-2"} isLoading={isLoading} tagData={data} />}
    />
  );
}

TagsUsedInToolsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  tagFilterDto: PropTypes.object,
  activeTagFilterDto: PropTypes.object,
  setTagFilterDto: PropTypes.func,
  isMounted: PropTypes.object
};

export default TagsUsedInToolsTable;