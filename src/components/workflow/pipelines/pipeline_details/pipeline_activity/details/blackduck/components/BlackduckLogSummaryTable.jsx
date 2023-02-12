import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import blackduckReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/blackduck/metadata/blackduckReport.metadata";
import {
  getTableTextColumn, getUppercaseTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportBlackduckReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/blackduck/export/ExportBlackduckReportButton";
import ExportBlackduckReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/blackduck/export/ExportBlackduckReportPanel";

function BlackduckLogSummaryTable({ blackduckObj }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = blackduckReportMetaData?.fields;

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

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportBlackduckReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          blackduckData={blackduckObj}
        />
      );
    }

    return (
      <VanityTable
        data={blackduckObj}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(blackduckObj) || blackduckObj.length === 0) {
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
        <ExportBlackduckReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

BlackduckLogSummaryTable.propTypes = {
  blackduckObj: PropTypes.array,
};

export default BlackduckLogSummaryTable;
