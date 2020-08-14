import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";
import toolMetadata from "./tool-metadata";
import {useHistory} from "react-router-dom";
import NewToolTypeModal from "./NewToolTypeModal";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {DropdownList} from "react-widgets";

function ToolsTable({ data, filterOptionList }) {
  const [showCreateToolModal, setShowCreateToolModal] = useState(false);
  const [tableFilter, setTableFilter] = useState();
  let history = useHistory();
  const fields = toolMetadata.fields;

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "tool_identifier"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  const createNewTool = () => {
    setShowCreateToolModal(true);
  };

  const onRowSelect = (rowData) => {
    history.push(`/inventory/tools/details/${rowData.original._id}`);
  };

  const updateFilterOption = (filterOption) => {
    setTableFilter(filterOption);
  };

  return (
    <>
      {showCreateToolModal && <NewToolTypeModal onModalClose={setShowCreateToolModal} showModal={showCreateToolModal}/>}

      <div className="custom-table-filter d-flex flex-row-reverse">
        <div className="my-1 text-right">
          <Button variant="primary" size="sm"
                  onClick={() => { createNewTool(); }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Type
          </Button>
          <br />
        </div>
        <div className="tool-filter mr-2 mt-1">
          { filterOptionList && <DropdownList
            busy={Object.keys(filterOptionList).length === 1}
            disabled={Object.keys(filterOptionList).length === 1}
            data={filterOptionList}
            valueField='filterText'
            textField='text'
            filter="contains"
            defaultValue={tableFilter}
            onChange={updateFilterOption}
          />}
        </div>
      </div>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={data}
          onRowSelect={onRowSelect}
          rowStyling={rowStyling}
          tableFilter={tableFilter}
          tableStyleName="custom-table-2"
        >
        </CustomTable>
      </div>
    </>
  );
}

ToolsTable.propTypes = {
  data: PropTypes.array,
  filterOptionList: PropTypes.array
};

export default ToolsTable;