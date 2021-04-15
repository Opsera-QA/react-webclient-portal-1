import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";

// TODO: Should we be just sending in data and formatting in here?
function ExportDetailedToolReportDataModal({ showModal, closeModal, formattedData, rawData, isLoading}) {
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
      head:[["Name","Owner","Description","Contacts","Applications","Location","Organization","Tags","External References","Licensing","Compliance","Cost Center","Active"]],
      body: formattedData.map(item => [item.name, item.owner_name, item.contact, item.applications, item.location, item.organization, item.tags, item.external_references, item.licensing, item.compliance, item.costCenter, item.active])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    if(formattedData && Array.isArray(formattedData)){
      return [["Name","Owner","Description","Contacts","Applications","Location","Organization","Tags","External References","Licensing","Compliance","Cost Center","Active"],
        formattedData.map(item =>
        [
          item.name,
          item.owner_name,
          item.description,
          item?.contacts?.map(contact => `${contact?.name} : ${contact?.email}`).toString(),
          item?.applications?.map(app => `${app?.name} : ${app?.value}`).toString(),
          item?.location?.map(location => `${location?.name} : ${location?.value}`).toString(),
          item?.organization?.map(org => `${org?.name} : ${org?.value} `).toString(),
          item?.tags?.map(tag => `${tag?.type} : ${tag?.value}`).toString(),
          item?.external_reference?.map(ref => ref?.name).toString(),
          item?.licensing?.map(license => `${license?.name} : ${license.value}`),
          item.compliance?.map(item => `${item?.name} : ${item.value}`),
          item?.costCenter,
          item.active
        ]
      )];
    }
  };

  return (
    <ExportDataModalBase
      showModal={showModal}
      handleCancelModal={closeModal}
      isLoading={isLoading}
      getRawData={getRawData}
      getCsvData={getCsvData}
    />
  );
}

ExportDetailedToolReportDataModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportDetailedToolReportDataModal;


