import React, {useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportTaskActivityLogDataModal from "../../../modal/export_data/ExportTaskActivityLogDataModal";
import IconBase from "components/common/icons/IconBase";

function ExportTaskActivityLogButton({isLoading, activityLogData, className}) {
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
      <ExportTaskActivityLogDataModal
        showModal={showExportModal}
        closeModal={closeModal}
        isLoading={isLoading}
        formattedData={formatActivityLogData()}
        rawData={rawDataResults()}
      />
    </>
  );
}

ExportTaskActivityLogButton.propTypes = {
  activityLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportTaskActivityLogButton;