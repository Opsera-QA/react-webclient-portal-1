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
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faStream} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import { taskTemplateMetadata } from "components/admin/task_templates/taskTemplate.metadata";
import NewTaskTemplateOverlay from "components/admin/task_templates/create/NewTaskTemplateOverlay";

export default function TaskTemplatesTable(
  {
    taskTemplates,
    loadData,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = taskTemplateMetadata.fields;

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

  const onRowSelect = (rowData) => {
    history.push(`/admin/templates/tasks/details/${rowData.original._id}`);
  };

  const createTemplate = () => {
    toastContext.showOverlayPanel(
      <NewTaskTemplateOverlay
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
        data={taskTemplates}
        columns={columns}
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
        title={"Task Templates"}
        type={"Task Template"}
        className={"px-2 pb-2"}
      />
  );
}

TaskTemplatesTable.propTypes = {
  taskTemplates: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};