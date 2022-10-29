import React, {useContext} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";
import ExportCoverityScanDataOverlay from "components/insights/reports/coverity/export/ExportCoverityScanDataOverlay";

function ExportCoverityScanDetailsButton({isLoading, scanData, className, allCoverityIssues}) {
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

ExportCoverityScanDetailsButton.propTypes = {
  scanData: PropTypes.array,
  allCoverityIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportCoverityScanDetailsButton;