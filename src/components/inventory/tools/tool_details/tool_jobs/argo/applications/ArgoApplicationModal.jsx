import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import argoApplicationsMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-application-metadata";
import CreateModal from "components/common/modal/CreateModal";
import ArgoApplicationEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/details/ArgoApplicationEditorPanel";

function ExistingArgoApplicationModal({ loadData, toolData, argoApplicationDataObj, setShowModal, showModal, appID }) {
  const [argoApplicationData, setArgoApplicationData] = useState(undefined);

  useEffect(() => {
    if (argoApplicationDataObj !== undefined) {
      setArgoApplicationData(argoApplicationDataObj);
    } else
      setArgoApplicationData(new Model({ ...argoApplicationsMetadata.newObjectFields }, argoApplicationsMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false); 
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Argo Application"} showModal={showModal} loadData={loadData}>
      <ArgoApplicationEditorPanel argoApplicationData={argoApplicationData} toolData={toolData} loadData={loadData} handleClose={handleClose} appID={appID} />
    </CreateModal>
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
