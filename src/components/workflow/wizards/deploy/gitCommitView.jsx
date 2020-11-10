import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faStepForward
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineActions from "../../pipeline-actions";

const GitCommitView = ({ pipelineId, templateId, autoRun, handleClose, setView }) => {
  const { getAccessToken } = useContext(AuthContext);
  let history = useHistory();
  const [save, setSave] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCommit = async() => {
    console.log("commit triggers here");
    setSave(true);
    setLoading(true);
    // TODO: make an api call to trigger the pipeline creation here
    try {
      const postBody = {
        pipelineId,
        message,
        autoRun
      };
      const result = await PipelineActions.createFreeTrialPipeline(postBody, getAccessToken)
      
      let responseMessage = result.data !== undefined ? result.data.message === "success" : false;
      console.log(result)
      if(!responseMessage) {
        toastContext.showErrorDialog(result.data.message);
        setSave(false);
        setLoading(false);
        return;
      }
      if(!autoRun) {
        history.push(`/workflow/details/${pipelineId}/summary`);
        setSave(false);
        setLoading(false);
        return;
      }
      // start run pipeline and close modal
      await PipelineActions.run(pipelineId, {}, getAccessToken);
      toastContext.showInformationDialog("A request to start this pipeline has been submitted.  It will begin shortly.", 20);
      setSave(false);
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err);
      toastContext.showErrorDialog(err.message);
      setSave(false);
      setLoading(false);
    }
  }

  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">Freetrial Pipeline Build : Configure custom message</div>
          <div className="text-muted mb-4">Please confirm that you want to proceed with this operation.</div>
          {loading ? (
            <LoadingDialog size="sm" />
          ) : (
            <div className="px-2">
              {/* information about the free trial and explaining about the pipeline config needs to be added here */}
              <Form.Group controlId="git-message">
                <Form.Label>Enter Message Here*</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  value={message || ""}
                  className={"mb-1"}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <small className="form-text text-muted mt-2 text-center">
                Enter the custom message here, which will be added to the project and get deployed.
              </small>
            </div>    
          )}        
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              setView(1);
            }}
          >
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1" />
            Back
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={() => {
              handleCommit();
            }}
            disabled={save || message.length === 0 }
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1" />
            )}
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

GitCommitView.propTypes = {
  pipelineId: PropTypes.string,
  templateId : PropTypes.string,
  autoRun: PropTypes.bool,
  setView: PropTypes.func,  
  handleClose: PropTypes.func,
};

export default GitCommitView;
