import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";
import { faFileDownload } from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";

export default function ExportGitlabCommitsDataOverlay({
  isLoading,
  getRawData,
  getPdfExporter,
  getCsvData,
}) {
  const toastContext = useContext(DialogToastContext);

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };

  return (
    <ConfirmationOverlay
      closePanel={closePanelFunction}
      titleText={"Export Data"}
      showCloseButton={false}
      titleIcon={faFileDownload}
      height={"300px"}
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

ExportGitlabCommitsDataOverlay.propTypes = {
  isLoading: PropTypes.bool,
  getRawData: PropTypes.func,
  getCsvData: PropTypes.func,
  getPdfExporter: PropTypes.func,
};
