import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import anchoreReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/anchore/metadata/anchoreReport.metadata";
import {
  getTableTextColumn,
  getExternalLinkWithIcon,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportAnchoreReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/anchore/export/ExportAnchoreReportButton";
import ExportAnchoreReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/anchore/export/ExportAnchoreReportPanel";

function AnchoreLogSummaryTable({ anchoreObj }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = anchoreReportMetaData?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "severity")),
      getExternalLinkWithIcon(getField(fields, "vulnLink")),
      getTableTextColumn(getField(fields, "packageType")),
      getTableTextColumn(getField(fields, "packageVersion")),
      getTableTextColumn(getField(fields, "pkg")),
    ],
    [],
  );

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportAnchoreReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          anchoreObj={anchoreObj}
        />
      );
    }

    return (
      <VanityTable
        data={anchoreObj}
        columns={columns}
        // tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(anchoreObj) || anchoreObj.length === 0) {
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
        <ExportAnchoreReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

AnchoreLogSummaryTable.propTypes = {
    anchoreObj: PropTypes.array,
};

export default AnchoreLogSummaryTable;
