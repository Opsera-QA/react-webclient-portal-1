import React, { useContext, useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import { DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ExportReportsDataOverlay from "../../../modal/export_data/ExportReportsDataOverlay";
import ExportDataButtonBase from "../../../modal/export_data/ExportDataButtonBase";

function ExportToolsUsedInPipelineReportButton(
  {
    isLoading,
    pipelineData,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportReportsDataOverlay
        isLoading={isLoading}
        formattedData={formattedData()}
        rawData={rawDataResults()}
      />
    );
  };

  const rawDataResults = () =>{
    return pipelineData ? pipelineData.map(item => JSON.stringify(item)) : "export failure";
  };

  const formattedData = () => {
    let formattedData = pipelineData;

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

ExportToolsUsedInPipelineReportButton.propTypes = {
  pipelineData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportToolsUsedInPipelineReportButton;