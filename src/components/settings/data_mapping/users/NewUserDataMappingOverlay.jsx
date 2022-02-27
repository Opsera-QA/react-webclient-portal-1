import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import UserDataMappingEditorPanel from "components/settings/data_mapping/users/details/UserDataMappingEditorPanel";
import {userDataMappingMetadata} from "components/settings/data_mapping/users/userDataMapping.metadata";

function NewUserDataMappingOverlay({loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [userDataMappingModel, setUserDataMappingModel] = useState(new Model({...userDataMappingMetadata.newObjectFields}, userDataMappingMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={userDataMappingMetadata.type}
      loadData={loadData}
    >
      <UserDataMappingEditorPanel
        handleClose={closePanel}
        userDataMappingModel={userDataMappingModel}
        setUserDataMappingModel={setUserDataMappingModel}
      />
    </CreateCenterPanel>
  );
}

NewUserDataMappingOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewUserDataMappingOverlay;
