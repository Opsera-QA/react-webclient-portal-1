import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import TaskEditorPanel from "components/tasks/details/TaskEditorPanel";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import TaskModel from "components/tasks/task.model";

function NewTaskOverlay(
  {
    loadData,
    isMounted,
    taskMetadata,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [taskModel, setTaskModel] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    if (taskMetadata) {
      createNewTaskModel(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
    };
  }, [taskMetadata]);

  const createNewTaskModel = async (cancelSource = cancelTokenSource) => {
    try {
      const newTaskModel = new TaskModel(
        { ...taskMetadata.newObjectFields },
        taskMetadata,
        true,
        getAccessToken,
        cancelSource,
        loadData,
        true,
        false,
        setTaskModel
      );
      setTaskModel({...newTaskModel});
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (taskMetadata == null || taskModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      objectType={taskMetadata?.type}
      loadData={loadData}
      closePanel={closePanel}
    >
      <TaskEditorPanel
        taskData={taskModel}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewTaskOverlay.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  taskMetadata: PropTypes.object,
};

export default NewTaskOverlay;