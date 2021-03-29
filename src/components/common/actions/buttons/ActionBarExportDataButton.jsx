import React, {useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import ExportDataModal from "components/common/modal/export_data/ExportDataModal";

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
      <ExportDataModal
        showModal={showExportModal}
        handleCancelModal={closeModal}
        setParentVisibility={setShowExportModal}
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