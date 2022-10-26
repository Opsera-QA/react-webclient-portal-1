import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";
import { faFileDownload } from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";

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
    <ConfirmationOverlay
      closePanel={closePanelFunction}
      titleText={"Export Data"}
      showCloseButton={false}
      titleIcon={faFileDownload}
    >
      <div className={"m-3 w-100"}>
        <ExportDataPanel
          isLoading={isLoading}
          getRawData={getRawData}
          getPdfExporter={getPdfExporter}
          getCsvData={getCsvData}
          closePanelFunction={closePanelFunction}
        />
      </div>
    </ConfirmationOverlay>
  );
}

ExportDataOverlay.propTypes = {
  isLoading: PropTypes.bool,
  getRawData: PropTypes.func,
  getCsvData: PropTypes.func,
  getPdfExporter: PropTypes.func,
};
