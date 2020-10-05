import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import argoApplicationsMetadata from "../argo-application-metadata";
import Model from "../../../../../../../core/data_model/model";
import ArgoApplicationEditorPanel from "./details/ArgoApplicationEditorPanel";

function ExistingArgoApplicationModal({ loadData, toolData, argoApplicationDataObj, setShowModal, showModal, appID }) {
  const [argoApplicationData, setArgoApplicationData] = useState(undefined);

  useEffect(() => {
    if (argoApplicationDataObj !== undefined) {
      setArgoApplicationData(argoApplicationDataObj);
    } else
      setArgoApplicationData(new Model({ ...argoApplicationsMetadata.newModelBase }, argoApplicationsMetadata, true));
  }, []);

  const handleClose = () => {
    loadData();
    setShowModal(false); 
  };

  return (
    <>
      <CreateModal
        handleCancelModal={handleClose}
        objectType={"Argo Application"}
        showModal={showModal}
        loadData={loadData}
      >
        {argoApplicationData && (
          <ArgoApplicationEditorPanel
            argoApplicationData={argoApplicationData}
            toolData={toolData}
            loadData={loadData}
            handleClose={handleClose}
            appID={appID}
          />
        )}
      </CreateModal>
    </>
  );
}

ExistingArgoApplicationModal.propTypes = {
  toolData: PropTypes.object,
  argoApplicationDataObj: PropTypes.object,
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  setShowModal: PropTypes.func,
  appID: PropTypes.string,
};

export default ExistingArgoApplicationModal;
