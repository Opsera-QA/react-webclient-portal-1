import React, {useState, useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faLaptopMedical, faPlay, faSpinner } from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import taskActions from "components/tasks/task.actions";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";

function CheckECSStatus({gitTasksData, handleClose, disable, className, loadData }) {
  let toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckStatus = async() => {
    if (gitTasksData.getData("type") === "ecs_cluster_creation"){
      try{
        setIsLoading(true);
        let postBody = {
          "taskId":gitTasksData.getData("_id")
        };
        await taskActions.checkECSStatus(postBody, getAccessToken);
        toastContext.showSuccessDialog("Status check successful. View Activity Logs for a detailed report");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getLabel = () => {
    if (isLoading) {
      return ( <span><LoadingIcon className={"mr-1"}/>Checking Status</span>);
    }
    return ( <span><IconBase icon={faLaptopMedical} className={"mr-1"} fixedWidth/>Check Status</span>);
  };

  if (gitTasksData.getData("type") !== "ecs_cluster_creation") {
    return null;
  }

  if (!gitTasksData?.data?.configuration?.stackId || gitTasksData?.data?.configuration?.stackId?.length === 0 || gitTasksData?.run_count === 0) {
    return null;
  }


  return (
    <div className={className}>
      <Button
        variant={"warning"}
        disabled={gitTasksData?.getData("status") === "running" || disable || isLoading}
        onClick={() => {handleCheckStatus(true);}}
      >
        {getLabel()}
      </Button>
    </div>
  );
}

CheckECSStatus.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func
};

export default CheckECSStatus;