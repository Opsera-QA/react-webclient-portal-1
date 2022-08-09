import React, {useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportGitCustodianReportDataModal from "components/common/modal/export_data/ExportGitCustodianReportDataModal";
import ExportReportsDataOverlay from "components/common/modal/export_data/ExportReportsDataOverlay";
import IconBase from "components/common/icons/IconBase";

function ExportGitCustodianExecutionSummaryReportButton({isLoading, gitCustodianData, className}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const closeModal = () => {
    setShowExportModal(false);
  };

  const rawDataResults = () =>{
    return gitCustodianData ? gitCustodianData.map(item => JSON.stringify(item)) : "export failure";
   };

  const formatGitCustodianData = () => {
    let formattedData = gitCustodianData;

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
      <ExportGitCustodianReportDataModal
        showModal={showExportModal}
        closeModal={closeModal}
        setParentVisibility={setShowExportModal}
        isLoading={isLoading}
        formattedData={formatGitCustodianData()}
        rawData={rawDataResults()}
       />
    </>
  );
}

ExportGitCustodianExecutionSummaryReportButton.propTypes = {
  gitCustodianData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportGitCustodianExecutionSummaryReportButton;