import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";

// TODO: Should we be just sending in data and formatting in here?
function ExportToolCountDataOverlay({ formattedData, rawData, isLoading}) {
  const getRawData = () => {
    return new Blob([rawData], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 9, minCellWidth: 19, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles:{fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84]},
      margin: { left: 2, right: 2 },
      head:[["Tool","Count"]],
      body: formattedData.map(item => [item._id, item.count])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["Tool", "Count"],
      ...formattedData.map(item =>
        [
          item._id,
          item.count
        ]
      )];
  };

  return (
    <ExportDataOverlay
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
    />
  );
}

ExportToolCountDataOverlay.propTypes = {
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ExportToolCountDataOverlay;