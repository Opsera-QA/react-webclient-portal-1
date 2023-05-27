import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import tagMetadata from "components/settings/tags/tag.metadata";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import tagTypeConstants from "@opsera/definitions/constants/settings/tags/tagType.constants";
import {tagHelper} from "components/settings/tags/tag.helper";

export default function TagsTable(
  {
    data,
    loadData,
    isLoading,
    error,
  }) {
  const history = useHistory();
  const fields = tagMetadata.fields;

  const columns = useMemo(
    () => [
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), tagTypeConstants.getTagTypeLabel),
      getTableTextColumn(getField(fields, "value")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getTableDateColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(tagHelper.getDetailViewLink(rowData.original._id));
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  return (
    <CustomTable
      onRowSelect={onRowSelect}
      data={data}
      rowStyling={rowStyling}
      columns={columns}
      isLoading={isLoading}
      loadData={loadData}
      error={error}
    />
  );
}

TagsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
};
