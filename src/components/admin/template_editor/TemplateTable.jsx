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
import NewTemplateOverlay from "components/admin/template_editor/NewTemplateOverlay";
import templateEditorMetadata from "components/admin/template_editor/pipelineTemplate.metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faStream} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";

function TemplateTable({ data, loadData, isLoading, templateFilterDto, setTemplateFilterDto, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = templateEditorMetadata.fields;

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

  const onRowSelect = (rowData, type) => {
    history.push(`/admin/templates/details/${rowData.original._id}`);
  };

  const createTemplate = () => {
    toastContext.showOverlayPanel(<NewTemplateOverlay loadData={loadData} isMounted={isMounted} />);
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

TemplateTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  templateFilterDto: PropTypes.object,
  setTemplateFilterDto: PropTypes.func
};

export default TemplateTable;