import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import projectSummaryMetadata from "./project-summary-metadata";
import {
  getTableDateColumn,
  getTableTextColumn,
  getTagColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import ExportTagReportButton from 'components/common/buttons/export/reports/ExportTagReportButton';

function TagsUsedInProjectsTable({ data, loadData, isLoading}) {
  let fields = projectSummaryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "key")),
      getTableTextColumn(getField(fields, "owner")),
      getTableTextColumn(getField(fields, "tool_identifier")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableDateColumn(getField(fields, "updatedAt")),
      getTagColumn(getField(fields, "value")),
    ],
    [],
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const getTagsTable = () => {
    return (
      <CustomTable
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
      metadata={projectSummaryMetadata}
      titleIcon={faDraftingCompass}
      title={"Projects"}
      className={"px-2 pb-2"}
      exportButton={<ExportTagReportButton className={"ml-2"} isLoading={isLoading} tagData={data} />}
    />
  );
}

TagsUsedInProjectsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  tagFilterDto: PropTypes.object,
  activeTagFilterDto: PropTypes.object,
  setTagFilterDto: PropTypes.func,
  isMounted: PropTypes.object
};

export default TagsUsedInProjectsTable;