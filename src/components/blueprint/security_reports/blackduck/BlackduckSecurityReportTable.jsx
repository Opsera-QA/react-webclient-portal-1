import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {
  getTableTextColumn,
  getUppercaseTableTextColumn
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import ExportBlackduckSecurityReportButton from "./export/ExportBlackduckSecurityReportButton";
import ExportBlackduckSecurityReportPanel from "./export/ExportBlackduckSecurityReportPanel";
import blackduckSecurityReportMetadata from "components/blueprint/security_reports/blackduck/blackduckSecurityReport.metadata";

function BlackduckSecurityReportTable({ blackduckSecurityVulnerabilities }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = blackduckSecurityReportMetadata.fields;

  const initialState = {
    pageIndex: 0,    
  };

  const columns = useMemo(
    () => [
      getUppercaseTableTextColumn(getField(fields, "category")),
      getTableTextColumn(getField(fields, "critical")),
      getTableTextColumn(getField(fields, "high")),
      getTableTextColumn(getField(fields, "medium")),
      getTableTextColumn(getField(fields, "low")),
      getTableTextColumn(getField(fields, "ok")),
      getTableTextColumn(getField(fields, "unknown")),
    ],
    [],
  );

  const getBlackduckSecurityReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportBlackduckSecurityReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          blackduckSecurityReportData={blackduckSecurityVulnerabilities}
        />
      );
    }

    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={blackduckSecurityVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getBlackduckSecurityReportTable()}
      titleIcon={faBug}
      title={"Blackduck Vulnerabilities"}
      exportButton={
        <ExportBlackduckSecurityReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

BlackduckSecurityReportTable.propTypes = {
  blackduckSecurityVulnerabilities: PropTypes.array,
};

export default BlackduckSecurityReportTable;
