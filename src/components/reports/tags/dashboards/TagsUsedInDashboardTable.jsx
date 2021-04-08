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
import ExportTagsInPipelineButton from 'components/common/buttons/export/tags_in_pipeline_report/ExportTagsInPipelineButton';

function TagsUsedInDashboardTable({ data, loadData, isLoading}) {
  const history = useHistory();
  let fields = pipelineSummaryMetadata.fields;

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
        className="table-no-border"
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
      exportButton={<ExportTagsInPipelineButton className={"ml-2"} isLoading={isLoading} tagData={data} />}
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