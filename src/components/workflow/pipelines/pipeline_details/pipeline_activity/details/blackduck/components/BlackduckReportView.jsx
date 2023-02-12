import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import BlackduckLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/blackduck/components/BlackduckLogSummaryTable";

function BlackduckReportView({ blackduckObj }) {

  if (blackduckObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <BlackduckLogSummaryTable
      blackduckObj={blackduckObj}
    />
  );
}


BlackduckReportView.propTypes = {
  blackduckObj: PropTypes.array,
};

export default BlackduckReportView;