import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import Row from "react-bootstrap/Row";
import TriggerTaskRunButton from "components/tasks/buttons/run_task/TriggerTaskRunButton";
import CloseButton from "components/common/buttons/CloseButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import CancelButton from "components/common/buttons/CancelButton";
import DeleteButton from "components/common/buttons/delete/DeleteButton";

function CancelPipelineQueueConfirmationOverlay({ pipeline, setHasQueuedRequest }) {
  const { getAccessToken } = useContext(AuthContext);
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

  const deletePipelineQueueRequest = async () => {
    try {
      await pipelineActions.deleteQueuedPipelineRequestV2(getAccessToken, cancelTokenSource, pipeline?._id);
      setHasQueuedRequest(false);
      handleClose();
      toastContext.showInformationToast("The Pipeline queue request has been cancelled.");
    }
    catch (error) {
      toastContext.showFormErrorToast(error, "The Pipeline queue request cancellation has failed");
    }
  };

  const getButtonContainer = () => {
    return (
      <Row className="mx-0 p-3 d-flex">
        <div className="ml-auto d-flex">
          <DeleteButton
            className={"mr-2"}
            deleteRecord={deletePipelineQueueRequest}
            buttonText={"Cancel Queue Request"}
            size={"md"}
          />
          <CloseButton
            closeEditorCallback={handleClose}
            showUnsavedChangesMessage={false}
          />
        </div>
      </Row>
    );
  };

  const handleClose = () => {
    toastContext.clearOverlayPanel();
  };

  if (pipeline == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ConfirmationOverlay
      closePanel={handleClose}
      showPanel={true}
      titleText={`Cancel Pipeline Queue Request?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mb-3 mx-3"}>
          <div>A queued request to start this Pipeline is pending. Upon successful completion of this run, the Pipeline will restart.</div>
          <div className={"mt-2"}>Do you want to cancel the queue request for this Pipeline?</div>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

CancelPipelineQueueConfirmationOverlay.propTypes = {
  pipeline: PropTypes.object,
  setHasQueuedRequest: PropTypes.func,
};

export default CancelPipelineQueueConfirmationOverlay;