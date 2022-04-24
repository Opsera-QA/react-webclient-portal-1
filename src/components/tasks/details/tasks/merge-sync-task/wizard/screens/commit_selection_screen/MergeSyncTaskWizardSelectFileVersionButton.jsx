import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faCheckSquare } from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.actions";

function MergeSyncTaskWizardSelectFileVersionButton(
  {
    wizardModel,
    comparisonFileModel,
    fileName,
    fileContent,
    type,
    disabled,
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

  const submitSelectedFile = async () => {
    try {
      setIsSaving(true);
      const response = await mergeSyncTaskWizardActions.updateSelectedFileContent(
        getAccessToken,
        cancelTokenSource,
        wizardModel?.getData("taskId"),
        wizardModel?.getData("runCount"),
        fileName,
        fileContent,
      );

      console.log("response: " + JSON.stringify(response));
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  if (wizardModel == null || comparisonFileModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return (`Saving ${type} File Changes`);
    }

    return (`Select ${type} File Changes`);
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button size={size} variant={"primary"} disabled={disabled || isSaving || isLoading} onClick={submitSelectedFile}>
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2" />{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardSelectFileVersionButton.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  fileContent: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

MergeSyncTaskWizardSelectFileVersionButton.defaultProps = {
  size: "sm",
  icon: faCheckSquare,
};

export default MergeSyncTaskWizardSelectFileVersionButton;