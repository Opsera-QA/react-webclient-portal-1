import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import CoverityLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/coverity/components/CoverityLogSummaryTable";

function CoverityReportView({ coverityObj }) {

  if (coverityObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <CoverityLogSummaryTable
      coverityObj={coverityObj}
    />
  );
}


CoverityReportView.propTypes = {
  coverityObj: PropTypes.array,
};

export default CoverityReportView;
