import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import UserDataMappingEditorPanel from "components/settings/data_mapping/users/details/UserDataMappingEditorPanel";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import UserDataMappingModel from "components/settings/data_mapping/users/userDataMapping.model";

function NewUserDataMappingOverlay(
  {
    loadData,
    isMounted,
    userDataMappingMetadata,
  }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [userDataMappingModel, setUserDataMappingModel] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    createNewUserDataMappingModel(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
    };
  }, []);

  const createNewUserDataMappingModel = async (cancelSource = cancelTokenSource) => {
    try {
      const accessRoleData = await getAccessRoleData();
      const newModel = new UserDataMappingModel(
        {...userDataMappingMetadata.newObjectFields},
        userDataMappingMetadata,
        true,
        getAccessToken,
        cancelSource,
        accessRoleData,
        loadData,
        [],
        setUserDataMappingModel
      );
      setUserDataMappingModel(newModel);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

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
  userDataMappingMetadata: PropTypes.object,
};

export default NewUserDataMappingOverlay;
