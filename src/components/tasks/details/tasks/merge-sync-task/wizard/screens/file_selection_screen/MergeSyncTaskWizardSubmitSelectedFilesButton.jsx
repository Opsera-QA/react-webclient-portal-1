import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStepForward} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.actions";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.constants";

function MergeSyncTaskWizardSubmitSelectedFilesButton({
  taskWizardModel,
  setCurrentScreen,
  filteredFileCount,
  size,
  className,
  icon,
  isLoading,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setIsSaving(false);

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const submitSelectedFiles = async () => {
    try {
      setIsSaving(true);
      await mergeSyncTaskWizardActions.setSelectedFileListV2(
        getAccessToken,
        cancelTokenSource,
        taskWizardModel,
      );
      setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.COMMIT_SELECTION_SCREEN);
    } catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  if (taskWizardModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return `Saving ${filteredFileCount} Selected Files`;
    }

    return `Proceed with ${filteredFileCount} Files`;
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={"primary"}
          disabled={filteredFileCount === 0 || isSaving || isLoading}
          onClick={submitSelectedFiles}
        >
          <span>
            <IconBase
              isLoading={isSaving}
              icon={icon}
              fixedWidth
              className="mr-2"
            />
            {getLabel()}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardSubmitSelectedFilesButton.propTypes = {
  taskWizardModel: PropTypes.object,
  setCurrentScreen: PropTypes.func,
  filteredFileCount: PropTypes.number,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

MergeSyncTaskWizardSubmitSelectedFilesButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default MergeSyncTaskWizardSubmitSelectedFilesButton;