import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import GitToGitMergeSyncTaskWizard
  from "components/tasks/details/tasks/merge_sync_task/wizard/git_to_git/GitToGitMergeSyncTaskWizard";

function GitToGitMergeSyncTaskWizardOverlay({ taskModel }) {
  const toastContext = useContext(DialogToastContext);
  let history = useHistory();
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    history.push(`/task`);
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Git to Git Merge Sync Wizard`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
    >
      <GitToGitMergeSyncTaskWizard
        taskModel={taskModel}
        handleClose={closePanel}
      />
    </FullScreenCenterOverlayContainer>
  );
}

GitToGitMergeSyncTaskWizardOverlay.propTypes = {
  taskModel: PropTypes.object
};

export default GitToGitMergeSyncTaskWizardOverlay;