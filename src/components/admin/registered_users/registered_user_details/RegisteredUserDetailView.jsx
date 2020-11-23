import React, { useState, useEffect, useContext } from "react";
import RegisteredUserDetailPanel from "./RegisteredUserDetailPanel";
import { useParams } from "react-router-dom";
import RegisteredUserActions from "../registered-user-actions";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import analyticsProfileMetadata from "./analytics_profile/analytics-profile-form-fields";
import Model from "../../../../core/data_model/model";
import registeredUsersMetadata from "../registered-users-form-fields";
import {faUserCircle} from "@fortawesome/pro-light-svg-icons";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";
import ActionBarShowDetailsButton from "../../../common/actions/buttons/ActionBarShowDetailsButton";

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

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getAnalyticsProfile();
      await getUser();
      await getRoles();
    }
    catch (error) {
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    const response = await RegisteredUserActions.getUserRecord(id, getAccessToken);

    if (response != null && response.data != null) {
      setUserData(new Model(response.data, registeredUsersMetadata, false));
    }
  };

  const getAnalyticsProfile = async () => {
    const response = await RegisteredUserActions.getAnalyticsProfile(id, getAccessToken);

    if (response.data != null) {
      setAnalyticsProfileData(new Model(response.data, analyticsProfileMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"registeredUsersDetailView"}
      title={userData != null ? `Registered User Details [${userData.getData("email")}]` : undefined}
      managementViewLink={"/admin/registered-users"}
      managementTitle={"Registered Users"}
      managementViewIcon={faUserCircle}
      type={"Registered User"}
      titleIcon={faUserCircle}
      dataObject={userData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <RegisteredUserDetailPanel
          setAnalyticsProfileData={setAnalyticsProfileData}
          analyticsProfileData={analyticsProfileData}
          userData={userData}
          setUserData={setUserData}
        />
      }
    />
  );
}

export default RegisteredUserDetailView;