import React, { useState } from "react";
import PropTypes from "prop-types";
import ExportDataButtonBase from "../../../../common/modal/export_data/ExportDataButtonBase";

export default function ExportSnykSecurityReportButton({
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

ExportSnykSecurityReportButton.propTypes = {
  setShowExportPanel: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  showExportPanel: PropTypes.bool,
};
