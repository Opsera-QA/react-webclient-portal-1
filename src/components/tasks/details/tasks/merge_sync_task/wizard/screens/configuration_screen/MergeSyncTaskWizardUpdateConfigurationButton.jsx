import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import mergeSyncTaskWizardActions from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  MERGE_SYNC_TASK_JOB_TYPES
} from "../../../../../../../common/list_of_values_input/tasks/type/merge_sync_task/mergeSyncTaskJob.types";

function MergeSyncTaskWizardUpdateConfigurationButton({
  wizardModel,
  setCurrentScreen,
  size,
  className,
  disabled,
  icon,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
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

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const updateTaskWizardRecordConfiguration = async () => {
    try {
      setIsSaving(true);
      await mergeSyncTaskWizardActions.updatePipelineStorageRecordV2(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
      );
      if (isMounted?.current === true) {
        setCurrentScreen(
          MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN,
        );
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Could not update wizard record configuration:");
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  if (wizardModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return "Updating Parameters";
    }

    return "Update Parameters and Proceed";
  };

  const checkSelectedComponentTypes = () => {
    if(wizardModel?.getData("taskType") === MERGE_SYNC_TASK_JOB_TYPES.SFDC_GIT_COMPARE_SYNC) {
      return wizardModel?.getArrayData("selectedComponentTypes").length < 1;
    }
    return false;
  };

  return (
    <div className={className}>
      <Button
        size={size}
        variant={"primary"}
        disabled={isSaving === true || disabled === true || checkSelectedComponentTypes() || wizardModel?.checkCurrentValidity() !== true}
        onClick={updateTaskWizardRecordConfiguration}
      >
        <span>
          <IconBase
            icon={icon}
            className={"mr-2"}
            isLoading={isSaving}
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

MergeSyncTaskWizardUpdateConfigurationButton.propTypes = {
  wizardModel: PropTypes.object,
  setCurrentScreen: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

MergeSyncTaskWizardUpdateConfigurationButton.defaultProps = {
  size: "sm",
  icon: faSync
};

export default MergeSyncTaskWizardUpdateConfigurationButton;