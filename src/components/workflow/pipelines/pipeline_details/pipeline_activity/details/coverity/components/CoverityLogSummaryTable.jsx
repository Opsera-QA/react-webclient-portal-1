import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import coverityReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/coverity/metadata/coverityReport.metadata";
import {
  getTableTextColumn,
  getExternalLinkWithIcon,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportCoverityReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/coverity/export/ExportCoverityReportButton";
import ExportCoverityReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/coverity/export/ExportCoverityReportPanel";

function CoverityLogSummaryTable({ coverityObj }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = coverityReportMetaData?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "displayType")),
      getTableTextColumn(getField(fields, "status")),
      getExternalLinkWithIcon(getField(fields, "cwe")),
      getTableTextColumn(getField(fields, "displayImpact")),
      getTableTextColumn(getField(fields, "displayIssueKind")),
      getTableTextColumn(getField(fields, "displayCategory")),
      getTableTextColumn(getField(fields, "occurrenceCount")),
      getTableTextColumn(getField(fields, "displayComponent")),
      getExternalLinkWithIcon(getField(fields, "displayFile")),
    ],
    [],
  );

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportCoverityReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          coverityData={coverityObj}
        />
      );
    }

    return (
      <VanityTable
        data={coverityObj}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(coverityObj) || coverityObj.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase
          className={"mr-2"}
          icon={faCheckCircle}
        />
        There were no vulnerabilities identified with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`Report`}
      className={"mt-2"}
      exportButton={
        <ExportCoverityReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

CoverityLogSummaryTable.propTypes = {
  coverityObj: PropTypes.array,
};

export default CoverityLogSummaryTable;
