import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportSonarQubeScanDataOverlay from "components/common/modal/export_data/ExportSonarQubeScanDataOverlay";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ExportDataButtonBase from "../../../modal/export_data/ExportDataButtonBase";

function ExportSonarQubeScanDetailsButton({isLoading, scanData, className, allSonarIssues}) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportSonarQubeScanDataOverlay
        isLoading={isLoading}
        formattedData={formattedData()}
        rawData={rawDataResults()}
      />
    );
  };

  const rawDataResults = () =>{
    return allSonarIssues ? allSonarIssues.map(item => JSON.stringify(item)) : "export failure";
  };

  const formattedData = () => {
    let formattedData = allSonarIssues;

    //any data formatting goes here

    return formattedData;
  };

  // TODO: Refine when more is complete
  return (
    <ExportDataButtonBase
      isLoading={isLoading}
      className={className}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportSonarQubeScanDetailsButton.propTypes = {
  scanData: PropTypes.array,
  allSonarIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportSonarQubeScanDetailsButton;