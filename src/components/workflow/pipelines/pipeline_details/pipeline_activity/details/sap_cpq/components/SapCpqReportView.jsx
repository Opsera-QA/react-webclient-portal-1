import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SapCpqLogSummaryTable from "./SapCpqLogSummaryTable";

function SapCpqReportView({ sapCpqReportObjs }) {

  if (sapCpqReportObjs == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <>
        <SapCpqLogSummaryTable
            sapCpqReportObjs={sapCpqReportObjs}
        />

    </>
  );
}


SapCpqReportView.propTypes = {
  sapCpqReportObjs: PropTypes.array,
};

export default SapCpqReportView;