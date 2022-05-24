import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import sfdxScanExecLogResultMetadata from "../metadata/SfdxScanExecLogResult.metadata";


function SfdxScanExecLogSummaryTable({ execLogResults }) {
  const fields = sfdxScanExecLogResultMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "file")),
      getTableTextColumn(getField(fields, "rule")),
      getTableTextColumn(getField(fields, "category")),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "line")),
      getTableTextColumn(getField(fields, "column")),
      getTableTextColumn(getField(fields, "severity")),
      getTableTextColumn(getField(fields, "engine")),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={execLogResults}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(execLogResults) || execLogResults.length === 0) {
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
      title={`Objects`}
      className={"mt-2"}
    />
  );
}

SfdxScanExecLogSummaryTable.propTypes = {
    execLogResults: PropTypes.array,
};

export default SfdxScanExecLogSummaryTable;