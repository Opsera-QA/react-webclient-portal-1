import React, {useContext} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import ExportPipelineActivityLogDataOverlay from "components/common/modal/export_data/ExportPipelineActivityLogDataOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";

function ExportPipelineActivityLogButton(
  {
    isLoading,
    activityLogData,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlay = () => {
    toastContext.showOverlayPanel(
      <ExportPipelineActivityLogDataOverlay
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
            variant={"secondary"}
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

ExportPipelineActivityLogButton.propTypes = {
  activityLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportPipelineActivityLogButton;