import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTally} from "@fortawesome/pro-light-svg-icons";
import ExportSonarQubeScanDetailsButton from "components/common/buttons/export/scans/ExportSonarQubeScanDetailsButton";
import coverityScanReportMetadata from "./coverityScanReportTable.metadata";

function SonarScanReportTable(
  {
    data,
    allSonarIssues,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
  }) {
  const fields = coverityScanReportMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "project";})),
      getTableTextColumn(fields.find(field => { return field.id === "severity";})),
      getTableTextColumn(fields.find(field => { return field.id === "owner";})),
      getTableTextColumn(fields.find(field => { return field.id === "issue_category";})),
      getTableTextColumn(fields.find(field => { return field.id === "action";})),
      getTableTextColumn(fields.find(field => { return field.id === "status";})),
      getTableTextColumn(fields.find(field => { return field.id === "date";})),
      getTableTextColumn(fields.find(field => { return field.id === "file";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
    ],
    []
  );

  const getCoverityScanReportTable = () => {
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
      body={getCoverityScanReportTable()}
      titleIcon={faTally}
      title={"SonarQube Scan"}
      className={"px-2 pb-2"}
      exportButton={<ExportSonarQubeScanDetailsButton className={"ml-2"} isLoading={isLoading} scanData={data} allSonarIssues={data} />}
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