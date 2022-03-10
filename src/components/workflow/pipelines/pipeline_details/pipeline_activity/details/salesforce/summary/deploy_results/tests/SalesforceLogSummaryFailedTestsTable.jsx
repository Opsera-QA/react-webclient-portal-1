import React from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SalesforceLogSummaryFailedTestResultsTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/SalesforceLogSummaryFailedTestResultsTable";

function SalesforceLogSummaryFailedTestsTable({ hasSuccessfulTests, unsuccessfulTests }) {
  if (!Array.isArray(unsuccessfulTests) || unsuccessfulTests.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There were no failed tests with this execution.
      </div>
    );
  }

  return (
    <SalesforceLogSummaryFailedTestResultsTable
      testResults={unsuccessfulTests}
      hasSuccessAndFailureTests={hasSuccessfulTests === true}
      icon={faExclamationCircle}
      title={`${unsuccessfulTests?.length} Failed Unit Tests`}
    />
  );
}

SalesforceLogSummaryFailedTestsTable.propTypes = {
  unsuccessfulTests: PropTypes.array,
  hasSuccessfulTests: PropTypes.bool,
};

export default SalesforceLogSummaryFailedTestsTable;