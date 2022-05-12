import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";

function ExportCoverityScanDataModal({ showModal, closeModal, formattedData, rawData, isLoading}) {
  const getRawData = () => {
    return new Blob([rawData], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 8, minCellWidth: 24, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles:{fontSize: 8, minCellWidth: 24, fillColor: [54, 46, 84]},
      margin: { left: 2, right: 2 },
      head:[["Project", "Severity", "Owner", "Issue Category", "Issue Type","Action", "Status", "Date", "File"]],
      body: formattedData.map(item => [item.project, item.severity, item.owner, item.issue_category, item.issue_type, item.action, item.status, item.date, item.file])
    });

    return pdfExporter;
  };

  // const getCsvData = () => {
  //   return [["Project", "Severity", "Line", "Message"],
  //     ...formattedData.map(item =>
  //       [
  //         item.projects,
  //         item.severity,
  //         item.line,
  //         item.message
  //       ]
  //     )];
  // };

  return (
    <ExportDataModalBase
      showModal={showModal}
      handleCancelModal={closeModal}
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
      // getCsvData={getCsvData}
    />
  );
}

ExportCoverityScanDataModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportCoverityScanDataModal;