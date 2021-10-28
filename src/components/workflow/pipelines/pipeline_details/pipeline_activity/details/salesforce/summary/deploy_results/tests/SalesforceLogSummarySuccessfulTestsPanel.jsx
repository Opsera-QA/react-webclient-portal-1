import React from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";

function SalesforceLogSummarySuccessfulTestsPanel({ successfulTests }) {
  const getCards = () => {
    return (
      successfulTests?.map((test, index) => {
        return (
          <div key={index} className={"m-3"}>
            {JSON.stringify(test)}
          </div>
        );
      })
    );
  };

  if (!Array.isArray(successfulTests) || successfulTests.length === 0) {
    return (
      <div>There were no successful tests with this execution.</div>
    );
  }

  return (
    <FilterContainer
      body={getCards()}
      titleIcon={faCheckCircle}
      title={`${successfulTests?.length} Successful Tests`}
      className={"my-2"}
    />
  );
}

SalesforceLogSummarySuccessfulTestsPanel.propTypes = {
  successfulTests: PropTypes.array,
};

export default SalesforceLogSummarySuccessfulTestsPanel;