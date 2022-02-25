import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import toolIdentifierMetadata from "./tool-identifier-metadata";
import {
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";

function ToolIdentifierTable({toolIdentifiers, isLoading}) {
  const history = useHistory();
  let fields = toolIdentifierMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "identifier")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getTableBooleanIconColumn(getField(fields, "enabledInRegistry")),
    ],
    []
  );

  const noDataMessage = "No tool identifiers are currently registered";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const onRowSelect = (rowData, type) => {
    history.push(`/admin/tools/identifiers/details/${rowData.original._id}`);
  };

  return (
    <CustomTable
      className={"no-table-border"}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      data={toolIdentifiers}
      columns={columns}
      rowStyling={rowStyling}
      noDataMessage={noDataMessage}
    />
  );
}

ToolIdentifierTable.propTypes = {
  isLoading: PropTypes.bool,
  toolIdentifiers: PropTypes.array,
};

export default ToolIdentifierTable;