import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import JenkinsJobEditorPanel from "../jobs/details/JenkinsJobEditorPanel";
import Model from "../../../../../../../core/data_model/model";

const INITIAL_DATA = {
  key: "",
  value: "",
  configuration: {},
  active: false,
};

function NewJenkinsJobModal( { toolData, loadData, onModalClose, showModal } ) {
  const [jenkinsJobData, setJenkinsJobsData] = useState(undefined);

  // TODO: Implement use of DTO
  useEffect(() => {
    // setJenkinsJobsData(new Model(INITIAL_DATA, ldapGroupMetaData, true));
  }, []);

  const handleClose = () => {
    loadData();
    onModalClose(false);
  };


  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Jenkins Job"} showModal={showModal} >
        {toolData && <JenkinsJobEditorPanel toolData={toolData.getPersistData()} jobData={{}} handleClose={handleClose}/>}
      </CreateModal>
    </>
  );
}

NewJenkinsJobModal.propTypes = {
  toolData: PropTypes.object,
  showModal: PropTypes.bool,
  setToolData: PropTypes.func,
  onModalClose: PropTypes.func,
};

export default NewJenkinsJobModal;


