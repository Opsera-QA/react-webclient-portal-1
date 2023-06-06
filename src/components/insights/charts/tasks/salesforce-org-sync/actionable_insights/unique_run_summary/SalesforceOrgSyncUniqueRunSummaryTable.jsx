import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import ExportReportPanel from "../../../ExportReportPanel";
import { salesforceOrgSyncMetadata } from "../../salesforceOrgSync.metadata";
import TaskExportReportButton from "../../../TaskExportReportButton";

const pdfHeaderList = [
  "Task Id",
  "Task Name",
  "Run Count",
  "Component Type",
  "Component Name",
  "Task Owner",
  "Task Executed By",
];

const csvHeaderList = [
  "Task Id",
  "Task Name",
  "Run Count",
  "Component Type",
  "Component Name",
  "Task Owner",
  "Task Executed By",
];

export default function SalesforceOrgSyncUniqueRunSummaryTable({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
}) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = salesforceOrgSyncMetadata.fields;
  const noDataMessage = "No data available";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "componentName")),
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
            item.componentType,
            item.componentName,
            item.taskExecutedByName,
            item.taskOwnedByName,
          ])}
          csvHeaderList={csvHeaderList}
          csvBodyList={data.map((item) => [
            item.taskId,
            item.taskName,
            item.runCount,
            item.componentType,
            item.componentName,
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
        title={`Task Components Details`}
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

SalesforceOrgSyncUniqueRunSummaryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
};
