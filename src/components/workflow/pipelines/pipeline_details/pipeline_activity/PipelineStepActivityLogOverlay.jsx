import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import PipelineTaskTabPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskTabPanel";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";

// TODO: Rewrite, this was mostly kept intact from the original code
export default function PipelineStepActivityLogOverlay({pipelineId, tool, stepId, activityId}) {
  const [activityLog, setActivityLog] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();


  useEffect(() => {
    loadData(fetchPipelineActivityByTool).catch(() => {
    });
  }, [pipelineId, tool, stepId, activityId]);

  const fetchPipelineActivityByTool = async () => {
    setActivityLog(undefined);
    const response = await pipelineActions.getPipelineStepActivityLog(
      pipelineId,
      stepId,
      tool,
      activityId,
    );

    const parsedLog = DataParsingHelper.parseNestedObject(response, "data.pipelineData.0");

    if (parsedLog) {
      setActivityLog(parsedLog);
    }
  };

  const handleClose = () => {
    toastContext.clearOverlayPanel();
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

    if (activityLog == null) {
      return (
        <div>
          {`There was no activity log data found.`}
        </div>
      );
    }

    return (
      <PipelineTaskTabPanel
        pipelineTaskData={activityLog}
      />
    );
  };

  return (
    <CenterOverlayContainer
      closePanel={handleClose}
      titleText={"Step Activity Log"}
      isLoading={isLoading}
      titleIcon={faClipboardList}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </CenterOverlayContainer>
  );
}

PipelineStepActivityLogOverlay.propTypes = {
  pipelineId: PropTypes.string,
  tool: PropTypes.string,
  stepId: PropTypes.string,
  activityId: PropTypes.string,
};
