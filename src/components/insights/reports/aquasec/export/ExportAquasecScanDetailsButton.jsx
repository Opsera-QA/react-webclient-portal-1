import React, {useContext} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";
import ExportAquasecScanDataOverlay from "components/insights/reports/aquasec/export/ExportAquasecScanDataOverlay";

function ExportAquasecScanDetailsButton({isLoading, scanData, className, allIssues}) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportAquasecScanDataOverlay
        isLoading={isLoading}
        formattedData={formattedData()}
        rawData={rawDataResults()}
      />
    );
  };

  const rawDataResults = () =>{
    return allIssues ? allIssues.map(item => JSON.stringify(item)) : "export failure";
  };

  const formattedData = () => {
    let formattedData = allIssues;

    //any data formatting goes here

    return formattedData;
  };

  // TODO: Refine when more is complete
  return (
    <ExportDataButtonBase
      clasName={className}
      isLoading={isLoading}
      allIssues={allIssues}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportAquasecScanDetailsButton.propTypes = {
  scanData: PropTypes.array,
  allIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportAquasecScanDetailsButton;