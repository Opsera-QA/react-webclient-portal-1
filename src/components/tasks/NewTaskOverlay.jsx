import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import gitTasksMetadata from "components/tasks/git-tasks-metadata";
import TaskEditorPanel from "components/tasks/details/TaskEditorPanel";

function NewTaskOverlay({ loadData, isMounted } ) {
  const toastContext = useContext(DialogToastContext);
  const [taskData] = useState(new Model({...gitTasksMetadata.newObjectFields}, gitTasksMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel objectType={gitTasksMetadata.type} loadData={loadData} closePanel={closePanel}>
      <TaskEditorPanel taskData={taskData} handleClose={closePanel} />
    </CreateCenterPanel>
  );
}

NewTaskOverlay.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default NewTaskOverlay;