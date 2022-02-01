import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import Modal from "components/common/modal/modal";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {useHistory} from "react-router-dom";

function ActionBarDeletePipelineButton({pipeline, isActionAllowedFunction}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const deletePipeline = async () => {
    try {
      setIsDeleting(true);
      await pipelineActions.deletePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      toastContext.showDeleteSuccessResultDialog("Pipeline");
      history.push("/workflow");
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showDeleteFailureResultDialog("Pipeline", error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsDeleting(false);
      }
    }
  };

  const handleDeleteFunction = () => {
    setShowDeleteModal(true);
  };

  // TODO: Use new overlay
  const getDeleteModal = () => {
    if (showDeleteModal === true) {
      return (
        <Modal
          header="Confirm Pipeline Delete"
          message="Warning! This pipeline cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={() => setShowDeleteModal(false)}
          handleConfirmModal={() => deletePipeline()} />
      );
    }
  };

  if (pipeline == null || isActionAllowedFunction("delete_pipeline_btn", pipeline?.owner) !== true) {
    return null;
  }

  return (
    <>
      <ActionBarDeleteButtonBase
        handleDeleteFunction={handleDeleteFunction}
        type={"Pipeline"}
        className={"ml-3"}
        isDeleting={isDeleting}
      />
      {getDeleteModal()}
    </>
  );
}

ActionBarDeletePipelineButton.propTypes = {
  pipeline: PropTypes.object,
  isActionAllowedFunction: PropTypes.func
};

export default ActionBarDeletePipelineButton;