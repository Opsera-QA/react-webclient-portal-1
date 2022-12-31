import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";
import ReactJson from "react-json-view";
import {axiosApiService} from "api/apiService";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

// TODO: Rewrite, this was mostly kept intact from the original code
export default function PipelineStepActivityLogOverlay({pipelineId, tool, stepId, activityId}) {
  const [activityLog, setActivityLog] = useState(undefined);
  const {
    getAccessToken,
    toastContext,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();


  useEffect(() => {
    loadData(fetchPipelineActivityByTool).catch(() => {
    });
  }, [pipelineId, tool, stepId, activityId]);

  // TODO: Break out into separate actions file, maybe call in a pipeline activity overlay rather than here?
  const fetchPipelineActivityByTool = async () => {
    const accessToken = await getAccessToken();
    let apiUrl = `/pipelines/${pipelineId}/activity`;
    const params = {
      tool: tool,
      step_id: stepId,
      id: activityId,
    };

    const response = await axiosApiService(accessToken).get(apiUrl, {params});
    setActivityLog(response?.data?.pipelineData[0]);
  };

  const handleClose = () => {
    toastContext.clearOverlayPanel();
  };

  const getTitle = () => {
    if (isLoading === true) {
      return "Loading Step Activity Log Data";
    }


    if (activityLog?.action === "console output") {
      const toolIdentifier = DataParsingHelper.parseNestedString(activityLog, "step_configuration.tool_identifier", "");
      return capitalizeFirstLetter(`Tool Output: ${toolIdentifier}`);
    }

    return "Step Activity Log";
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Step Activity Log"}
        />
      );
    }

    if (error) {
      return (
        <div>
          {`There was an error loading this step's activity log data.`}
        </div>
      );
    }

    if (activityLog?.action === "console output") {
      return (
        <div className="m-2">
          <div className="float-right mr-2">{format(new Date(activityLog?.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</div>
          <span className="text-muted ml-2">Step: {activityLog?.step_name}</span>
          {typeof (activityLog?.api_response) === "string" ?
            <div className="console-text m-3">
              {activityLog?.api_response}
            </div> :
            <div className="m-3">

              {Object.keys(activityLog?.api_response).map((row, key) => {
                return <div key={key} className="console-text mb-1">
                  {typeof (activityLog?.api_response[row]) === "string" ?
                    activityLog?.api_response[row] :
                    <div className="m-3">{JSON.stringify(activityLog?.api_response[row])}</div>
                  }
                </div>;
              })}

            </div>}
        </div>
      );
    }

    return (
      <div className="m-3">
        <ReactJson src={activityLog} displayDataTypes={false}/>
      </div>
    );
  };

  return (
    <CenterOverlayContainer
      closePanel={handleClose}
      titleText={getTitle()}
    >
      {getBody()}
    </CenterOverlayContainer>
  );
}

PipelineStepActivityLogOverlay.propTypes = {
  pipelineId: PropTypes.string,
  tool: PropTypes.string,
  stepId: PropTypes.string,
  activityId: PropTypes.string,
};
