import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";
import aquasecScanReportTableMetadata from "../aquasecScanReportTable.metadata";
function ExportAquasecScanDataOverlay({ formattedData, rawData, isLoading }) {
  const getRawData = () => {
    return new Blob([rawData], { type: 'text/plain' });
  };

  const columns = aquasecScanReportTableMetadata.fields.map(({ label }) => label);
  const formattedDataValues = formattedData.map(item => [ item.componentName, item.componentVersion, item.severity, item.identifier, item.score, item.description]);

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({ orientation: "landscape" });
    pdfExporter.autoTable({
      startY: 2,
      styles: { fontSize: 8, minCellWidth: 24, minCellHeight: 12, valign: 'middle' },
      showHead: "firstPage",
      headStyles: { fontSize: 8, minCellWidth: 24, fillColor: [54, 46, 84] },
      margin: { left: 2, right: 2 },
      head: [columns],
      body: formattedDataValues
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      columns,
      ...formattedDataValues
    ];
  };

  return (
    <ExportDataOverlay
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
      getCsvData={getCsvData}
    />
  );
}

ExportAquasecScanDataOverlay.propTypes = {
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportAquasecScanDataOverlay;
