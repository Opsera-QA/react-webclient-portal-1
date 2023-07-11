import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import GithubCommitsActionableMetadata from "../github-commits-actionable-insight-metadata";
import { getTableDateTimeColumn, getTableTextColumn, getExternalLinkIconColumnDefinition} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import ExportGithubCommitsButton from "../export/ExportGithubCommitsButton";
import ExportOpenPanel from "../export/ExportOpenPanel";
import ExportDeclinedPanel from "../export/ExportDeclinedPanel";
import ExportMergedPanel from "../export/ExportMergedPanel";

function GithubCommitsActionableInsightTable({ data, isLoading, loadData, filterModel, setFilterModel, title, type, tableTitleIcon }) {
  const fields = GithubCommitsActionableMetadata.fields;
  const tableTitle = "Github " + title + " Report";
  const noDataMessage = "Github " + title + " report is currently unavailable at this time";
  const [showExportPanel, setShowExportPanel] = useState(false);


  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "collaboratorName"), "collaboratorName"),
      getTableDateTimeColumn(getField(fields, "createdAt"), "createdAt"),
      getTableTextColumn(getField(fields, "mergeRequestTitle"), "mergeRequestTitle"),
      getTableDateTimeColumn(getField(fields, "closedAt"), "closedAt"),
      getTableTextColumn(getField(fields, "mergeRequestsId"),"mergeRequestsId"),
      getExternalLinkIconColumnDefinition(
        getField(fields, "mergeRequestUrl"),
        "",
      ),
    ],
    []
  );
  const openColumns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "collaboratorName"), "collaboratorName"),
      getTableDateTimeColumn(getField(fields, "createdAt"), "createdAt"),
      getTableTextColumn(getField(fields, "mergeRequestTitle"), "mergeRequestTitle"),
      getTableTextColumn(getField(fields, "mergeRequestsId"),"mergeRequestsId"),
      getExternalLinkIconColumnDefinition(getField(fields, "mergeRequestUrl"),"",),
    ],
    []
  );
  const declinedColumns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "repositoryName"), "repositoryName"),
      getTableTextColumn(getField(fields, "collaboratorName"), "collaboratorName"),
      getTableDateTimeColumn(getField(fields, "createdAt"), "createdAt"),
      getTableTextColumn(getField(fields, "mergeRequestTitle"), "mergeRequestTitle"),
      getTableDateTimeColumn(getField(fields, "closedAt"), "closedAt"),
      getTableTextColumn(getField(fields, "mergeRequestsId"),"mergeRequestsId"),
      getExternalLinkIconColumnDefinition(
        getField(fields, "mergeRequestUrl"),"",),
    ],
    []
  );

  const getTable = () => {
      if (showExportPanel === true && type === "open") {
          return (
              <ExportOpenPanel
                  showExportPanel={showExportPanel}
                  setShowExportPanel={setShowExportPanel}
                  LookupDetailsData={data}
              />
          );
      }
      else if (showExportPanel === true && type === "declined"){
          return (
              <ExportDeclinedPanel
                  showExportPanel={showExportPanel}
                  setShowExportPanel={setShowExportPanel}
                  LookupDetailsData={data}
              />
          );
      }
      else if (showExportPanel === true && type === "merged"){
          return (
              <ExportMergedPanel
                  showExportPanel={showExportPanel}
                  setShowExportPanel={setShowExportPanel}
                  LookupDetailsData={data}
              />
          );
      }

    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={type === "open" ? openColumns : type === "declined" ? declinedColumns : columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      title={tableTitle}
      titleIcon={tableTitleIcon}
      body={getTable()}
      className={"px-2 pb-2"}
      loadData={loadData}
      setFilterDto={setFilterModel}
      filterDto={filterModel}
      exportButton={
          <ExportGithubCommitsButton
              className={"ml-2"}
              setShowExportPanel={setShowExportPanel}
              showExportPanel={showExportPanel}
          />
      }
    />
  );
}

GithubCommitsActionableInsightTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  tableTitleIcon: PropTypes.object 
};

export default GithubCommitsActionableInsightTable;
