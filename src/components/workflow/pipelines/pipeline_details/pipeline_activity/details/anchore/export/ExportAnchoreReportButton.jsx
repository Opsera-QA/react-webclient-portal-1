import React, { useState } from "react";
import PropTypes from "prop-types";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";

export default function ExportAnchoreReportButton({
  isLoading,
  showExportPanel,
  setShowExportPanel,
  className,
}) {
  return (
    <ExportDataButtonBase
      isLoading={isLoading}
      className={className}
      launchOverlayFunction={() => setShowExportPanel(!showExportPanel)}
      showExportPanel={showExportPanel}
    />
  );
}

ExportAnchoreReportButton.propTypes = {
  setShowExportPanel: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  showExportPanel: PropTypes.bool,
};
