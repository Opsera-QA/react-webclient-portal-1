import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faCheckSquare, faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";

function MergeSyncTaskWizardSelectFileVersionButton(
  {
    wizardModel,
    setWizardModel,
    comparisonFileModel,
    fileName,
    fileContent,
    type,
    disabled,
    size,
    className,
    icon,
    isLoading,
    fieldName,
    selected,
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

      if (isMounted?.current === true && response) {
        const newUpdatedFileList = wizardModel?.getArrayData("updatedFileList");
        const currentIndex = newUpdatedFileList?.findIndex((updatedFile) => updatedFile?.fileName === fileName);
        const newFileData = {
          fileName: fileName,
          fieldName: fieldName,
        };

        if (currentIndex === -1) {
          newUpdatedFileList.push(newFileData);
        }
        else {
          newUpdatedFileList[currentIndex] = newFileData;
        }
        wizardModel.setData("updatedFileList", newUpdatedFileList);
        setWizardModel({...wizardModel});
      }
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
    if (selected) {
      return (`${type} File Changes Selected for Merge Sync`);
    }

    if (isSaving) {
      return (`Saving ${type} File Changes`);
    }

    return (`Select ${type} File Changes`);
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={selected === true ? "success" : "primary"}
          disabled={disabled === true || isSaving === true || isLoading === true || selected === true}
          onClick={submitSelectedFile}
        >
          <span>
            <IconBase
              isLoading={isSaving}
              icon={selected === true ? faCheckSquare : icon}
              className={"mr-2"}
            />
            {getLabel()}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardSelectFileVersionButton.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  comparisonFileModel: PropTypes.object,
  fileName: PropTypes.string,
  fileContent: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  selected: PropTypes.bool,
};

MergeSyncTaskWizardSelectFileVersionButton.defaultProps = {
  size: "sm",
  icon: faQuestionCircle,
};

export default MergeSyncTaskWizardSelectFileVersionButton;