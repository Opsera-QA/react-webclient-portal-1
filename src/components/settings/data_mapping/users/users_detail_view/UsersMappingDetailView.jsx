import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import UsersMappingDetailPanel from "./UsersMappingDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";
import usersMappingMetadata from "components/settings/data_mapping/users/userMapping.metadata";
import Model from "core/data_model/model";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function UsersMappingDetailView() {
  const { usersMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [usersMappingData, setUsersMappingData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    } catch (error) {
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUsersMapping = async (usersMappingId) => {
    try {
      const response = await dataMappingActions.getUserMappingById(usersMappingId, getAccessToken);
      if (response?.data?.length > 0) {
        setUsersMappingData(new Model(response?.data[0], usersMappingMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getUsersMapping(usersMappingId);
    }
  };

  const deleteMapping = async () => {
    let response = await dataMappingActions.deleteUserMapping(usersMappingData, getAccessToken);
    if (response?.status === 200) {
      toastContext.showDeleteSuccessResultDialog("User Mapping");
      history.push("/settings/data_mapping");
    } else {
      toastContext.showDeleteFailureResultDialog("User Mapping", response);
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div><ActionBarBackButton path={"/settings/data_mapping"} /></div>
        <div><ActionBarDeleteButton2 relocationPath={"/settings/data_mapping"} handleDelete={deleteMapping} dataObject={usersMappingData} /></div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"userTaggingDetailView"}
      metadata={usersMappingMetadata}
      navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"userTagViewer"} />}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      dataObject={usersMappingData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<UsersMappingDetailPanel usersMappingData={usersMappingData} setUsersMappingData={setUsersMappingData}/>}
    />
  );
}

export default UsersMappingDetailView;
