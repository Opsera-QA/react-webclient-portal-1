import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import apigeeReportMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/metadata/apigeeReport.metadata";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";

function ApigeeLogSummaryTable({ apigeeObj }) {
  const fields = apigeeReportMetaData?.fields;
  
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "revision")),
      getTableTextColumn(getField(fields, "state"))      
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={apigeeObj}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(apigeeObj) || apigeeObj.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
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
    />
  );
}

ApigeeLogSummaryTable.propTypes = {
  apigeeObj: PropTypes.array,
};

export default ApigeeLogSummaryTable;