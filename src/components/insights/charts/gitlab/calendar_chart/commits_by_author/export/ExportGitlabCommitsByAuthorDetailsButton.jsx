import React, { useContext } from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";
import ExportGitlabCommitsByAuthorOverlay from "./ExportGitlabCommitsByAuthorOverlay";
function ExportGitlabCommitsByAuthorDetailsButton({ isLoading, className, scanData }) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showInfoOverlayPanel(
      <ExportGitlabCommitsByAuthorOverlay
        isLoading={isLoading}
        formattedData={scanData}
        rawData={rawDataResults()}
      />
    );
  };

  const rawDataResults = () => {
    return scanData ? scanData.map(item => JSON.stringify(item)) : "export failure";
  };

  return (
    <ExportDataButtonBase
      clasName={className}
      isLoading={isLoading}
      allIssues={scanData}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportGitlabCommitsByAuthorDetailsButton.propTypes = {
  scanData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportGitlabCommitsByAuthorDetailsButton;