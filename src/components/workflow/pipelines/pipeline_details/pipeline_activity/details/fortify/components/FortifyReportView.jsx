import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import FortifyLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/components/FortifyLogSummaryTable";

function FortifyReportView({ fortifyObj }) {

  if (fortifyObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <FortifyLogSummaryTable
      fortifyObj={fortifyObj}
    />
  );
}


FortifyReportView.propTypes = {
  fortifyObj: PropTypes.array,
};

export default FortifyReportView;