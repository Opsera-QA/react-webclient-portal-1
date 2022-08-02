import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportToolCountDataOverlay from "components/reports/tools/counts/export/ExportToolCountDataOverlay";
import IconBase from "components/common/icons/IconBase";
import ExportTaskActivityLogDataOverlay from "components/tasks/activity_logs/ExportTaskActivityLogDataOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";

function ExportToolCountButton(
  {
    isLoading,
    toolData,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportToolCountDataOverlay
        isLoading={isLoading}
        formattedData={formattedData()}
        rawData={rawDataResults()}
      />
    );
  };

  const rawDataResults = () =>{
    return toolData ? toolData.map(item => JSON.stringify(item)) : "export failure";
   };

  const formattedData = () => {
    let formattedData = toolData;

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

ExportToolCountButton.propTypes = {
  toolData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportToolCountButton;