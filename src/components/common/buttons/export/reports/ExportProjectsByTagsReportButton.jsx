import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportProjectsByTagsReportDataOverlay from "components/reports/export/ExportProjectsByTagsReportDataOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";

function ExportProjectsByTagsReportButton({ isLoading, tagData, className }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const toastContext = useContext(DialogToastContext);

  const rawDataResults = Array.isArray(tagData) ? tagData.map(item => JSON.stringify(item)) : "export failure";

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportProjectsByTagsReportDataOverlay
        showModal={showExportModal}
        setParentVisibility={setShowExportModal}
        isLoading={isLoading}
        formattedData={tagData}
        rawData={rawDataResults}
      />
    );
  };

  return (
    <ExportDataButtonBase
      isLoading={isLoading}
      className={className}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportProjectsByTagsReportButton.propTypes = {
  isLoading: PropTypes.bool,
  tagData: PropTypes.array,
  className: PropTypes.string
};

export default ExportProjectsByTagsReportButton;