import React, {useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import salesforceSummaryLogUnitTestResultMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/salesforceSummaryLogUnitTestResult.metadata";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";

function SalesforceLogSummarySuccessfulTestsTable({ successfulTests }) {
  const fields = salesforceSummaryLogUnitTestResultMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "methodName")),
      getTableDateTimeColumn(getField(fields, "testTimestamp")),
      // getTableTextColumn(getField(fields, "apexClass.attributes.type")),
      getTableTextColumn(getField(fields, "apexClass.attributes.url")),
    ],
    []
  );

  const getSuccessfulTestsTable = () => {
    return (
      <CustomTable
        className="table-no-border"
        data={successfulTests}
        columns={columns}
      />
    );
  };

  if (!Array.isArray(successfulTests) || successfulTests.length === 0) {
    return (
      <div>There were no successful tests with this execution.</div>
    );
  }

  return (
    <FilterContainer
      body={getSuccessfulTestsTable()}
      titleIcon={faCheckCircle}
      title={`${successfulTests?.length} Successful Tests`}
      className={"my-2"}
    />
  );
}

SalesforceLogSummarySuccessfulTestsTable.propTypes = {
  successfulTests: PropTypes.array,
};

export default SalesforceLogSummarySuccessfulTestsTable;