import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import JenkinsJobEditorPanel from "../jobs/details/JenkinsJobEditorPanel";

const INITIAL_DATA = {
  key: "",
  value: "",
  configuration: {},
  active: false,
};

function NewJenkinsJobModal( { toolData, loadData, setShowModal, showModal } ) {
  const [jenkinsJobData, setJenkinsJobsData] = useState(undefined);

  // TODO: Implement use of DTO
  // useEffect(() => {
    // setJenkinsJobsData(new Model({...INITIAL_DATA}, ldapGroupMetaData, true));
  // }, []);

  const handleClose = () => {
    setShowModal(false);
  };


  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Jenkins Job"} showModal={showModal} loadData={loadData} >
        {toolData && <JenkinsJobEditorPanel toolData={toolData.getPersistData()} jobData={{}} handleClose={handleClose}/>}
      </CreateModal>
    </>
  );
}

NewJenkinsJobModal.propTypes = {
  toolData: PropTypes.object,
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default NewJenkinsJobModal;


