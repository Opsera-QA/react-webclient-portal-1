import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {getField} from "components/common/metadata/metadata-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function WorkspaceRegistryTable(
  {
    tools,
    toolMetadata,
    loadData,
    isLoading,
    rowClickFunction,
  }) {
  const {
    isMounted,
  } = useComponentStateReference();
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(toolMetadata);
  }, [JSON.stringify(toolMetadata)]);

  const loadColumnMetadata = (newToolMetadata) => {
    if (isMounted?.current === true && Array.isArray(newToolMetadata?.fields)) {
      const fields = newToolMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
          getTableTextColumn(getField(fields, "tool_identifier"), "no-wrap-inline"),
          getTableDateColumn(getField(fields, "createdAt")),
        ]
      );
    }
  };

  // TODO: This is temporary until I finish the tool info overlay
  const onRowSelect = (rowData) => {
    if (rowClickFunction) {
      rowClickFunction(rowData?.original);
    }
    else {
      history.push(`/inventory/tools/details/${rowData.original._id}`);
    }
  };

  if (toolMetadata == null) {
    return null;
  }

  return (
    <CustomTable
      columns={columns}
      data={tools}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      loadData={loadData}
    />
  );
}

WorkspaceRegistryTable.propTypes = {
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolMetadata: PropTypes.object,
  rowClickFunction: PropTypes.func,
};

export default WorkspaceRegistryTable;