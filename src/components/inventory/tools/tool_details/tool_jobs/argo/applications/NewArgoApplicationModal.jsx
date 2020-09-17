import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import argoApplicationsMetadata from "../argo-metadata";
import Model from "../../../../../../../core/data_model/model";
import ArgoApplicationEditorPanel from "./details/ArgoApplicationEditorPanel";

function NewArgoApplicationModal( { loadData, toolData, setShowModal, showModal } ) {
  const [argoApplicationData, setArgoApplicationData] = useState(undefined);

  useEffect(() => {
    setArgoApplicationData(new Model({...argoApplicationsMetadata.newModelBase}, argoApplicationsMetadata, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };


  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Argo Application"} showModal={showModal} loadData={loadData} >
        {argoApplicationData && <ArgoApplicationEditorPanel argoApplicationData={argoApplicationData} toolData={toolData} loadData={loadData} handleClose={handleClose}/>}
      </CreateModal>
    </>
  );
}

NewArgoApplicationModal.propTypes = {
  toolData: PropTypes.object,
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default NewArgoApplicationModal;


