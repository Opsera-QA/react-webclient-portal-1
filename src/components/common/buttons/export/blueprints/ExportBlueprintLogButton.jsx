import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportBlueprintDataOverlay from "components/blueprint/export/ExportBlueprintDataOverlay";
import IconBase from "components/common/icons/IconBase";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";

//check if item can be parsed to JSON
function isJson(item) {
  item = typeof item !== "string"
    ? JSON.stringify(item)
    : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  return typeof item === "object" && item !== null;
}

function ExportBlueprintLogButton({isLoading, blueprintLog, pipelineId, runCount, blueprintName, numberOfSteps, logData}) {
  const toastContext = useContext(DialogToastContext);
  let summaryData = {pipelineId, runCount, blueprintName, numberOfSteps};

  const formatBlueprintLogData = () => {
    let formattedData = [...blueprintLog];

    //check each item in the completeInput array and format to match search results
    for (let i = 0; i < formattedData.length; i++) {
      let stepName = logData[i]?.api_response?.start?.step_name ? logData[i]?.api_response?.start?.step_name : logData[i]?.step_name;
      let requestedAt = logData[i]?.updatedAt;
      let responseMessage = logData[i]?.message;
      let api = logData[i]?.api_response?.current?.data?.API;
      let body = JSON.stringify(logData[i]?.api_response?.current?.data?.body, null, 4);
      let apiResponse = logData[i]?.api_response?.current?.data?.apiResponse ? JSON.stringify(logData[i]?.api_response?.current?.data?.apiResponse, null, 4) : "ERROR: API response is unavailable";
      let status = logData[i]?.status;

      //code formatting necessary to format literals
      if (isJson(formattedData[i]) && !api) {
        formattedData[i] = {
          step: `Step Name: ${stepName}\n
Requested At: ${requestedAt}\n
Response Message: ${responseMessage}\n
API Response: ${apiResponse}\n
Status: ${status}`,
          name: stepName
        };
      } else {
        if (isJson(formattedData[i])) {
          formattedData[i] = {
            step: `  Step Name: ${stepName}\n
  Requested At: ${requestedAt}\n
  Response Message: ${responseMessage}\n
  API: ${api}\n
  Body: ${body}\n
  API Response: ${apiResponse}\n
  Status: ${status}`,
            name: stepName
          };
        } else {
          formattedData[i] = {
            step: formattedData[i],
            name: logData[i]?.step_configuration?.configuration?.jobType ? logData[i]?.step_configuration?.configuration?.jobType : logData[i]?.step_name
          };
        }
      }
    }

    return formattedData;
  };

  // TODO: Refine when more is complete

  const launchOverlay = () => {
    toastContext.showOverlayPanel(
      <ExportBlueprintDataOverlay
        isLoading={isLoading}
        formattedData={formatBlueprintLogData()}
        rawData={blueprintLog}
        summaryData={summaryData}
        logData={logData}
      />
    );
  };

  return (
    <>
      <TooltipWrapper innerText={"Export as PDF"}>
        <div>
          <Button
            variant={"outline-dark"}
            size={"sm"}
            disabled={isLoading}
            className={"ml-2"}
            onClick={launchOverlay}>
            <span><IconBase icon={faFileDownload}/></span>
          </Button>
        </div>
      </TooltipWrapper>
    </>
  );
}


ExportBlueprintLogButton.propTypes = {
  blueprintLog: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineId: PropTypes.string,
  runCount: PropTypes.number,
  blueprintName: PropTypes.any,
  numberOfSteps: PropTypes.number,
  logData: PropTypes.any
};

export default ExportBlueprintLogButton;