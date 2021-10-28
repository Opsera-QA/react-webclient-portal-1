import React from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faMinusCircle} from "@fortawesome/pro-light-svg-icons";

function SalesforceLogSummaryFailedTestsPanel({ failedTests }) {
  const getCards = () => {
    return (
      failedTests?.map((test, index) => {
        return (
          <div key={index} className={"my-4"}>
            {JSON.stringify(test)}
          </div>
        );
      })
    );
  };

  if (!Array.isArray(failedTests) || failedTests.length === 0) {
    return (
      <div>There were no failed tests with this execution.</div>
    );
  }

  return (
    <FilterContainer
      body={getCards()}
      titleIcon={faMinusCircle}
      title={"Failed Tests"}
      className={"my-2"}
    />
  );
}

SalesforceLogSummaryFailedTestsPanel.propTypes = {
  failedTests: PropTypes.array,
};

export default SalesforceLogSummaryFailedTestsPanel;