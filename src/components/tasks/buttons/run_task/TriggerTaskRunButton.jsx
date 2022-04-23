import React, {useState, useContext, useRef, useEffect} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faPlay } from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import GitTaskSfdcPipelineWizardOverlay from "components/tasks/buttons/run_task/GitTaskSfdcPipelineWizardOverlay";
import taskActions from "components/tasks/task.actions";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";
import {TASK_TYPES} from "components/tasks/task.types";
import SalesforceBulkMigrationTaskWizardOverlay
  from "components/tasks/buttons/run_task/SalesforceBulkMigrationTaskWizardOverlay";
import GitToGitMergeSyncTaskWizardOverlay
  from "components/tasks/details/tasks/merge-sync-task/wizard/git_to_git/GitToGitMergeSyncTaskWizardOverlay";
import { hasStringValue } from "components/common/helpers/string-helpers";
import modelHelpers from "../../../common/model/modelHelpers";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "../../details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";

// TODO: THis should be separated into multiple buttons based on task.
function TriggerTaskRunButton({gitTasksData, setGitTasksData, gitTasksConfigurationDataDto, handleClose, disable, className, loadData }) {
  let toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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

  const checkValidity = () => {
    return !gitTasksConfigurationDataDto?.checkCurrentValidity();
  };

  // TODO: This should be separate buttons OR passed into this component from a wrapper component for each type
  const handleRunGitTask = async () => {
    // TODO: consolidate trigger calls
    if (gitTasksData?.getData("type") === TASK_TYPES.SALESFORCE_BULK_MIGRATION) {
      try{
        setIsLoading(true);
        const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
        gitTasksData.setData("configuration", configuration);
        await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
        handleClose();
        toastContext.showOverlayPanel(
          <SalesforceBulkMigrationTaskWizardOverlay
            taskModel={gitTasksData}
          />
        );
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
      } finally {
        setIsLoading(false);
      }
    }
    else if (gitTasksData?.getData("type") === TASK_TYPES.GIT_TO_GIT_MERGE_SYNC) {
      try{
        setIsLoading(true);
        const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
        gitTasksData.setData("configuration", configuration);
        await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
        handleClose();
        toastContext.showOverlayPanel(
          <GitToGitMergeSyncTaskWizardOverlay
            taskModel={gitTasksData}
          />
        );
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
      } finally {
        setIsLoading(false);
      }
    }
    else if (gitTasksData?.getData("type") === TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC) {
      toastContext.showOverlayPanel(
        <GitToGitMergeSyncTaskWizardOverlay
          taskModel={gitTasksData}
        />
      );
    }
    else if (gitTasksData?.getData("type") === TASK_TYPES.SYNC_SALESFORCE_REPO) {
       try {
        setIsLoading(true);
        const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
        gitTasksData.setData("configuration", configuration);
        await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        setIsLoading(false);
      } finally {
        handleClose();
        toastContext.showOverlayPanel(<GitTaskSfdcPipelineWizardOverlay gitTasksData={gitTasksData}/>);
        setIsLoading(false);
      }
    }
    else if (gitTasksData?.getData("type") === TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE) {
      // pipeline action call to trigger branch conversion
      try{
        setIsLoading(true);
        await sfdcPipelineActions.triggerGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData.getData("_id"));
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        setIsLoading(false);
      } finally {
        handleClose();
        setIsLoading(false);
      }
    }
    else if (gitTasksData?.getData("type") === TASK_TYPES.SYNC_GIT_BRANCHES){
      // call to trigger merge request
      try{
        setIsLoading(true);
        let postBody = {
          "gitTaskId":gitTasksData.getData("_id")
        };
        await taskActions.processSyncRequest(postBody, getAccessToken);
      } catch (error) {
        console.log(error);
        if(error?.error?.response?.data?.message){
          toastContext.showLoadingErrorDialog(error.error.response.data.message);
        }else{
          toastContext.showLoadingErrorDialog(error);
        }

        setIsLoading(false);
      } finally {
        handleClose();
        setIsLoading(false);
      }
    }
    else if (gitTasksData?.getData("type") === TASK_TYPES.AWS_CREATE_ECS_CLUSTER){
      // call to trigger merge request
      try{
        setIsLoading(true);
        let postBody = {
          "taskId":gitTasksData.getData("_id")
        };
        let result = await taskActions.createEcsClusterWithTaskIdV2(postBody, getAccessToken, gitTasksData.getData("_id"));
        toastContext.showSuccessDialog("ECS Cluster Creation Triggered Successfully");
      } catch (error) {
        console.log(error);
        if(error?.error?.response?.data?.message){
          toastContext.showCreateFailureResultDialog("ECS Cluster" ,error.error.response.data.message);
        }else{
          toastContext.showCreateFailureResultDialog(
            "ECS Cluster",
            "A service level error has occurred in creation of the ECS Cluster - check the Activity Logs for a complete error log."
          );
        }
        setIsLoading(false);
      } finally {
        handleClose();
        setIsLoading(false);
      }
    }
    else if (gitTasksData?.getData("type") === TASK_TYPES.SALESFORCE_QUICK_DEPLOY) {
      try {
        setIsLoading(true);
        const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
        gitTasksData.setData("configuration", configuration);
        await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
        await taskActions.triggerTask(getAccessToken, cancelTokenSource, gitTasksData);
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        setIsLoading(false);
      } finally {
        handleClose();
        setIsLoading(false);
      }
    }
  };

  const getLabel = () => {
    if (isLoading) {
      return ("Running Task");
    }
    return ("Run Task");
  };

  if (gitTasksData == null) {
    return (<LoadingDialog size={"sm"} />);
  }

  return (
    <div className={className}>
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable || isLoading || checkValidity() }
        onClick={() => {handleRunGitTask(true);}}
      >
        <span><IconBase icon={faPlay} isLoading={isLoading} className="mr-2" fixedWidth/>{getLabel()}</span>
      </Button>
    </div>
  );
}

TriggerTaskRunButton.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  setGitTasksData: PropTypes.func,
  gitTasksConfigurationDataDto: PropTypes.object,
  className: PropTypes.string,
  handleClose: PropTypes.func
};

export default TriggerTaskRunButton;