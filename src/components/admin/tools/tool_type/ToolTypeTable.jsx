import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import toolMetadata from "../../../inventory/tools/tool-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../../common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import NewToolTypeModal from "./NewToolTypeModal";

function ToolTypeTable({ data, loadData }) {
  const [showCreateToolTypeModal, setShowCreateToolTypeModal] = useState(false);
  const history = useHistory();
  let fields = toolMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData, type) => {
    history.push(`/admin/tools/types/details/${rowData.original._id}`);
  };

  const noDataMessage = "No tools are currently registered";

  const handleClose = () => {
    setShowCreateToolTypeModal(false)
    loadData();
  };

  const createToolType = () => {
    setShowCreateToolTypeModal(true);
  };

  return (
    <>
      {showCreateToolTypeModal && <NewToolTypeModal onModalClose={handleClose} showModal={showCreateToolTypeModal}/>}
      <div className="flex-row-reverse mb-1 d-flex">
        <div className="text-right">
          <Button variant="primary" size="sm"
                  onClick={() => {
                    createToolType();
                  }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Type
          </Button>
          <br/>
        </div>
      </div>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={data}
          rowStyling={rowStyling}
          noDataMessage={noDataMessage}
          onRowSelect={selectedRow}
          tableStyleName="custom-table-2"
        />
      </div>
    </>
  );
}

ToolTypeTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func
};

export default ToolTypeTable;