import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import salesforceBulkMigrationWizardActions
  from "components/workflow/wizards/salesforce_bulk_migration/salesforceBulkMigrationWizard.actions";

const SalesforceBulkMigrationTriggerTaskButton = ({pipelineWizardModel, handleClose, setError}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [isTriggeringTask, setIsTriggeringTask] = useState(false);
  const toastContext = useContext(DialogToastContext);
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

  const triggerGitTask = async () => {
    let createJobResponse;
    try {
      setIsTriggeringTask(true);
      createJobResponse = await salesforceBulkMigrationWizardActions.triggerTaskV2(getAccessToken, cancelTokenSource, pipelineWizardModel.getData("gitTaskId"));

      if (createJobResponse?.data?.message?.status === "EXECUTED") {
        toastContext.showInformationToast("A request to start this Task has been submitted. It will begin shortly.", 20);
        handleClose();
      } else {
        setError(createJobResponse?.data?.message);
      }
    } catch (error) {
      setError(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsTriggeringTask(false);
      }
    }
  };

  return (
    <Button variant="success" size="sm" onClick={triggerGitTask} disabled={isTriggeringTask}>
      <IconBase className={"mr-2"} isLoading={isTriggeringTask} icon={faCheck}/>
      Proceed
    </Button>
  );
};


SalesforceBulkMigrationTriggerTaskButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  setError: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func,
  handlePipelineWizardRequest: PropTypes.func
};

export default SalesforceBulkMigrationTriggerTaskButton;
