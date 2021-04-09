import React, {useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";

function ActionBarExportDataButton({exportData, isLoading}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const closeModal = () => {
    setShowExportModal(false);
  };

  return (
    <>
      <ActionBarButton
        action={() => setShowExportModal(true)}
        iconClasses={"mr-2"}
        icon={faFileDownload}
        popoverText={`Export Data`}
      />
      <ExportDataModalBase
        showModal={showExportModal}
        handleCancelModal={closeModal}
        isLoading={isLoading}
        dataToExport={exportData}
      />
    </>
  );
}

ActionBarExportDataButton.propTypes = {
  exportData: PropTypes.any,
  isLoading: PropTypes.bool
};

export default ActionBarExportDataButton;