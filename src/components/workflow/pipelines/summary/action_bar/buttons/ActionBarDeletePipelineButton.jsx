import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import Modal from "components/common/modal/modal";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {useHistory} from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Wire up Role Definitions
function ActionBarDeletePipelineButton(
  {
    pipeline,
    isActionAllowedFunction,
    refreshAfterDeletion,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    isOpseraAdministrator,
  } = useComponentStateReference();

  const deletePipeline = async () => {
    try {
      setIsDeleting(true);
      await pipelineActions.deletePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      toastContext.showDeleteSuccessResultDialog("Pipeline");

      if (refreshAfterDeletion === true) {
        history.push(history.location);
      } else {
        history.goBack();
      }
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

  if (pipeline == null || isActionAllowedFunction == null || isActionAllowedFunction("delete_pipeline_btn", pipeline?.owner) !== true) {
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
  isActionAllowedFunction: PropTypes.func,
  refreshAfterDeletion: PropTypes.bool,
};

export default ActionBarDeletePipelineButton;