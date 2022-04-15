import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import GitScraperLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/components/GitScraperLogSummaryTable";

function GitScraperReportView({ gitScraperObj }) {

  if (gitScraperObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <GitScraperLogSummaryTable
      gitScraperObj={gitScraperObj}
    />
  );
}


GitScraperReportView.propTypes = {
  gitScraperObj: PropTypes.array,
};

export default GitScraperReportView;