import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";

function ExportGitCustodianVulnerabilitiesDataModal({ showModal, closeModal, formattedData, rawData, isLoading}) {

  const getRawData = () => {
    return new Blob([JSON.stringify(rawData)], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 9, minCellWidth: 30, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles:{fontSize: 8, minCellWidth: 30, fillColor: [54, 46, 84]},
      margin: { left: 1, right: 1 },
      head:[["Date Created", "Repository", "Author", "Path", "Line Number", "Origin", "Type", "Jira Ticket"]],
      body: formattedData.map(item => [item.commitDate.substring(0, 10), item.repository, item.author, item.path, item.lineNumber, item.service, item.type, item?.jiraTicket?.key])
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

ExportGitCustodianVulnerabilitiesDataModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportGitCustodianVulnerabilitiesDataModal;


