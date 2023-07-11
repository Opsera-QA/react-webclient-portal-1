import React, { useContext } from 'react';
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import { DialogToastContext } from "contexts/DialogToastContext";

function MergeSyncTaskWizardConfirmationButton(
  {
    wizardModel,
    setCurrentScreen,
    disabled,
    size,
    className,
    icon,
    diffFileList,
  }) {
  const toastContext = useContext(DialogToastContext);

  const relocateToConfirmationScreen = async () => {
    if (wizardModel?.getArrayData("updatedFileList") && wizardModel?.getArrayData("updatedFileList").length === 0 && diffFileList.every(item => item.commitAction === 'unmodified')) {
      toastContext.showInlineErrorMessage("There is no diff between any of the files selected.");
      return;
    }
    if (setCurrentScreen) {
      setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.CONFIRMATION_SCREEN);
    }
  };

  const getLabel = () => {
    const updatedFileListLength = Array.isArray(diffFileList) ? diffFileList?.length : diffFileList;
    const fileOrFiles = updatedFileListLength === 1 || updatedFileListLength === -1 ? "File" : "Files";
    return (`Confirm Merge Sync for ${updatedFileListLength} ${fileOrFiles}`);
  };

  if (wizardModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={"success"}
          disabled={
            disabled === true
            || Array.isArray(diffFileList) !== true
            || diffFileList?.length === 0
          }
          onClick={relocateToConfirmationScreen}
        >
          <span>
            <IconBase
              icon={icon}
              className={"mr-2"}
            />
            {getLabel()}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardConfirmationButton.propTypes = {
  wizardModel: PropTypes.object,
  setCurrentScreen: PropTypes.func,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  diffFileList: PropTypes.array,
};

MergeSyncTaskWizardConfirmationButton.defaultProps = {
  size: "sm",
  icon: faCheckCircle,
  diffFileList: [],
};

export default MergeSyncTaskWizardConfirmationButton;