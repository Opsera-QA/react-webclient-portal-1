import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { Col, Row } from "react-bootstrap";
import BoomiLogSummaryTable from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/boomi/components/BoomiLogSummaryTable";
import BoomiErrorSummaryTable from "./BoomiErrorSummaryTable";

function BoomiReportView({ boomiObj, errorObj, jobType }) {
  if (boomiObj == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={"sm"}
      />
    );
  }

  return (
    <>
      <BoomiLogSummaryTable boomiObj={boomiObj} jobType={jobType} />
      <BoomiErrorSummaryTable boomiObj={errorObj} jobType={jobType}/>
    </>
  );
}

BoomiReportView.propTypes = {
  boomiObj: PropTypes.array,
  errorObj: PropTypes.array,
  jobType: PropTypes.string
};

export default BoomiReportView;
