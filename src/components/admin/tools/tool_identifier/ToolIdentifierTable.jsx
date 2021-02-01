import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import toolIdentifierMetadata from "./tool-identifier-metadata";
import NewToolIdentifierModal from "./NewToolIdentifierModal";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";

function ToolIdentifierTable({data, loadData, isLoading}) {
  const [showCreateToolIdentifierModal, setShowCreateToolIdentifierModal] = useState(false);
  const history = useHistory();
  let fields = toolIdentifierMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
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

  const createToolType = () => {
    setShowCreateToolIdentifierModal(true);
  };

  const selectedRow = (rowData, type) => {
    history.push(`/admin/tools/identifiers/details/${rowData.original._id}`);
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        isLoading={isLoading}
        onRowSelect={selectedRow}
        tableTitle={"Tool Identifiers"}
        type={"Tool Identifier"}
        createNewRecord={createToolType}
      />
      <NewToolIdentifierModal setShowModal={setShowCreateToolIdentifierModal} loadData={loadData} showModal={showCreateToolIdentifierModal}/>
    </div>
  );
}

ToolIdentifierTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default ToolIdentifierTable;