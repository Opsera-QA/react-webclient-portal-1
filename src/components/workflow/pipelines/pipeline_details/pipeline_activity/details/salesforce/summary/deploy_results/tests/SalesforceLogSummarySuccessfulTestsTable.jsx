import React from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SalesforceLogSummaryTestResultsTableBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/tests/SalesforceLogSummaryTestResultsTableBase";
import IconBase from "components/common/icons/IconBase";

function SalesforceLogSummarySuccessfulTestsTable({ hasUnsuccessfulTests, successfulTests }) {
  if (!Array.isArray(successfulTests) || successfulTests.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faExclamationCircle} />
        There were no failed tests with this execution.
      </div>
    );
  }

  return (
    <SalesforceLogSummaryTestResultsTableBase
      testResults={successfulTests}
      hasSuccessAndFailureTests={hasUnsuccessfulTests === true}
      icon={faCheckCircle}
      title={`${successfulTests?.length} Successful Unit Tests`}
    />
  );
}

SalesforceLogSummarySuccessfulTestsTable.propTypes = {
  successfulTests: PropTypes.array,
  hasUnsuccessfulTests: PropTypes.bool,
};

export default SalesforceLogSummarySuccessfulTestsTable;