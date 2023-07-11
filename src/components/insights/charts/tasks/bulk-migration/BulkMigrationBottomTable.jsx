import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import {
  getTableTextColumn,
  getStaticIconColumn,
  getTableDurationTextColumn,
  getTaskStatusColumnWithoutRunCount,
  getTableDateTimeColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faTasks, faExternalLink } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import BulkMigrationActionableInsightOverlay from "./actionable_insights/BulkMigrationActionableInsightOverlay";
import { bulkMigrationMetadata } from "./bulkMigration.metadata";
import TaskExportReportButton from "../TaskExportReportButton";
import ExportReportPanel from "../ExportReportPanel";
import { getTimeDisplay } from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";

const pdfHeaderList = [
  "Task Id",
  "Task Name",
  "Total Runs",
  "Recent Status",
  "Total Execution Time",
  "Task Executed By",
  "Task Owned By",
  "Last Run",
];

const csvHeaderList = [
  "Task Id",
  "Task Name",
  "Total Runs",
  "Recent Status",
  "Total Execution Time",
  "Task Executed By",
  "Task Owned By",
  "Last Run",
];

function BulkMigrationBottomTable(
  {
    data,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    mostFailed,
    mostSuccessTime,
    mostFailedTime,
  }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const fields = bulkMigrationMetadata.fields;
  const noDataMessage = "No data available";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "taskName")),
      getTableTextColumn(getField(fields, "totalRun")),
      getTaskStatusColumnWithoutRunCount(getField(fields, "lastRunCountAndStatus")),
      getTableDurationTextColumn(getField(fields, "totalExecutionTime")),
      getTableTextColumn(getField(fields, "taskExecutedByName")),
      getTableTextColumn(getField(fields, "taskOwnedByName")),
      getTableDateTimeColumn(getField(fields, "lastRun")),
      getStaticIconColumn(faExternalLink),
    ],
    [],
  );

  const onRowSelect = (rowData) => {
    toastContext.showInfoOverlayPanel(
      <BulkMigrationActionableInsightOverlay
        taskId={rowData.original._id}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        dashboardFilters={dashboardFilters}
        taskName={rowData.original.taskName}
      />,
    );
  };

  const getTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          taskData={data}
          pdfHeaderList={pdfHeaderList}
          pdfBodyList={data.map((item) => [
            item._id,
            item.taskName,
            item.totalRun,
            item.lastRunCountAndStatus,
            getTimeDisplay(item.totalExecutionTime),
            item.taskExecutedByName,
            item.taskOwnedByName,
            DateFormatHelper.formatDateAsTimestamp(new Date(item.lastRun)),
          ])}
          csvHeaderList={csvHeaderList}
          csvBodyList={data.map((item) => [
            item._id,
            item.taskName,
            item.totalRun,
            item.lastRunCountAndStatus,
            getTimeDisplay(item.totalExecutionTime),
            item.taskExecutedByName,
            item.taskOwnedByName,
            DateFormatHelper.formatDateAsTimestamp(new Date(item.lastRun)),
          ])}
        />
      );
    }

    return (
      <div>
        <CustomTable
          isLoading={isLoading}
          loadData={loadData}
          columns={columns}
          data={data}
          noDataMessage={noDataMessage}
          paginationDto={filterModel}
          setPaginationDto={setFilterModel}
          onRowSelect={onRowSelect}
        />
      </div>
    );
  };

  const getBody = () => {
    return (
      <FilterContainer
        isLoading={isLoading}
        title={"Bulk Migration Summary"}
        titleIcon={faTasks}
        body={getTable()}
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
    );
  };

  return (
    <div className={"mx-3"}>
      <div className={"details-title-text"}>
        <div className={"mr-4"}>
          <b>Most Failed Task (by counts):</b> {mostFailed}
        </div>
        <div className={"mr-4"}>
          <b>Most Time Consuming Successful Task:</b> {mostSuccessTime}
        </div>
        <div className={"mr-4"}>
          <b>Most Time Consuming Failed Task:</b> {mostFailedTime}
        </div>
      </div>
      {getBody()}
    </div>
  );
}

BulkMigrationBottomTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  mostFailed: PropTypes.string,
  mostSuccessTime: PropTypes.string,
  mostFailedTime: PropTypes.string,
};

export default BulkMigrationBottomTable;
