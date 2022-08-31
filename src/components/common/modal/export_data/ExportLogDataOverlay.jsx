import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";
import ExportDataOverlay from "./ExportDataOverlay";

// TODO: Should we be just sending in data and formatting in here?
function ExportLogDataOverlay({ formattedData, rawData, isLoading}) {
  const getRawData = () => {
    return new Blob([rawData], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
      const searchResults = formattedData;
      const pdfExporter = new jsPDF();
      const resultsToExport = searchResults[0].hits;

      pdfExporter.autoTable({
        startY: 2,
        headStyles:{fillColor: [54, 46, 84]},
        showHead: "firstPage",
        margin: { left: 2, right: 2 },
        head:[["Logs Search Results"]],
        body: resultsToExport.map(item => [JSON.stringify(item, null, 2)])
      });

      return pdfExporter;
  };

  return (
    <ExportDataOverlay
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
    />
  );
}

ExportLogDataOverlay.propTypes = {
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportLogDataOverlay;


