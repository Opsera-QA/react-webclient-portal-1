import React, {useState, useEffect, useContext, useRef} from "react";
import { useHistory, useParams } from "react-router-dom";
import UserDataMappingDetailPanel from "components/settings/data_mapping/users/details/UserDataMappingDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import Model from "core/data_model/model";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {userDataMappingActions} from "components/settings/data_mapping/users/userDataMapping.actions";
import {userDataMappingMetadata} from "components/settings/data_mapping/users/userDataMapping.metadata";

function UserDataMappingDetailView() {
  const { usersMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [userDataMappingModel, setUserDataMappingModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(usersMappingId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    } catch (error) {
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getUsersMapping(cancelSource);
    }
  };


  const getUsersMapping = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await userDataMappingActions.getUserDataMappingByIdV2(getAccessToken, cancelSource, usersMappingId);
      const mapping = response?.data?.data;

      if (isMounted?.current === true && mapping) {
        setUserDataMappingModel(new Model(mapping, userDataMappingMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const deleteMapping = async () => {
    let response = await userDataMappingActions.deleteUserDataMappingV2(getAccessToken, cancelTokenSource, usersMappingId);
    if (response?.status === 200) {
      toastContext.showDeleteSuccessResultDialog("User Data Mapping");
      history.push("/settings/data_mapping");
    } else {
      toastContext.showDeleteFailureResultDialog("User Data Mapping", response);
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton
            path={"/settings/data_mapping"}
          />
        </div>
        <div>
          <ActionBarDeleteButton2
            relocationPath={"/settings/data_mapping"}
            handleDelete={deleteMapping}
            dataObject={userDataMappingModel}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"userTaggingDetailView"}
      metadata={userDataMappingMetadata}
      navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"userTagViewer"} />}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      dataObject={userDataMappingModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <UserDataMappingDetailPanel
          userDataMappingModel={userDataMappingModel}
          setUserDataMappingModel={setUserDataMappingModel}
        />
      }
    />
  );
}

export default UserDataMappingDetailView;
