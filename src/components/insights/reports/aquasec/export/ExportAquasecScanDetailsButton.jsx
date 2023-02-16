import React, {useContext} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";
import ExportAquasecScanDataOverlay from "components/insights/reports/aquasec/export/ExportAquasecScanDataOverlay";

function ExportAquasecScanDetailsButton({isLoading, className, allIssues}) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportAquasecScanDataOverlay
        isLoading={isLoading}
        formattedData={allIssues}
        rawData={rawDataResults()}
      />
    );
  };

  const rawDataResults = () =>{
    return allIssues ? allIssues.map(item => JSON.stringify(item)) : "export failure";
  };

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
  allIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportAquasecScanDetailsButton;