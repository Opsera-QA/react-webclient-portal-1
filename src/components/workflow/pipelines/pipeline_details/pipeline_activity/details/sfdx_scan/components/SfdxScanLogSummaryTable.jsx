import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import informaticaImportObjectLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/metadata/informaticaImportObjectLogResult.metadata";
import {
  getColumnHeader, getColumnId,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import sfdxScanLogSummaryResultMetadata from "../metadata/SfdxScanLogSummaryResult.metadata";


function SfdxScanLogSummaryTable({ summaryQGObject }) {
  const fields = sfdxScanLogSummaryResultMetadata?.fields;
  
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "ruleId")),
      getTableTextColumn(getField(fields, "rule")),
      getTableTextColumn(getField(fields, "category")),
      getTableTextColumn(getField(fields, "count")),
      getTableTextColumn(getField(fields, "threshold")),
      getTableTextColumn(getField(fields, "passStatus")),
      getTableTextColumn(getField(fields, "description")),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={summaryQGObject}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(summaryQGObject) || summaryQGObject.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There were no Quality gate violations with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`Quality Gates`}
      className={"mt-2"}
    />
  );
}

SfdxScanLogSummaryTable.propTypes = {
    summaryQGObject: PropTypes.array,
};

export default SfdxScanLogSummaryTable;