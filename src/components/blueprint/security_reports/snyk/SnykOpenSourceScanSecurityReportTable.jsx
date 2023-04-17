import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import ExportSnykSecurityReportButton from "./export/ExportSnykSecurityReportButton";
import ExportSnykOpenSourceScanSecurityReportPanel from "./export/ExportSnykOpenSourceScanSecurityReportPanel";
import snykOpenSourceSecurityReportMetadata from "components/blueprint/security_reports/snyk/snykOpenSourceSecurityReport.metadata";

function SnykOpenSourceScanSecurityReportTable({ snykSecurityVulnerabilities }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = snykOpenSourceSecurityReportMetadata.fields;

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
      getTableTextColumn(getField(fields, "cwe")),
      getTableTextColumn(getField(fields, "fileName")),
      getTableBooleanIconColumn(getField(fields, "upgradable")),
      getTableBooleanIconColumn(getField(fields, "patchable")),
      getTableTextColumn(getField(fields, "version")),
      getTableTextColumn(getField(fields, "introducedBy")),
      getTableTextColumn(getField(fields, "upgradeTo")),
      getTableTextColumn(getField(fields, "organization")),
      getTableTextColumn(getField(fields, "snykProduct")),      
    ],
    [],
  );

  const getSnykOpenSourceScanSecurityReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportSnykOpenSourceScanSecurityReportPanel
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
      body={getSnykOpenSourceScanSecurityReportTable()}
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

SnykOpenSourceScanSecurityReportTable.propTypes = {
  snykSecurityVulnerabilities: PropTypes.array,
};

export default SnykOpenSourceScanSecurityReportTable;
