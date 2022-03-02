import React, {useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportPipelineActivityLogDataModal from "components/common/modal/export_data/ExportPipelineActivityLogDataModal";
import IconBase from "components/common/icons/IconBase";

function ExportPipelineActivityLogButton({isLoading, activityLogData, className}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const closeModal = () => {
    setShowExportModal(false);
  };

  const rawDataResults = () =>{
    return activityLogData ? activityLogData.map(item => JSON.stringify(item)) : "export failure";
   };

  const formatActivityLogData = () => {
    let formattedData = activityLogData;

    //any data formatting goes here

    return formattedData;
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
            onClick={() => setShowExportModal(true)}>
            <span><IconBase icon={faFileDownload}/></span>
          </Button>
        </div>
      </TooltipWrapper>
      <ExportPipelineActivityLogDataModal
        showModal={showExportModal}
        closeModal={closeModal}
        isLoading={isLoading}
        formattedData={formatActivityLogData()}
        rawData={rawDataResults()}
      />
    </>
  );
}

ExportPipelineActivityLogButton.propTypes = {
  activityLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportPipelineActivityLogButton;