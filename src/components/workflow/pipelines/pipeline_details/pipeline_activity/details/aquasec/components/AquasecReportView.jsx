import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import AquasecLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/components/AquasecLogSummaryTable";

function AquasecReportView({ aquasecObj }) {

  if (aquasecObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <AquasecLogSummaryTable
      aquasecObj={aquasecObj}
    />
  );
}


AquasecReportView.propTypes = {
  aquasecObj: PropTypes.array,
};

export default AquasecReportView;
