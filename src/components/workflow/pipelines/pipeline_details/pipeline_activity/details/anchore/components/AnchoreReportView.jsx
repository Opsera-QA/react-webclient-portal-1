import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import AnchoreLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/anchore/components/AnchoreLogSummaryTable";

function AnchoreReportView({ anchoreObj }) {

  if (anchoreObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <AnchoreLogSummaryTable
        anchoreObj={anchoreObj}
    />
  );
}


AnchoreReportView.propTypes = {
  anchoreObj: PropTypes.array,
};

export default AnchoreReportView;
