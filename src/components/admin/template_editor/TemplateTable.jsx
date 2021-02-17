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
import FilterContainer from "components/common/table/FilterContainer";
import {faStream} from "@fortawesome/pro-light-svg-icons";

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

  const onRowSelect = (rowData, type) => {
    history.push(`/admin/templates/details/${rowData.original._id}`);
  };

  const createTemplate = () => {
    setShowCreateTemplateModal(true);
  };

  const getTemplateTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        noDataMessage={noDataMessage}
        data={data}
        columns={columns}
        rowStyling={rowStyling}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createTemplate}
        isLoading={isLoading}
        body={getTemplateTable()}
        titleIcon={faStream}
        title={"Pipeline Templates"}
        type={"Pipeline Template"}
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