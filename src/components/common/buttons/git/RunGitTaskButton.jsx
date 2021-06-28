import React, {useState, useContext, useRef, useEffect} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlay, faSpinner } from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import GitTaskSfdcPipelineWizardOverlay from "components/git/git_task_details/configuration_forms/sfdc-org-sync/GitTaskSfdcPipelineWizardOverlay";
import gitTasksActions from "components/git/git-task-actions";
import axios from "axios";

function RunGitTaskButton({gitTasksData, handleClose, disable, className, loadData }) {
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

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const handleRunGitTask = async () => {
    if (gitTasksData.getData("type") === "sync-sfdc-repo") {  
      // open wizard views
      toastContext.showOverlayPanel(<GitTaskSfdcPipelineWizardOverlay gitTasksData={gitTasksData}/>);
      // return;
    }    
    else if (gitTasksData.getData("type") === "sync-branch-structure") {    
      // pipeline action call to trigger branch conversion
      try{
        setIsLoading(true);
        await sfdcPipelineActions.triggerGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData.getData("_id"));
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    else if (gitTasksData.getData("type") === "sync-git-branches"){
      // call to trigger merge request
      try{
        setIsLoading(true);
        let postBody = {
          "gitTaskId":gitTasksData.getData("_id")
        };
        await gitTasksActions.processSyncRequest(postBody, getAccessToken);
      } catch (error) {
        console.log(error);
        if(error?.error?.response?.data?.message){
          toastContext.showLoadingErrorDialog(error.error.response.data.message);
        }else{
          toastContext.showLoadingErrorDialog(error);
        }

        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    else if (gitTasksData.getData("type") === "ecs_cluster_creation"){
      // call to trigger merge request
      try{
        setIsLoading(true);
        let postBody = {
          "taskId":gitTasksData.getData("_id")
        };
        await gitTasksActions.createECSCluster(postBody, getAccessToken);
        toastContext.showCreateSuccessResultDialog("ECS Cluster");
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
        setIsLoading(false);
      }
    }
    else if (gitTasksData.getData("type") === "ecs_service_creation"){
      // call to trigger merge request
      try{
        setIsLoading(true);
        let postBody = {
          "taskId":gitTasksData.getData("_id")
        };
        await gitTasksActions.createECSService(postBody, getAccessToken);
        toastContext.showCreateSuccessResultDialog("ECS Service");
      } catch (error) {
        console.log(error);
        if(error?.error?.response?.data?.message){
          toastContext.showCreateFailureResultDialog("ECS Service" ,error.error.response.data.message);
        }else{
          toastContext.showCreateFailureResultDialog(
            "ECS Service",
            "A service level error has occurred in creation of the ECS Service - check the Activity Logs for a complete error log."
          );
        }
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    handleClose();
  };

  const getLabel = () => {
    if (isLoading) {
      return ( <span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Running Task</span>);
    }
    return ( <span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Run Task</span>);
  };


  return (
    <div className={className}>
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable || isLoading}
        onClick={() => {handleRunGitTask(true);}}
      >
        {getLabel()}
      </Button>
    </div>
  );
}

RunGitTaskButton.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func
};

export default RunGitTaskButton;