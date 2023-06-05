import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
  getTableDurationTextColumn,
  getTaskStatusColumnWithoutRunCount,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
} from "@fortawesome/pro-light-svg-icons";
import ExportReportPanel from "../../../ExportReportPanel";
import { bulkMigrationMetadata } from "../../bulkMigration.metadata";
import TaskExportReportButton from "../../../TaskExportReportButton";
import { getTimeDisplay } from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";

const pdfHeaderList = [
  "Task Id",
  "Task Name",
  "Run Count",
  "Status",
  "Total Execution Time",
  "Task Executed By",
  "Task Owned By",
];

const csvHeaderList = [
  "Task Id",
  "Task Name",
  "Run Count",
  "Status",
  "Total Execution Time",
  "Task Executed By",
  "Task Owned By",
];

export default function BulkMigrationDetailedRunSummaryTable({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
}) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = bulkMigrationMetadata.fields;
  const noDataMessage = "No data available";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "taskId")),
      getTableTextColumn(getField(fields, "taskName")),
      getTableTextColumn(getField(fields, "runCount")),
      getTaskStatusColumnWithoutRunCount(getField(fields, "status")),
      getTableDurationTextColumn(getField(fields, "totalExecutionTime")),
      getTableTextColumn(getField(fields, "taskExecutedByName")),
      getTableTextColumn(getField(fields, "taskOwnedByName")),
    ],
    [],
  );

  const getTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          taskData={data}
          pdfHeaderList={pdfHeaderList}
          pdfBodyList={data.map((item) => [
            item.taskId,
            item.taskName,
            item.runCount,
            item.status,
            getTimeDisplay(item.totalExecutionTime),
            item.taskExecutedByName,
            item.taskOwnedByName,
          ])}
          csvHeaderList={csvHeaderList}
          csvBodyList={data.map((item) => [
            item.taskId,
            item.taskName,
            item.runCount,
            item.status,
            getTimeDisplay(item.totalExecutionTime),
            item.taskExecutedByName,
            item.taskOwnedByName,
          ])}
        />
      );
    }

    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <div className={"mx-3"}>
      <FilterContainer
        isLoading={isLoading}
        title={`Task Executed Details`}
        titleIcon={faDraftingCompass}
        body={getTable()}
        className={"pb-2"}
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        supportSearch={true}
        exportButton={
          <TaskExportReportButton
            className={"ml-2"}
            setShowExportPanel={setShowExportPanel}
            showExportPanel={showExportPanel}
          />
        }
      />
    </div>
  );
}

BulkMigrationDetailedRunSummaryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
};
