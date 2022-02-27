import React, {useState, useEffect, useContext, useRef} from "react";
import { useHistory, useParams } from "react-router-dom";
import UserDataMappingDetailPanel from "components/settings/data_mapping/users/details/UserDataMappingDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {userDataMappingActions} from "components/settings/data_mapping/users/userDataMapping.actions";
import UserDataMappingModel from "components/settings/data_mapping/users/userDataMapping.model";
import ActionBarModelDeleteButton from "components/common/actions/buttons/ActionBarModelDeleteButton";

function UserDataMappingDetailView() {
  const { usersMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [userDataMappingModel, setUserDataMappingModel] = useState(undefined);
  const [userDataMappingMetadata, setUserDataMappingMetadata] = useState(undefined);
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
      await getUserDataMapping(cancelSource);
    }
  };


  const getUserDataMapping = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await userDataMappingActions.getUserDataMappingByIdV2(getAccessToken, cancelSource, usersMappingId);
      const userDataMapping = response?.data?.data;

      if (isMounted?.current === true && userDataMapping) {
        const metadata = response?.data?.metadata;
        setUserDataMappingMetadata({...metadata});
        setUserDataMappingModel(new UserDataMappingModel(
          userDataMapping,
          metadata,
          false,
          getAccessToken,
          cancelSource,
          loadData,
          [],
          setUserDataMappingModel,
        ));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
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
          <ActionBarModelDeleteButton
            relocationPath={"/settings/data_mapping"}
            model={userDataMappingModel}
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
