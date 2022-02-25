import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import usersMappingMetadata from "components/settings/data_mapping/users/userMapping.metadata";
import Model from "core/data_model/model";
import UsersMappingEditorPanel from "./users_detail_view/UsersMappingEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

function NewUsersMappingOverlay({loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [usersTagsData, setUsersTagsData] = useState(new Model({...usersMappingMetadata.newObjectFields}, usersMappingMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={usersMappingMetadata.type} loadData={loadData}>
      <UsersMappingEditorPanel setToolTypeData={setUsersTagsData} handleClose={closePanel} usersTagsData={usersTagsData}/>
    </CreateCenterPanel>
  );
}

NewUsersMappingOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewUsersMappingOverlay;
