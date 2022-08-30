import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";
import { faFileDownload } from "@fortawesome/pro-light-svg-icons";

export default function ExportDataOverlay({
  isLoading,
  getRawData,
  getPdfExporter,
  getCsvData,
}) {
  const toastContext = useContext(DialogToastContext);

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanelFunction}
      titleText={"Export Data"}
      showCloseButton={false}
      titleIcon={faFileDownload}
    >
      <ExportDataPanel
        isLoading={isLoading}
        getRawData={getRawData}
        getPdfExporter={getPdfExporter}
        getCsvData={getCsvData}
        closePanelFunction={closePanelFunction}
      />
    </CenterOverlayContainer>
  );
}

ExportDataOverlay.propTypes = {
  isLoading: PropTypes.bool,
  getRawData: PropTypes.func,
  getCsvData: PropTypes.func,
  getPdfExporter: PropTypes.func,
};
