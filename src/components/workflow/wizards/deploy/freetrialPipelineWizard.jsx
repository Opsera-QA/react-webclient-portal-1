import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Button, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import PipelineActions from "../../pipeline-actions";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import LoadingDialog from "../../../common/status_notifications/loading";
import WelcomeView from "./welcomeView";
import GitCommitView from "./gitCommitView";

const FreeTrialPipelineWizard = ({
  pipelineId,
  templateId,
  pipelineOrientation,
  autoRun,
  handleClose
}) => {
  const [view, setView] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {

  }, []);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
       Warning! Closing this window will prevent the pipeline from configuring.
      </Popover.Content>
    </Popover>
  );

  if (isLoading) {
    return (<LoadingDialog size={"sm"}/>);
  }

  return (
    <>
      <Modal size="lg" show={true} onHide={handleClose} 
        className="tool-details-modal" id="dataManagerModal" backdrop="static">       
        <Modal.Header closeButton>
          <Modal.Title>Pipeline Build Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {view === 1 && (
            <>
              {/* Wire up step component */}
              <WelcomeView 
                pipelineId={pipelineId}
                templateId={templateId} 
                setView={setView}
                handleClose={handleClose}
              />
            </>
          )}

          {view === 2 && (
            <>
              {/* Wire up git commit step component */}
              <GitCommitView
                pipelineId={pipelineId}
                templateId={templateId} 
                setView={setView}
                autoRun={autoRun}
                handleClose={handleClose}
              />
            </>
          )}

         </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );

};

FreeTrialPipelineWizard.propTypes = {
  pipelineId: PropTypes.string,
  templateId: PropTypes.string,
  pipelineOrientation: PropTypes.string,
  autoRun: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default FreeTrialPipelineWizard;
