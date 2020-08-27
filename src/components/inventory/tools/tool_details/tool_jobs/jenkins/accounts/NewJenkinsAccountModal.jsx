import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import Model from "../../../../../../../core/data_model/model";
import jenkinsCreateAccountMetadata from "./jenkins-create-account-metadata";
import JenkinsAccountEditorPanel from "./JenkinsAccountEditorPanel";

const INITIAL_ACCOUNT_DATA = {
    credentialsId: "",
    credentialsDescription: ""
};

function NewJenkinsAccountModal( { toolData, setShowModal, showModal, loadData } ) {
  const [jenkinsAccountData, setJenkinsAccountData] = useState(undefined);

  useEffect(() => {
    setJenkinsAccountData(new Model({...INITIAL_ACCOUNT_DATA}, jenkinsCreateAccountMetadata, true));
  }, []);

  const handleClose = async () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Jenkins Account"} showModal={showModal} loadData={loadData}>
        {jenkinsAccountData && <JenkinsAccountEditorPanel toolData={toolData} jenkinsAccountData={jenkinsAccountData} handleClose={handleClose}/>}
      </CreateModal>
    </>
  );
}

NewJenkinsAccountModal.propTypes = {
  toolData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewJenkinsAccountModal;


