import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import sapCpqObjectLogResult
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sap_cpq/metadata/sapCpqObjectLogResult.metadata";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";

function SapCpqLogSummaryTable({ sapCpqReportObjs }) {
  const fields = sapCpqObjectLogResult?.fields;
  
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "action")),
      getTableTextColumn(getField(fields, "status")),
      getTableTextColumn(getField(fields, "message")),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={sapCpqReportObjs}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(sapCpqReportObjs) || sapCpqReportObjs.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There were no deployed objects with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`Files`}
      className={"mt-2"}
    />
  );
}

SapCpqLogSummaryTable.propTypes = {
  sapCpqReportObjs: PropTypes.array,
};

export default SapCpqLogSummaryTable;