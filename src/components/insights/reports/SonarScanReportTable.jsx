import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import sonarScanReportMetadata from "components/insights/reports/sonar-scan-report-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTally} from "@fortawesome/pro-light-svg-icons";
import ExportSonarQubeScanDetailsButton from "components/common/buttons/export/scans/ExportSonarQubeScanDetailsButton";

function SonarScanReportTable({ data, isLoading, loadData }) {
  let fields = sonarScanReportMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "project";})),
      getTableTextColumn(fields.find(field => { return field.id === "severity";})),
      getTableTextColumn(fields.find(field => { return field.id === "line";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
    ],
    []
  );

  const rowStyling = (row) => {
    return row["count"] === 0 ? " inactive-row" : "";
  };

  const getSonarQubeScanReportTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        isLoading={isLoading}
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
      exportButton={<ExportSonarQubeScanDetailsButton className={"ml-2"} isLoading={isLoading} toolData={data} />}
    />
  );
}

SonarScanReportTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default SonarScanReportTable;