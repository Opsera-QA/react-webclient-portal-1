import React, {useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportReportsDataModal from "components/common/modal/export_data/ExportReportsDataModal";
import IconBase from "components/common/icons/IconBase";

function ExportToolsUsedInPipelineReportButton({isLoading, pipelineData, className}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const closeModal = () => {
    setShowExportModal(false);
  };

  const rawDataResults = () =>{
    return pipelineData ? pipelineData.map(item => JSON.stringify(item)) : "export failure";
   };

  const formatPipelineData = () => {
    let formattedData = pipelineData;

    //any data formatting goes here

    return formattedData;
  };

  // TODO: Refine when more is complete
  return (
    <>
      <TooltipWrapper innerText={"Export"}>
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
      <ExportReportsDataModal
        showModal={showExportModal}
        closeModal={closeModal}
        setParentVisibility={setShowExportModal}
        isLoading={isLoading}
        formattedData={formatPipelineData()}
        rawData={rawDataResults()}
       />
    </>
  );
}

ExportToolsUsedInPipelineReportButton.propTypes = {
  pipelineData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportToolsUsedInPipelineReportButton;