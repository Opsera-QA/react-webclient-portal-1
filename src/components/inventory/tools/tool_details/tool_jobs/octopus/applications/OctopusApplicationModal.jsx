import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import OctopusEnvironmentMetadata from "../octopus-environment-metadata";
import OctopusAccountMetadata from "../octopus-account-metadata";
import OctopusTargetMetadata from "../octopus-target-metadata";
import OctopusFeedMetadata from "../octopus-feed-metadata";
import OctopusTomcatMetadata from "../octopus-tomcat-metadata";
import Model from "core/data_model/model";
import OctopusApplicationEditorPanel from "./details/OctopusEditorPanel";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CreateModal from "components/common/modal/CreateModal";

function  ExistingOctopusApplicationModal({
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
    const octopusType = octopusApplicationDataObj != null ? octopusApplicationDataObj.getData("type") : type;
    const metadata = getMetadata(octopusType);

    if (octopusApplicationDataObj !== undefined) {
      const data = octopusApplicationDataObj?.getPersistData();
      const metadata = getMetadata(octopusApplicationDataObj.getData("type"));
      setOctopusApplicationData(new Model({...data}, metadata, false));
    }
    else {
      setOctopusApplicationData(new Model({...metadata.newObjectFields}, metadata, false));
    }
  }, []);

  const getMetadata = (type) => {
    console.log("type: " + JSON.stringify(type));
    switch (type) {
      case "environment":
        return OctopusEnvironmentMetadata;
      case "account":
        return OctopusAccountMetadata;
      case "target":
        return OctopusTargetMetadata;
      case "feed":
        return OctopusFeedMetadata;
      case "tomcat":
        return OctopusTomcatMetadata;
      default:
        return null;
    }
  };

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  if (type == null) {
    return null;
  }

  return (
    <CreateModal
      handleCancelModal={handleClose}
      objectType={`Octopus ${capitalizeFirstLetter(type)}`}
      objectMethod={appID ? "update" : "create"}
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
