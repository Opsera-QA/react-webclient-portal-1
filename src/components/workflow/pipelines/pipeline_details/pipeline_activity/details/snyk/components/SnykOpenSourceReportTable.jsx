import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import snykOpenSourceReportMetadata from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/metadata/snykOpenSourceReport.metadata";
import {
  getTableTextColumn,
  getTableBooleanIconColumn,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportSnykReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/export/ExportSnykReportButton";
import ExportSnykOpenSourceReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/export/ExportSnykOpenSourceReportPanel";

function SnykOpenSourceReportTable({ openSourceReport }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = snykOpenSourceReportMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "id")),
      getTableTextColumn(getField(fields, "severity")),
      getTableTextColumn(getField(fields, "category")),
      getTableTextColumn(getField(fields, "cwe")),
      // getTableTextColumn(getField(fields, "cve")),
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

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportSnykOpenSourceReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          openSourceReport={openSourceReport}
        />
      );
    }

    return (
      <VanityTable
        data={openSourceReport}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(openSourceReport) || openSourceReport.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase
          className={"mr-2"}
          icon={faCheckCircle}
        />
          There were no open source scan results were identified with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`Open Source Scan Report`}
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

SnykOpenSourceReportTable.propTypes = {
  openSourceReport: PropTypes.array,
};

export default SnykOpenSourceReportTable;
