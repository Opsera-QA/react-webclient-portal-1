import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import OctopusEnvironmentMetadata from "../octopus-environment-metadata";
import OctopusAccountMetadata from "../octopus-account-metadata";
import OctopusTargetMetadata from "../octopus-target-metadata";
import OctopusFeedMetadata from "../octopus-feed-metadata";
import OctopusTomcatMetadata from "../octopus-tomcat-metadata";
import Model from "core/data_model/model";
import OctopusApplicationEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/details/OctopusApplicationEditorPanel";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CreateModal from "components/common/modal/CreateModal";
import {DialogToastContext} from "contexts/DialogToastContext";

// TODO: Make irrelevant by using editor panel in line once sub forms are made and fixed
function OctopusApplicationWrapper(
  {
    loadData,
    toolData,
    octopusApplicationDataObj,
    appID,
    type,
    isMounted,
    handleClose,
  }) {
  const toastContext = useContext(DialogToastContext);
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
      setOctopusApplicationData(new Model({...metadata.newObjectFields}, metadata, true));
    }
  }, [octopusApplicationDataObj]);

  const getMetadata = (type) => {
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

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();

    if (handleClose) {
      handleClose();
    }
  };


  if (type == null || octopusApplicationData == null) {
    return null;
  }

  return (
    <OctopusApplicationEditorPanel
      octopusApplicationData={octopusApplicationData}
      type={type}
      toolData={toolData}
      loadData={loadData}
      handleClose={closePanel}
      appID={appID}
    />
  );
}

OctopusApplicationWrapper.propTypes = {
  toolData: PropTypes.object,
  octopusApplicationDataObj: PropTypes.object,
  loadData: PropTypes.func,
  appID: PropTypes.string,
  type: PropTypes.string,
  isMounted: PropTypes.object,
  handleClose: PropTypes.func,
};

export default OctopusApplicationWrapper;
