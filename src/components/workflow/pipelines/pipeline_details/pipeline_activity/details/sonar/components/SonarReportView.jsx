import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SonarLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/components/SonarLogSummaryTable";

function SonarReportView({ sonarObj }) {

  if (sonarObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <SonarLogSummaryTable
      sonarObj={sonarObj}
    />
  );
}


SonarReportView.propTypes = {
  sonarObj: PropTypes.array,
};

export default SonarReportView;