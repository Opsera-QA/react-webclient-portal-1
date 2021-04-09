import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ModalBase from "components/common/modal/ModalBase";
import CloseButton from "components/common/buttons/CloseButton";
import RunGitTaskButton from "components/common/buttons/git/RunGitTaskButton";

function GitRunTaskModal({ showModal, handleClose, gitTasksData, loadData }) {
  const getButtonContainer = () => {
    return (
      <>
        <CloseButton closeEditorCallback={handleClose} showUnsavedChangesMessage={false} />
        <RunGitTaskButton gitTasksData={gitTasksData} loadData={loadData} handleClose={handleClose} />
      </>
    );
  };


  if (gitTasksData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ModalBase
      showModal={showModal}
      title="Git Task Confirmation"
      handleClose={handleClose}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-3"}>`Do you want to run {gitTasksData.getData("name")} task?</div>
    </ModalBase>
  );
}

GitRunTaskModal.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default GitRunTaskModal;