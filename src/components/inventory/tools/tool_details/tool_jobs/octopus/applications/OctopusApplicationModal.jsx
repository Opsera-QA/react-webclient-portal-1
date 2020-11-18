import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import OctopusEnvironmentMetadata from "../octopus-environment-metadata";
import OctopusAccountMetadata from "../octopus-account-metadata";
import OctopusTargetMetadata from "../octopus-target-metadata";
import Model from "../../../../../../../core/data_model/model";
import OctopusApplicationEditorPanel from "./details/OctopusEditorPanel";

function ExistingOctopusApplicationModal({
  loadData,
  toolData,
  octopusApplicationDataObj,
  setShowModal,
  showModal,
  appID,
  type,
}) {
  const [octopusApplicationData, setOctopusApplicationData] = useState(undefined);

  useEffect(() => {
    if (octopusApplicationDataObj !== undefined) {
      if (octopusApplicationDataObj.type === "environment")
        setOctopusApplicationData(
          new Model(octopusApplicationDataObj.getPersistData(), OctopusEnvironmentMetadata, false)
        );
      if (octopusApplicationDataObj.type === "account")
        setOctopusApplicationData(new Model(octopusApplicationDataObj.getPersistData(), OctopusAccountMetadata, false));
      if (octopusApplicationDataObj.type === "target")
        setOctopusApplicationData(new Model(octopusApplicationDataObj.getPersistData(), OctopusTargetMetadata, false));
    } else {
      setNewModel();
    }
  }, []);

  const setNewModel = () => {
    if (type === "environment")
      setOctopusApplicationData(
        new Model({ ...OctopusEnvironmentMetadata.newModelBase }, OctopusEnvironmentMetadata, true)
      );
    if (type === "account")
      setOctopusApplicationData(new Model({ ...OctopusAccountMetadata.newModelBase }, OctopusAccountMetadata, true));
    if (type === "target")
      setOctopusApplicationData(new Model({ ...OctopusTargetMetadata.newModelBase }, OctopusTargetMetadata, true));
  };

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <>
      {type && (
        <CreateModal
          handleCancelModal={handleClose}
          objectType={`Octopus ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          showModal={showModal}
          loadData={loadData}
        >
          {octopusApplicationData && (
            <OctopusApplicationEditorPanel
              octopusApplicationData={octopusApplicationData}
              type={type}
              toolData={toolData}
              loadData={loadData}
              handleClose={handleClose}
              appID={appID}
            />
          )}
        </CreateModal>
      )}
    </>
  );
}

ExistingOctopusApplicationModal.propTypes = {
  toolData: PropTypes.object,
  octopusApplicationDataObj: PropTypes.object,
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  setShowModal: PropTypes.func,
  appID: PropTypes.string,
  type: PropTypes.string,
};

export default ExistingOctopusApplicationModal;
