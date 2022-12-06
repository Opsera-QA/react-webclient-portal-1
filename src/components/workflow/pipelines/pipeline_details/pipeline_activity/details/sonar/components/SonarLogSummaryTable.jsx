import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import sonarReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/metadata/sonarReport.metadata";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportSonarReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/export/ExportSonarReportButton";
import ExportSonarReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/export/ExportSonarReportPanel";

function SonarLogSummaryTable({ sonarObj }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = sonarReportMetaData?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "fileName")),
      getTableTextColumn(getField(fields, "filePath")),
      getTableTextColumn(getField(fields, "lineNumber")),
      getTableTextColumn(getField(fields, "category")),
      getTableTextColumn(getField(fields, "severity")),
      getTableTextColumn(getField(fields, "status")),
    ],
    [],
  );

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportSonarReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          sonarData={sonarObj}
        />
      );
    }

    return (
      <VanityTable
        data={sonarObj}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(sonarObj) || sonarObj.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase
          className={"mr-2"}
          icon={faCheckCircle}
        />
        There were no secrets identified with this execution.
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
        <ExportSonarReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

SonarLogSummaryTable.propTypes = {
  sonarObj: PropTypes.array,
};

export default SonarLogSummaryTable;
