import React, {useState, useEffect, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import MergeSyncTaskWizardFileSelector
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/MergeSyncTaskWizardFileSelector";

const GitToGitMergeSyncTaskWizardFileSelectionScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggeredSourceFilePull, setTriggeredSourceFilePull] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await triggerGitToGitSourceFilePull(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        const prependMessage =
          "Service Error Triggering File List Pulls:";
        toastContext.showInlineErrorMessage(error, prependMessage);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const triggerGitToGitSourceFilePull = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response =
      await mergeSyncTaskWizardActions.triggerGitToGitSourceFilePull(
        getAccessToken,
        cancelSource,
        wizardModel,
      );
      setTriggeredSourceFilePull(true);
  };

  const getBody = () => {
    if (isLoading && triggeredSourceFilePull !== true) {
      return (
        <LoadingDialog
          size={"sm"}
          message={"Triggering Source Commit File Pull"}
        />
      );
    }

    if (triggeredSourceFilePull === true) {
      return (
        <MergeSyncTaskWizardFileSelector
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          setCurrentScreen={setCurrentScreen}
          handleClose={handleClose}
          fileSelectionRulesString={JSON.stringify(wizardModel?.getArrayData("fileSelectionRules"))}
        />
      );
    }
  };

  return (
    <div>
      <div className="h5">
        Git To Git Merge Sync: File Comparison and Selection
      </div>
      <div className="text-muted mb-2">
        Select which version of files will be merged in.
      </div>
      {getBody()}
    </div>
  );
};

GitToGitMergeSyncTaskWizardFileSelectionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func
};

export default GitToGitMergeSyncTaskWizardFileSelectionScreen;
