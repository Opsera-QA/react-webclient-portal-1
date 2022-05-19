import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ApigeeLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/components/ApigeeLogSummaryTable";

function ApigeeReportView({ apigeeObj }) {

  if (apigeeObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <ApigeeLogSummaryTable
      apigeeObj={apigeeObj}
    />
  );
}


ApigeeReportView.propTypes = {
  apigeeObj: PropTypes.array,
};

export default ApigeeReportView;