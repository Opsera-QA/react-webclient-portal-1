import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import sonarPipelineScanReportMetadata from "components/insights/reports/sonarPipelineScanReport.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTally} from "@fortawesome/pro-light-svg-icons";
import ExportSonarQubeScanDetailsButton from "components/common/buttons/export/scans/ExportSonarQubeScanDetailsButton";

function SonarScanReportTable(
  {
    data,
    allSonarIssues,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
  }) {
  const fields = sonarPipelineScanReportMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "project";})),
      getTableTextColumn(fields.find(field => { return field.id === "severity";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getTableTextColumn(fields.find(field => { return field.id === "line";})),
      getTableTextColumn(fields.find(field => { return field.id === "status";})),
      getTableTextColumn(fields.find(field => { return field.id === "author";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
      getTableTextColumn(fields.find(field => { return field.id === "component";})),
    ],
    []
  );

  const getSonarQubeScanReportTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getSonarQubeScanReportTable()}
      titleIcon={faTally}
      title={"SonarQube Scan"}
      className={"px-2 pb-2"}
      exportButton={<ExportSonarQubeScanDetailsButton className={"ml-2"} isLoading={isLoading} scanData={data} allSonarIssues={allSonarIssues} />}
    />
  );
}

SonarScanReportTable.propTypes = {
  data: PropTypes.array,
  allSonarIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
};

export default SonarScanReportTable;