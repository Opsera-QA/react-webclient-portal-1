import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
  getOwnerNameField,
  getColumnHeader,
  getColumnId,
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import toolLogsMetadata from "components/inventory/tools/tool_details/tool-logs-metadata";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import VanityTable from "components/common/table/VanityTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import ToolLogDetailsOverlay from "components/inventory/tools/tool_details/logs/ToolLogDetailsOverlay";

// TODO: Move to general column helpers if reused
const getToolActivityColumn = (field, className, width = 120) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    width: width,
    template: function (text, row, col) {
      if (text == null) {
        return (`
          <span>
            <i class="fal fa-question-circle cell-icon vertical-align-item"></i>
            <span class="ml-1">Unknown Status</span>
          </span>
        `);
      }
      const icon = text === "success" ? "fa-check-circle green" : "fa-times-circle red";

      return (
        `<span>
          <i class="fal ${icon} cell-icon vertical-align-item"></i>
          <span class="ml-1">${capitalizeFirstLetter(text)}</span>
        </span>`
      );
    },
    class: className ? className : "upper-case-first"
  };
};

export const getTableInfoIconColumn = (className) => {
  return {
    header: "Info",
    id: "fake",
    template: function (text, row, col) {
      if (row?.action === "automation task") {
        return "";
      }

      return (`
        <span>
          <i class="fal fa-search-plus cell-icon vertical-align-item"></i>
        </span>
      `);
    },
    maxWidth: 50,
    class: className ? className : undefined
  };
};

function ToolLogsTable({ toolLogs, toolLogFilterModel, setToolLogFilterModel, loadData, isLoading }) {
  const fields = toolLogsMetadata.fields;
  const toastContext = useContext(DialogToastContext);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "action"), "upper-case-first", 150),
      getOwnerNameField(150, "User"),
      getToolActivityColumn(getField(fields, "status")),
      getTableTextColumn(getField(fields, "message")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
      getTableInfoIconColumn()
    ],
    [],
  );

  const getToolLogsTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={toolLogs}
        loadData={loadData}
        isLoading={isLoading}
        paginationModel={toolLogFilterModel}
        setPaginationModel={setToolLogFilterModel}
        onRowSelect={onRowSelect}
      />
    );
  };

  const onRowSelect = (treeGrid, row) => {
    if (row?.action !== "automation task") {
      toastContext.showOverlayPanel(
        <ToolLogDetailsOverlay
          toolLogData={row}
        />
      );
    }
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={toolLogFilterModel}
      setFilterDto={setToolLogFilterModel}
      isLoading={isLoading}
      body={getToolLogsTable()}
      metadata={toolLogsMetadata}
      showBorder={false}
      supportSearch={true}
      titleIcon={faTable}
      title={"Logs"}
      className={"px-2 pb-2"}
    />
  );
}

ToolLogsTable.propTypes = {
  toolLogs: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolLogFilterModel: PropTypes.object,
  setToolLogFilterModel: PropTypes.func,
};

export default ToolLogsTable;