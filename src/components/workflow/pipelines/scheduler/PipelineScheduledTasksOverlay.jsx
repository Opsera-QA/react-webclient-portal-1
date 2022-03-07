import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineScheduledTaskEditorPanel from "components/workflow/pipelines/scheduler/PipelineScheduledTaskEditorPanel";
import axios from "axios";
import {faCalendarAlt} from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import pipelineSchedulerActions from "components/workflow/pipelines/scheduler/pipeline-scheduler-actions";
import PipelineScheduledTaskTable from "components/workflow/pipelines/scheduler/PipelineScheduledTaskTable";
import {AuthContext} from "contexts/AuthContext";

// TODO: Only pass pipeline ID.
function PipelineScheduledTasksOverlay({ pipelineId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledTasksList, setScheduledTasksList] = useState([]);
  const [scheduledTaskData, setScheduledTaskData] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadScheduledTasks(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadScheduledTasks = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineSchedulerActions.getScheduledTasks(getAccessToken, cancelSource, pipelineId);
    const newScheduledTasksList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newScheduledTasksList) && newScheduledTasksList.length > 0) {
      setScheduledTasksList([...newScheduledTasksList]);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const closeEditorPanel = async () => {
    if (isMounted?.current === true ) {
      setScheduledTaskData(null);
    }
   await loadData();
  };

  const getBody = () => {
    if (scheduledTaskData) {
      return (
        <PipelineScheduledTaskEditorPanel
          handleClose={closeEditorPanel}
          scheduledTaskData={scheduledTaskData}
          taskList={scheduledTasksList}
        />
      );
    }

    return (
      <PipelineScheduledTaskTable
        isLoading={isLoading}
        setScheduledTaskData={setScheduledTaskData}
        data={scheduledTasksList}
        loadData={loadData}
        isMounted={isMounted}
        pipelineId={pipelineId}
      />
    );
  };

  return (
    <CenterOverlayContainer
      titleText={"Pipeline Scheduled Tasks"}
      closePanel={closePanel}
      titleIcon={faCalendarAlt}
      showPanel={true}
      showCloseButton={scheduledTaskData == null}
    >
      {getBody()}
    </CenterOverlayContainer>
  );
}

PipelineScheduledTasksOverlay.propTypes = {
  pipelineId: PropTypes.string,
};

export default PipelineScheduledTasksOverlay;


