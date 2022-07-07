import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import templateEditorMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faStream} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewPipelineTemplateWizard from "components/admin/pipeline_templates/create/wizard/NewPipelineTemplateWizard";

function PipelineTemplatesTable({ pipelineTemplates, loadData, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = templateEditorMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
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

  const onRowSelect = (rowData) => {
    history.push(`/admin/templates/details/${rowData.original._id}`);
  };

  const createTemplate = () => {
    // toastContext.showOverlayPanel(<NewPipelineTemplateOverlay loadData={loadData} />);
    toastContext.showOverlayPanel(
      <NewPipelineTemplateWizard
        loadData={loadData}
      />
    );
  };

  const getTemplateTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        noDataMessage={noDataMessage}
        data={pipelineTemplates}
        columns={columns}
        rowStyling={rowStyling}
      />
    );
  };

  return (
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createTemplate}
        isLoading={isLoading}
        body={getTemplateTable()}
        titleIcon={faStream}
        title={"Pipeline Templates"}
        type={"Pipeline Template"}
        className="px-2 pb-2"
      />
  );
}

PipelineTemplatesTable.propTypes = {
  pipelineTemplates: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default PipelineTemplatesTable;