import React, {useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import ExportCoverityScanDataModal from "../../../modal/export_data/ExportCoverityScanDataModal";

function ExportSonarQubeScanDetailsButton({isLoading, scanData, className, allCoverityIssues}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const closeModal = () => {
    setShowExportModal(false);
  };

  const rawDataResults = () =>{
    return allCoverityIssues ? allCoverityIssues.map(item => JSON.stringify(item)) : "export failure";
  };

  const formattedData = () => {
    let formattedData = allCoverityIssues;

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
      <ExportCoverityScanDataModal
        showModal={showExportModal}
        closeModal={closeModal}
        setParentVisibility={setShowExportModal}
        isLoading={isLoading}
        formattedData={formattedData()}
        rawData={rawDataResults()}
      />
    </>
  );
}

ExportSonarQubeScanDetailsButton.propTypes = {
  scanData: PropTypes.array,
  allCoverityIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportSonarQubeScanDetailsButton;