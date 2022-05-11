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

function MergeSyncTaskWizardCommitFileDiffSelectionsButton(
  {
    wizardModel,
    setWizardModel,
    comparisonFileModel,
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

  const submitDiffSelections = async () => {
    try {
      setIsSaving(true);
      const fileName = comparisonFileModel?.getData("file");
      const response = await mergeSyncTaskWizardActions.confirmFileDiffSelections(
        getAccessToken,
        cancelTokenSource,
        wizardModel?.getData("taskId"),
        wizardModel?.getData("runCount"),
        fileName,
        comparisonFileModel?.getData("deltas"),
      );

      console.log("response: " + JSON.stringify(response));
      if (isMounted?.current === true && response) {
        const newUpdatedFileList = wizardModel?.getArrayData("updatedFileDeltas");
        const currentIndex = newUpdatedFileList?.findIndex((updatedFile) => updatedFile?.fileName === fileName);
        const newFileData = {
          fileName: fileName,
          deltas: comparisonFileModel?.getArrayData("deltas"),
        };

        if (currentIndex === -1) {
          newUpdatedFileList.push(newFileData);
        }
        else {
          newUpdatedFileList[currentIndex] = newFileData;
        }
        wizardModel.setData("updatedFileDeltas", newUpdatedFileList);
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
    if (isSaving) {
      return ("Saving File Change Selections");
    }

    if (areSelectionsSaved() === true) {
      return ("File Change Selections Confirmed");
    }

    return ("Confirm File Change Selections");
  };

  const areSelectionsSaved = () => {
    const newUpdatedFileList = wizardModel?.getArrayData("updatedFileDeltas");
    const fileName = comparisonFileModel?.getData("file");
    const currentIndex = newUpdatedFileList?.findIndex((updatedFile) => updatedFile?.fileName === fileName);
    return currentIndex !== -1;
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={areSelectionsSaved() === true ? "success" : "primary"}
          disabled={disabled === true || isSaving === true || isLoading === true}
          onClick={submitDiffSelections}
        >
          <span>
            <IconBase
              isLoading={isSaving}
              icon={areSelectionsSaved() === true ? faCheckSquare : icon}
              className={"mr-2"}
            />
            {getLabel()}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardCommitFileDiffSelectionsButton.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  comparisonFileModel: PropTypes.object,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
};

MergeSyncTaskWizardCommitFileDiffSelectionsButton.defaultProps = {
  size: "sm",
  icon: faQuestionCircle,
};

export default MergeSyncTaskWizardCommitFileDiffSelectionsButton;