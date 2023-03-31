import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import ExportSonarSecurityReportButton from "./export/ExportSonarSecurityReportButton";
import ExportSonarSecurityReportPanel from "./export/ExportSonarSecurityReportPanel";
import sonarSecurityReportMetadata from "components/blueprint/security_reports/sonar/sonarSecurityReport.metadata";

function SonarSecurityReportTable({ sonarSecurityVulnerabilities, isOpseraThreshold }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = sonarSecurityReportMetadata.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false,
      },
      {
        id: "actual",
        desc: true,
      },
      {
        id: "threshold",
        desc: true,
      },            
    ],
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "actual")),
      getTableTextColumn(getField(fields, "threshold")),
      getTableTextColumn(getField(fields, "level")),     
    ],
    [],
  );

  const getSonarSecurityReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportSonarSecurityReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          sonarSecurityReportData={sonarSecurityVulnerabilities}
        />
      );
    }

    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={sonarSecurityVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getSonarSecurityReportTable()}
      titleIcon={faBug}
      title={isOpseraThreshold ? "Sonar Quality Gate Scan Report" : "Opsera Threshold Validation Report"}
      exportButton={
        <ExportSonarSecurityReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

SonarSecurityReportTable.propTypes = {
  sonarSecurityVulnerabilities: PropTypes.array,
  isOpseraThreshold: PropTypes.bool,
};

export default SonarSecurityReportTable;
