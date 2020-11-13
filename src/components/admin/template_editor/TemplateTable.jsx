import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import NewTemplateModal from "./NewTemplateModal";
import templateEditorMetadata from "./template-form-fields";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";

function TemplateTable({ data, loadData, isLoading }) {
  const fields = templateEditorMetadata.fields;
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableTextColumn(fields.find(field => { return field.id === "account"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "readOnly"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "singleUse"})),
    ],
    []
  );

  const noDataMessage = "No templates are currently available";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData, type) => {
    history.push(`/admin/templates/details/${rowData.original._id}`);
  };

  const createTemplate = () => {
    setShowCreateTemplateModal(true);
  };

  return (
    <>
      <div className="justify-content-between mb-1 d-flex">
        <h5>Template Management</h5>
      </div>
        <CustomTable
          columns={columns}
          data={data}
          onRowSelect={selectedRow}
          noDataMessage={noDataMessage}
          isLoading={isLoading}
          rowStyling={rowStyling}
          tableTitle={"Pipeline Templates"}
          type={"Pipeline Template"}
          createNewRecord={createTemplate}
        >
        </CustomTable>
      <NewTemplateModal setShowModal={setShowCreateTemplateModal} loadData={loadData} showModal={showCreateTemplateModal}/>
    </>
  );
}

TemplateTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default TemplateTable;