import React, {useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faCheckCircle, faMinusCircle} from "@fortawesome/pro-light-svg-icons";
import salesforceSummaryLogUnitTestResultMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/salesforceSummaryLogUnitTestResult.metadata";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";

function SalesforceLogSummaryFailedTestsTable({ failedTests }) {
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

  const getFailedTestsTable = () => {
    return (
      <CustomTable
        className="table-no-border"
        data={failedTests}
        columns={columns}
      />
    );
  };

  if (!Array.isArray(failedTests) || failedTests.length === 0) {
    return (
      <div>There were no failed tests with this execution.</div>
    );
  }

  return (
    <FilterContainer
      body={getFailedTestsTable()}
      titleIcon={faMinusCircle}
      title={`${failedTests?.length} Failed Tests`}
      className={"my-2"}
    />
  );
}

SalesforceLogSummaryFailedTestsTable.propTypes = {
  failedTests: PropTypes.array,
};

export default SalesforceLogSummaryFailedTestsTable;