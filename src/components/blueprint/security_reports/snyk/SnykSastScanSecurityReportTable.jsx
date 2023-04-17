import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import ExportSnykSecurityReportButton from "./export/ExportSnykSecurityReportButton";
import ExportSnykSastScanSecurityReportPanel from "./export/ExportSnykSastScanSecurityReportPanel";
import snykSastSecurityReportMetadata from "components/blueprint/security_reports/snyk/snykSastSecurityReport.metadata";

function SnykSastScanSecurityReportTable({ snykSecurityVulnerabilities }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = snykSastSecurityReportMetadata.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false,
      },
      {
        id: "severity",
        desc: true,
      },
      {
        id: "category",
        desc: true,
      },            
    ],
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "id")),
      getTableTextColumn(getField(fields, "severity")),
      getTableTextColumn(getField(fields, "category")),
      getTableTextColumn(getField(fields, "categories")),
      getTableTextColumn(getField(fields, "cwe")),
      getTableTextColumn(getField(fields, "filePath")),
      getTableTextColumn(getField(fields, "lineNumber")),
      getTableTextColumn(getField(fields, "startLine")),
      getTableTextColumn(getField(fields, "endLine")),
      getTableTextColumn(getField(fields, "message")),
      getTableTextColumn(getField(fields, "tags")),
      getTableTextColumn(getField(fields, "snykProduct")),     
    ],
    [],
  );

  const getSnykSastScanSecurityReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportSnykSastScanSecurityReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          snykSecurityReportData={snykSecurityVulnerabilities}
        />
      );
    }

    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={snykSecurityVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getSnykSastScanSecurityReportTable()}
      titleIcon={faBug}
      title={"Snyk Vulnerabilities"}
      exportButton={
        <ExportSnykSecurityReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

SnykSastScanSecurityReportTable.propTypes = {
  snykSecurityVulnerabilities: PropTypes.array,
};

export default SnykSastScanSecurityReportTable;
