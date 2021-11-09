import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "components/common/modal/CreateModal";
import JFrogRepositoryEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/details/JFrogRepositoryEditorPanel";
import Model from "core/data_model/model";
import jfrogMavenRepositoryMetadata from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jfrog-maven-repository-metadata";

function NewJFrogMavenRepositoryModal({ 
  toolData, 
  loadData, 
  setShowModal, 
  showModal, 
  jfrogRepositories,
  editRepoObj,
  editMode,
  setEditMode
 } ) {
  const [jfrogRepositoryData, setJFrogRepositoryData] = useState(undefined);

  useEffect(() => {
    if(editMode){
      setJFrogRepositoryData(new Model(editRepoObj, jfrogMavenRepositoryMetadata, false));
    }else{
      setJFrogRepositoryData(new Model({...jfrogMavenRepositoryMetadata.newObjectFields}, jfrogMavenRepositoryMetadata, true));
    }    
  }, [showModal]);

  const handleClose = () => {
    setEditMode(false);
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"JFrog Repository"} objectMethod={editMode ? "update" : "create"} showModal={showModal} loadData={loadData} >
      <JFrogRepositoryEditorPanel 
        toolData={toolData} 
        jfrogRepositoryData={jfrogRepositoryData} 
        setJFrogRepositoryData={setJFrogRepositoryData} 
        loadData={loadData} 
        handleClose={handleClose} 
        jfrogRepositories={jfrogRepositories} 
        editMode={editMode}       
      />
    </CreateModal>
  );
}

NewJFrogMavenRepositoryModal.propTypes = {
  toolData: PropTypes.object,
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  setShowModal: PropTypes.func,
  jfrogRepositories: PropTypes.array,
  editRepoObj: PropTypes.object,
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
};

export default NewJFrogMavenRepositoryModal;
