import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";
import {
  getLimitedTableTextColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";

function ToolIdentifierSelectionTable({toolIdentifiers, setDataFunction, isLoading}) {
  let fields = toolIdentifierMetadata.fields;

  const columns = useMemo(
    () => [
      getLimitedTableTextColumn(getField(fields, "name"), 100),
      getLimitedTableTextColumn(getField(fields, "identifier"), 100),
      getTableTextColumn(getField(fields, "description")),
    ],
    []
  );

  const noDataMessage = "No tool identifiers are currently registered";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const onRowSelect = (rowData) => {
    setDataFunction(rowData?.original);
  };

  return (
    <CustomTable
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      data={toolIdentifiers}
      columns={columns}
      rowStyling={rowStyling}
      noDataMessage={noDataMessage}
    />
  );
}

ToolIdentifierSelectionTable.propTypes = {
  isLoading: PropTypes.bool,
  toolIdentifiers: PropTypes.array,
  setDataFunction: PropTypes.func,
};

export default ToolIdentifierSelectionTable;