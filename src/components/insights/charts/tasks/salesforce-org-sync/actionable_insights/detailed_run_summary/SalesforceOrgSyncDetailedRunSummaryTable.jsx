import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
  getStaticIconColumn,
  getTableDurationTextColumn,
  getTaskStatusColumnWithoutRunCount,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
  faExternalLink,
} from "@fortawesome/pro-light-svg-icons";
import ExportReportPanel from "../../../ExportReportPanel";
import { salesforceOrgSyncMetadata } from "../../salesforceOrgSync.metadata";
import TaskExportReportButton from "../../../TaskExportReportButton";
import {
  SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS,
} from "../SalesforceOrgSyncActionableInsightOverlay";
import { getTimeDisplay } from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";

const pdfHeaderList = [
  "Task Id",
  "Task Name",
  "Run Count",
  "Status",
  "Total Execution Time",
  "Task Executed By",
  "Task Owned By",
  "Total Components",
];

const csvHeaderList = [
  "Task Id",
  "Task Name",
  "Run Count",
  "Status",
  "Total Execution Time",
  "Task Executed By",
  "Task Owned By",
  "Total Components",
];

export default function SalesforceOrgSyncDetailedRunSummaryTable({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  setSelectedRunObject,
  setCurrentScreen,
}) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = salesforceOrgSyncMetadata.fields;
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
      getTableTextColumn(getField(fields, "totalComponents")),
      getStaticIconColumn(faExternalLink),
    ],
    [],
  );

  const onRowSelect = (rowData) => {
    setSelectedRunObject(rowData.original);
    setCurrentScreen(
      SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_COMPONENT_SUMMARY,
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
            item.taskId,
            item.taskName,
            item.runCount,
            item.status,
            getTimeDisplay(item.totalExecutionTime),
            item.taskExecutedByName,
            item.taskOwnedByName,
            item.totalComponents,
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
            item.totalComponents,
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
        onRowSelect={onRowSelect}
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

SalesforceOrgSyncDetailedRunSummaryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  dashboardFilters: PropTypes.any,
  setCurrentScreen: PropTypes.func,
  setSelectedRunObject: PropTypes.func,
  taskName: PropTypes.string,
};
