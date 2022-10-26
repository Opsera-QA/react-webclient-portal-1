import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import ExportCoverityScanDataOverlay from "../../../modal/export_data/ExportCoverityScanDataOverlay";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ExportDataButtonBase from "../../../modal/export_data/ExportDataButtonBase";

function ExportSonarQubeScanDetailsButton({isLoading, scanData, className, allCoverityIssues}) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportCoverityScanDataOverlay
        isLoading={isLoading}
        formattedData={formattedData()}
        rawData={rawDataResults()}
      />
    );
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
    <ExportDataButtonBase
      clasName={className}
      isLoading={isLoading}
      allCoverityIssues={allCoverityIssues}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportSonarQubeScanDetailsButton.propTypes = {
  scanData: PropTypes.array,
  allCoverityIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportSonarQubeScanDetailsButton;