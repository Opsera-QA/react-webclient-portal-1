import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import gitTasksMetadata from "components/tasks/git-tasks-metadata";
import GitTaskEditorPanel from "components/tasks/git_task_details/GitTaskEditorPanel";

function NewGitTaskOverlay({ loadData, isMounted } ) {
  const toastContext = useContext(DialogToastContext);
  const [gitTasksData, setGitTasksData] = useState(new Model({...gitTasksMetadata.newObjectFields}, gitTasksMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel objectType={gitTasksMetadata.type} loadData={loadData} closePanel={closePanel}>
      <GitTaskEditorPanel gitTasksData={gitTasksData} setGitTasksData={setGitTasksData} handleClose={closePanel} />
    </CreateCenterPanel>
  );
}

NewGitTaskOverlay.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default NewGitTaskOverlay;