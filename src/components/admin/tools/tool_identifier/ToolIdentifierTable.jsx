import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
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

function ToolIdentifierTable({data, loadData}) {
  const [showCreateToolIdentiferModal, setShowCreateToolIdentiferModal] = useState(false);
  const history = useHistory();
  let fields = toolIdentifierMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => {
        return field.id === "name"
      })),
      getTableTextColumn(fields.find(field => {
        return field.id === "description"
      })),
      getTableDateColumn(fields.find(field => {
        return field.id === "createdAt"
      })),
      getTableBooleanIconColumn(fields.find(field => {
        return field.id === "active"
      })),
    ],
    []
  );

  const noDataMessage = "No tools are currently registered";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const handleClose = () => {
    setShowCreateToolIdentiferModal(false)
    loadData();
  };

  const createToolType = () => {
    setShowCreateToolIdentiferModal(true);
  };

  const selectedRow = (rowData, type) => {
    history.push(`/admin/tools/identifiers/details/${rowData.original._id}`);
  };

  return (
    <>
      {showCreateToolIdentiferModal &&
      <NewToolIdentifierModal onModalClose={handleClose} showModal={showCreateToolIdentiferModal}/>}
      <div className="flex-row-reverse mb-1 d-flex">
        <div className="text-right">
          <Button variant="primary" size="sm"
                  onClick={() => {
                    createToolType();
                  }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Identifier
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

ToolIdentifierTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func
};

export default ToolIdentifierTable;