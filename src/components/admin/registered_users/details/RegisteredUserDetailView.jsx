import React, { useState, useEffect, useContext } from "react";
import RegisteredUserDetailPanel from "./RegisteredUserDetailPanel";
import { useParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import analyticsProfileMetadata from "./analytics_profile/analytics-profile-form-fields";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import registeredUsersMetadata from "components/admin/registered_users/registeredUsers.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarShowDetailsButton from "components/common/actions/buttons/ActionBarShowDetailsButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import Model from "core/data_model/model";
import RegisteredUsersManagementSubNavigationBar
  from "components/admin/registered_users/RegisteredUsersManagementSubNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function RegisteredUserDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [analyticsProfileData, setAnalyticsProfileData] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (silent = false) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }

      await getRoles();
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    const response = await RegisteredUserActions.getUserRecord(id, getAccessToken);

    if (response?.data != null) {
      setUserData(new Model(response.data, registeredUsersMetadata, false));
    }
  };

  const getAnalyticsProfile = async () => {
    const response = await RegisteredUserActions.getAnalyticsProfile(id, getAccessToken);

    if (response?.data != null) {
      setAnalyticsProfileData(new Model(response.data, analyticsProfileMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getAnalyticsProfile();
        await getUser();
      }
    }
  };

  const getActionBar = () => {
    if (userData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/admin/registered-users"} />
          </div>
          <div>
            <ActionBarShowDetailsButton details={userData["data"]} type={"User"} />
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"registeredUsersDetailView"}
      metadata={registeredUsersMetadata}
      dataObject={userData}
      accessDenied={!accessRoleData?.OpseraAdministrator}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={
        <RegisteredUsersManagementSubNavigationBar
          activeTab={"registeredUserViewer"}
        />
      }
      detailPanel={
        <RegisteredUserDetailPanel
          setAnalyticsProfileData={setAnalyticsProfileData}
          analyticsProfileData={analyticsProfileData}
          userData={userData}
          setUserData={setUserData}
          loadData={loadData}
        />
      }
    />
  );
}

export default RegisteredUserDetailView;