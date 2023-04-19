import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {
  getTableTextColumn,
  getExternalLinkIconWithTextColumnDefinition
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import ExportCoveritySecurityReportButton from "./export/ExportCoveritySecurityReportButton";
import ExportCoveritySecurityReportPanel from "./export/ExportCoveritySecurityReportPanel";
import coveritySecurityReportMetadata from "components/blueprint/security_reports/coverity/coveritySecurityReport.metadata";

function CoveritySecurityReportTable({ coveritySecurityVulnerabilities }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = coveritySecurityReportMetadata.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "displayType",
        desc: false,
      },
      {
        id: "displayImpact",
        desc: true,
      },
      {
        id: "occurrenceCount",
        desc: true,
      },            
    ],
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "displayType")),
      getTableTextColumn(getField(fields, "status")),
      getExternalLinkIconWithTextColumnDefinition(getField(fields, "cwe")),
      getTableTextColumn(getField(fields, "displayImpact")),
      getTableTextColumn(getField(fields, "displayIssueKind")),
      getTableTextColumn(getField(fields, "displayCategory")),
      getTableTextColumn(getField(fields, "occurrenceCount")),
      getTableTextColumn(getField(fields, "displayComponent")),
      getExternalLinkIconWithTextColumnDefinition(getField(fields, "displayFile"), "force-text-wrap"),
    ],
    [],
  );

  const getCoveritySecurityReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportCoveritySecurityReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          coveritySecurityReportData={coveritySecurityVulnerabilities}
        />
      );
    }

    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={coveritySecurityVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getCoveritySecurityReportTable()}
      titleIcon={faBug}
      title={"Coverity Vulnerabilities"}
      exportButton={
        <ExportCoveritySecurityReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

CoveritySecurityReportTable.propTypes = {
  coveritySecurityVulnerabilities: PropTypes.array,
};

export default CoveritySecurityReportTable;
