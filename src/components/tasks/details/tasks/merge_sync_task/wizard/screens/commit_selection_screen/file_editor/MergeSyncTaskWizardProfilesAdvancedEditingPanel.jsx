import React, {useState, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";
const MergeSyncTaskWizardProfilesAdvancedEditingPanel = (
  {
    wizardModel,
    comparisonFileModel,
    setComparisonFileModel,
    originalContent,
    modifiedContent,
    isLoading
  }) => {

  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isJsonLoading, setIsJsonLoading] = useState(true);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {

    // if (hasStringValue(originalContent) && hasStringValue(modifiedContent) ) {
      loadJsonData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    // }
  }, [originalContent, modifiedContent]);

  const loadJsonData = async () => {
    try {
      setIsJsonLoading(true);
      // TODO : Convert both original and modified contents to JSON

      if(hasStringValue(originalContent)){
        console.log(typeof originalContent);
        console.log(originalContent.length);
        const jsonForOriginalContent = await mergeSyncTaskWizardActions.fileConvertView(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          originalContent,
        );
        console.log(jsonForOriginalContent);
      }


      if(hasStringValue(modifiedContent)) {
        console.log(typeof modifiedContent);
        console.log(modifiedContent.length);
        const jsonForModifiedContent = await mergeSyncTaskWizardActions.fileConvertView(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          modifiedContent,
        );
        console.log(jsonForModifiedContent);
      }

    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsJsonLoading(false);
      }
    }
  };


  if (isLoading === true) {
    return (<LoadingDialog size={"sm"} message={"Loading Selected File Changes"} />);
  }

    return (
    <>{originalContent}</>
  );
};

MergeSyncTaskWizardProfilesAdvancedEditingPanel.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  originalContent: PropTypes.string,
  modifiedContent: PropTypes.string,
};

export default MergeSyncTaskWizardProfilesAdvancedEditingPanel;