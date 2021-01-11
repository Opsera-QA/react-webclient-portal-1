import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import toolIdentifierMetadata from "./tool-identifier-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../../common/table/table-column-helpers";
import NewToolIdentifierModal from "./NewToolIdentifierModal";

function ToolIdentifierTable({data, loadData, isLoading}) {
  const [showCreateToolIdentifierModal, setShowCreateToolIdentifierModal] = useState(false);
  const history = useHistory();
  let fields = toolIdentifierMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name" })),
      getTableTextColumn(fields.find(field => { return field.id === "description" })),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt" })),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active" })),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "enabledInRegistry" })),
    ],
    []
  );

  const noDataMessage = "No tools are currently registered";

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
    <>
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
      {showCreateToolIdentifierModal && <NewToolIdentifierModal setShowModal={setShowCreateToolIdentifierModal} loadData={loadData} showModal={showCreateToolIdentifierModal}/>}
    </>
  );
}

ToolIdentifierTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default ToolIdentifierTable;