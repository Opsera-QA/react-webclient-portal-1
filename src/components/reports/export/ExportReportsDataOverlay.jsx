import React from "react";
import PropTypes from "prop-types";
import ExportDataOverlay from "../../common/modal/export_data/ExportDataOverlay";
import jsPDF from "jspdf";
import {DATE_FORMATS, getFormattedDate} from "components/common/fields/date/DateFieldBase";

// TODO: Should we be just sending in data and formatting in here?
function ExportReportsDataOverlay({ formattedData, rawData, isLoading}) {
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
      head:[["Name", "Description", "ID","Created","Status"]],
      body: formattedData.map(item => [
        item.name,
        item.description,
        item._id,
        getFormattedDate(item.createdAt, DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS),
        item.active ? "active" : "inactive"])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["Name", "Description", "ID", "Created", "Status"],
      ...formattedData.map(item =>
        [
          item.name,
          item.description,
          item._id,
          getFormattedDate(item.createdAt, DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS),
          item.active ? "active" : "inactive"
        ]
      )];
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

ExportReportsDataOverlay.propTypes = {
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportReportsDataOverlay;