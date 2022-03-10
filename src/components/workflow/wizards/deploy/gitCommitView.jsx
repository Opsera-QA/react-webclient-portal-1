import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  faCheck,
  faSpinner,
  faPlay,
  faTimes,
  faStepBackward,
  faStepForward
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineActions from "../../pipeline-actions";
import IconBase from "components/common/icons/IconBase";

const GitCommitView = ({ pipelineId, templateId, autoRun, handleClose, setView }) => {
  const { getAccessToken } = useContext(AuthContext);
  let history = useHistory();
  const [save, setSave] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCommit = async() => {
    setSave(true);
    setLoading(true);
    // TODO: make an api call to trigger the pipeline creation here
    try {
      const postBody = {
        pipelineId,
        message,
        autoRun
      };
      const result = await PipelineActions.createFreeTrialPipeline(postBody, getAccessToken);
      
      let responseMessage = result.data !== undefined ? result.data.message === "success" : false;
      console.log(result);
      if(!responseMessage) {
        toastContext.showErrorDialog(result.data.message);
        setSave(false);
        setLoading(false);
        return;
      }
      // start run pipeline and close modal
      await PipelineActions.run(pipelineId, {}, getAccessToken);
      toastContext.showInformationToast("A request to start this pipeline has been submitted.  It will begin shortly.", 20);
      setSave(false);
      setLoading(false);

      // if(!autoRun) {
      //   history.push(`/workflow/details/${pipelineId}/summary`);
      //   return;
      // }
      handleClose();
    } catch (err) {
      console.log(err);
      toastContext.showErrorDialog(err.error.message);
      setSave(false);
      setLoading(false);
    }
  };

  const handleMessageEntry = (e) => {
    let value = e.target.value;

    let format = /^[A-Za-z0-9 .,!?][A-Za-z0-9- .,!?]*$/;
    let meetsRegex = format.test(value);

    if (value !== '' && !meetsRegex) {
      return;
    }

    if (value.length > 500) {
      return;
    }

    setMessage(e.target.value);
  };

  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">

          {loading ? (
            <LoadingDialog size="sm" />
          ) : (
            <div className="px-2 mt-3">


              <h6>What&apos;s next you ask?</h6>
              <div>As part of this demo, we want you to see how it is running real code, pushing it through our pipelines.  As such, we want you to feel confident in that
              experience and so we would like you to put a custom text message below.  Put a message that we can then show you is included in your application once it has
              been built.  We just thought this was a nice touch.</div>

              <div className="mt-2 mb-4">As always, if you have any questions or are interested in a more custom tailored experience, please contact us at Opsera.io!</div>



              <Form.Group controlId="git-message">
                <Form.Label>Enter Your New Application Message Here*</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  value={message || ""}
                  className={"mb-1"}
                  onChange={(e) => handleMessageEntry(e)}
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
            <IconBase icon={faStepBackward} className={"mr-1"} />
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
            <IconBase icon={faPlay} className={"mr-1"} />
            Start Pipeline
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
