import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScheduledTaskEditorPanel from "components/common/fields/scheduler/ScheduledTaskEditorPanel";
import axios from "axios";
import {faCalendarAlt} from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import ScheduledTasksTable from "components/common/fields/scheduler/ScheduledTasksTable";
import {AuthContext} from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import modelHelpers from "components/common/model/modelHelpers";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";

function PipelineScheduledTasksOverlay(
  {
    pipelineId,
    loadDataFunction,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [scheduledTaskModel, setScheduledTaskModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setScheduledTasks([]);

    if (isMongoDbId(pipelineId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

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
    const response = await scheduledTaskActions.getScheduledPipelineTasksV2(getAccessToken, cancelSource, pipelineId);
    const newScheduledTasksList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newScheduledTasksList)) {
      setScheduledTasks([...newScheduledTasksList]);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();

    if (loadDataFunction) {
      loadDataFunction();
    }
  };

  const closeEditorPanel = async () => {
    if (isMounted?.current === true) {
      setScheduledTaskModel(null);
      await loadData();
    }
  };

  const createScheduledTaskFunction = () => {
    const newModel = modelHelpers.parseObjectIntoModel(undefined, scheduledTaskMetadata);
    newModel.setData("task", { taskType: "pipeline-run", pipelineId: pipelineId });
    setScheduledTaskModel({ ...newModel });
  };

  const getBody = () => {
    if (scheduledTaskModel) {
      return (
        <ScheduledTaskEditorPanel
          handleClose={closeEditorPanel}
          scheduledTaskData={scheduledTaskModel}
          taskList={scheduledTasks}
        />
      );
    }

    return (
      <ScheduledTasksTable
        isLoading={isLoading}
        scheduledTasks={scheduledTasks}
        loadDataFunction={loadData}
        setScheduledTaskModel={setScheduledTaskModel}
        isMounted={isMounted}
        createScheduledTaskFunction={createScheduledTaskFunction}
      />
    );
  };

  return (
    <CenterOverlayContainer
      titleText={"Pipeline Scheduled Tasks"}
      closePanel={closePanel}
      titleIcon={faCalendarAlt}
      showPanel={true}
      showCloseButton={scheduledTaskModel == null}
    >
      {getBody()}
    </CenterOverlayContainer>
  );
}

PipelineScheduledTasksOverlay.propTypes = {
  pipelineId: PropTypes.string,
  loadDataFunction: PropTypes.func,
};

export default PipelineScheduledTasksOverlay;


