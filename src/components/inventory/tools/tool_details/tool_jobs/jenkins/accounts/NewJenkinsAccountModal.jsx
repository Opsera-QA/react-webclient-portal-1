import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import Model from "../../../../../../../core/data_model/model";
import jenkinsCreateAccountMetadata from "./jenkins-create-account-metadata";
import JenkinsAccountEditorPanelNEW from "./JenkinsAccountEditorPanel";

function NewJenkinsAccountModal({ toolData, setShowModal, showModal, loadData, jenkinsAccountDataDto, credentialId }) {
  const [jenkinsAccountData, setJenkinsAccountData] = useState(undefined);
  console.log(jenkinsAccountDataDto);

  useEffect(() => {
    if (jenkinsAccountDataDto !== undefined) {
      setJenkinsAccountData(new Model(jenkinsAccountDataDto.getPersistData(), jenkinsCreateAccountMetadata, false));
    } else {
      setJenkinsAccountData(new Model(jenkinsCreateAccountMetadata.newModelBase, jenkinsCreateAccountMetadata, true));
    }
  }, [showModal]);

  const handleClose = async () => {
    setShowModal(false);
    loadData();
  };

  return (
    <CreateModal
      handleCancelModal={handleClose}
      objectType={"Jenkins Account"}
      showModal={showModal}
      loadData={loadData}
    >
      <JenkinsAccountEditorPanelNEW
        toolData={toolData}
        jenkinsAccountData={jenkinsAccountData}
        setJenkinsAccountData={setJenkinsAccountData}
        handleClose={handleClose}
        credentialId={credentialId}
      />
    </CreateModal>
  );
}

NewJenkinsAccountModal.propTypes = {
  toolData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  jenkinsAccountDataDto: PropTypes.object,
  credentialId: PropTypes.string,
};

export default NewJenkinsAccountModal;
