import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import snykSastScanReportMetadata from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/metadata/snykSastScanReport.metadata";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportSnykReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/export/ExportSnykReportButton";
import ExportSnykSastReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/export/ExportSnykSastReportPanel";

function SnykSastScanReportTable({ sastScanReport }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = snykSastScanReportMetadata?.fields;

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

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportSnykSastReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          sastScanReport={sastScanReport}
        />
      );
    }

    return (
      <VanityTable
        data={sastScanReport}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(sastScanReport) || sastScanReport.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase
          className={"mr-2"}
          icon={faCheckCircle}
        />
        There were no SAST scan results were identified with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`SAST Scan Report`}
      className={"mt-2"}
      exportButton={
        <ExportSnykReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

SnykSastScanReportTable.propTypes = {
  sastScanReport: PropTypes.array,
};

export default SnykSastScanReportTable;
