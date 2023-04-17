import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {
  getExternalLinkIconColumnDefinition,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import ExportAquasecSecurityReportButton from "./export/ExportAquasecSecurityReportButton";
import ExportAquasecSecurityReportPanel from "./export/ExportAquasecSecurityReportPanel";
import aquasecSecurityReportMetadata from "components/blueprint/security_reports/aquasec/aquasecSecurityReport.metadata";

function AquasecSecurityReportTable({ aquasecSecurityVulnerabilities }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = aquasecSecurityReportMetadata.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false,
      },
      {
        id: "aqua_score",
        desc: true,
      },
      {
        id: "aqua_severity",
        desc: true,
      },            
    ],
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), null, 250),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "aqua_severity"), null, 150),
      getTableTextColumn(getField(fields, "aqua_score"), null, 100),
      getExternalLinkIconColumnDefinition(getField(fields, "nvd_url"), "Open Vulnerability Details in New Window"),      
    ],
    [],
  );

  const getAquasecSecurityReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportAquasecSecurityReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          aquasecSecurityReportData={aquasecSecurityVulnerabilities}
        />
      );
    }

    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={aquasecSecurityVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getAquasecSecurityReportTable()}
      titleIcon={faBug}
      title={"Aquasec Vulnerabilities"}
      exportButton={
        <ExportAquasecSecurityReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

AquasecSecurityReportTable.propTypes = {
  aquasecSecurityVulnerabilities: PropTypes.array,
};

export default AquasecSecurityReportTable;
