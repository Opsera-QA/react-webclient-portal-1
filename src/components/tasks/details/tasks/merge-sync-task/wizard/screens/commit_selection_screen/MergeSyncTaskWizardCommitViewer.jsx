import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {parseError} from "components/common/helpers/error-helpers";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.actions";
import BackButton from "components/common/buttons/back/BackButton";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.constants";
import MergeSyncTaskWizardCommitSelectorVerticalTabContainer
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/commit_selection_screen/MergeSyncTaskWizardCommitSelectorVerticalTabContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import LoadingDialog from "components/common/status_notifications/loading";

const MergeSyncTaskWizardCommitViewer = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  diffFile,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setResponse(undefined);


    if (hasStringValue(diffFile?.committedFile)) {
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
  }, [diffFile]);

  const loadData = async (
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await getDiffFileList(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDiffFileList = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await mergeSyncTaskWizardActions.retrieveSelectedFileContent(
      getAccessToken,
      cancelSource,
      wizardModel?.getData("taskId"),
      wizardModel?.getData("runCount"),
      diffFile?.committedFile,
    );
    setResponse(response?.data);
  };

  if (isLoading === true) {
    return (<LoadingDialog size={"sm"} message={"Loading Selected File Changes"} />);
  }

  return (
    <div>
      <StandaloneJsonField
        titleText={"temp tilte"}
        json={response}
      />
    </div>
  );
};

MergeSyncTaskWizardCommitViewer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  diffFile: PropTypes.object,
};

export default MergeSyncTaskWizardCommitViewer;