import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import NewTemplateModal from "components/admin/template_editor/NewTemplateModal";
import templateEditorMetadata from "components/admin/template_editor/template-metadata";
import {getField} from "components/common/metadata/metadata-helpers";

function TemplateTable({ data, loadData, isLoading }) {
  const fields = templateEditorMetadata.fields;
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableTextColumn(getField(fields, "account")),
      getTableBooleanIconColumn(getField(fields, "readOnly")),
      getTableBooleanIconColumn(getField(fields, "singleUse")),
      getTableBooleanIconColumn(getField(fields, "publicUse")),
      getTableBooleanIconColumn(getField(fields, "active")),
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
    <div className="px-2 pb-2">
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
      />
      <NewTemplateModal setShowModal={setShowCreateTemplateModal} loadData={loadData} showModal={showCreateTemplateModal}/>
    </div>
  );
}

TemplateTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default TemplateTable;