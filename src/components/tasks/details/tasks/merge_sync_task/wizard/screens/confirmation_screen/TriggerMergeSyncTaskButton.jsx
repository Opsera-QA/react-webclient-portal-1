import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import { hasStringValue } from "components/common/helpers/string-helpers";

const TriggerMergeSyncTaskButton = ({ wizardModel, handleClose }) => {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isTriggeringTask, setIsTriggeringTask] = useState(false);
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

  const triggerTask = async () => {
    try {
      setIsTriggeringTask(true);
      const response = await mergeSyncTaskWizardActions.runMergeSyncTask(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
      );

      if (isMounted?.current === true) {
        const message = response?.data;

        if (hasStringValue(message) === true) {
          toastContext.showInformationToast(message, 20);
        }

        if (handleClose) {
          handleClose();
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Could not trigger Merge Sync:");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsTriggeringTask(false);
      }
    }
  };

  const getButtonLabel = () => {
    if (isTriggeringTask) {
      return ("Triggering Merge Sync Task");
    }

    return ("Trigger Merge Sync Task");
  };

  return (
    <Button
      variant={"success"}
      size={"sm"}
      onClick={triggerTask}
      disabled={isTriggeringTask}
    >
      <IconBase
        className={"mr-2"}
        isLoading={isTriggeringTask}
        icon={faCheck}
      />
      {getButtonLabel()}
    </Button>
  );
};


TriggerMergeSyncTaskButton.propTypes = {
  wizardModel: PropTypes.object,
  handleClose: PropTypes.func,
};

export default TriggerMergeSyncTaskButton;
