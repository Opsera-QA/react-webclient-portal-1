import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportTaskActivityLogDataOverlay from "components/tasks/activity_logs/ExportTaskActivityLogDataOverlay";
import IconBase from "components/common/icons/IconBase";
import { DialogToastContext } from "contexts/DialogToastContext";

function ExportTaskActivityLogButton({isLoading, activityLogData, className}) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlay = () => {
    toastContext.showOverlayPanel(
      <ExportTaskActivityLogDataOverlay
        isLoading={isLoading}
        activityLogData={activityLogData}
      />
    );
  };


  // TODO: Refine when more is complete
  return (
    <>
      <TooltipWrapper innerText={"Export as PDF"}>
        <div className={className}>
          <Button
            variant={"outline-primary"}
            size={"sm"}
            disabled={isLoading}
            onClick={launchOverlay}>
            <span><IconBase icon={faFileDownload}/></span>
          </Button>
        </div>
      </TooltipWrapper>
    </>
  );
}

ExportTaskActivityLogButton.propTypes = {
  activityLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportTaskActivityLogButton;