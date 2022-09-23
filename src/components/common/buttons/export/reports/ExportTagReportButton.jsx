import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportReportsDataOverlay from "components/common/modal/export_data/ExportReportsDataOverlay";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ExportDataButtonBase from "../../../modal/export_data/ExportDataButtonBase";

function ExportTagReportButton({isLoading, tagData, className}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
        <ExportReportsDataOverlay
            showModal={showExportModal}
            setParentVisibility={setShowExportModal}
            isLoading={isLoading}
            formattedData={formatTagData()}
            rawData={rawDataResults()}
        />
    );
  };

  const rawDataResults = () =>{
    return tagData ? tagData.map(item => JSON.stringify(item)) : "export failure";
   };

  const formatTagData = () => {
    let formattedData = tagData;

    //any data formatting goes here

    return formattedData;
  };

  // TODO: Refine when more is complete
  return (
      <ExportDataButtonBase
          isLoading={isLoading}
          className={className}
          launchOverlayFunction={launchOverlayFunction}
      />
  );
}

ExportTagReportButton.propTypes = {
  tagData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportTagReportButton;