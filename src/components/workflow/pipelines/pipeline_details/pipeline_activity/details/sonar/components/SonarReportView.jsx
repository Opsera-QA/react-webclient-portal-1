import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SonarLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/components/SonarLogSummaryTable";

function SonarReportView({ sonarReport }) {

  if (sonarReport == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <SonarLogSummaryTable
      sonarReport={sonarReport}
    />
  );
}


SonarReportView.propTypes = {
  sonarReport: PropTypes.array,
};

export default SonarReportView;