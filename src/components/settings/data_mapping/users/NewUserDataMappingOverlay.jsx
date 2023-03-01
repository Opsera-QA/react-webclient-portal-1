import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import UserDataMappingEditorPanel from "components/settings/data_mapping/users/details/UserDataMappingEditorPanel";
import useGetAnalyticsUserDataMappingModel
  from "hooks/settings/insights/analytics_data_mappings/users/useGetAnalyticsUserDataMappingModel";
import userDataMappingMetadata from "@opsera/definitions/constants/settings/data_mapping/user/userDataMapping.metadata";

function NewUserDataMappingOverlay(
  {
    loadData,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const getAnalyticsUserDataMappingModel = useGetAnalyticsUserDataMappingModel();
  const [userDataMappingModel, setUserDataMappingModel] = useState(getAnalyticsUserDataMappingModel(undefined, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (userDataMappingModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={userDataMappingMetadata?.type}
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
