import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import { getGitCustodianExternalLinkIconColumnDefinition, getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import ExportAnchoreSecurityReportButton from "./export/ExportAnchoreSecurityReportButton";
import ExportAnchoreSecurityReportPanel from "./export/ExportAnchoreSecurityReportPanel";
import anchoreSecurityReportMetadata from "components/blueprint/security_reports/anchore/anchoreSecurityReport.metadata";

function AnchoreSecurityReportTable({ anchoreSecurityVulnerabilities }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = anchoreSecurityReportMetadata.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "severity",
        desc: true,
      },
      {
        id: "packageType",
        desc: true,
      },
      {
        id: "pkg",
        desc: true,
      },
    ],
  };

  const columns = useMemo(
    () => [      
      getTableTextColumn(getField(fields, "severity")),
      getGitCustodianExternalLinkIconColumnDefinition(
        getField(fields, "vulnLink"),
        "Open Vulnerability Details in New Window",
      ),
      getTableTextColumn(getField(fields, "packageType")),
      getTableTextColumn(getField(fields, "packageVersion")),
      getTableTextColumn(getField(fields, "pkg")),      
    ],
    [],
  );

  const getAnchoreSecurityReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportAnchoreSecurityReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          anchoreSecurityReportData={anchoreSecurityVulnerabilities}
        />
      );
    }

    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={anchoreSecurityVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getAnchoreSecurityReportTable()}
      titleIcon={faBug}
      title={"Anchore Vulnerabilities"}
      exportButton={
        <ExportAnchoreSecurityReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

AnchoreSecurityReportTable.propTypes = {
  anchoreSecurityVulnerabilities: PropTypes.array,
};

export default AnchoreSecurityReportTable;
