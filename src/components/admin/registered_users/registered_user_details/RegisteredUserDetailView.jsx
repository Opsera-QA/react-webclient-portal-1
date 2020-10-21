import React, { useState, useEffect, useContext } from "react";
import RegisteredUserSummary from "./RegisteredUserSummary";
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
import DataNotFoundContainer from "../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../common/status_notifications/data_not_found/DataNotFoundDialog";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";

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

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  if (!isLoading && userData == null) {
    return (
      <DataNotFoundContainer type={"Registered User"} breadcrumbDestination={"registeredUsersDetailView"}>
        <DataNotFoundDialog type={"Registered User"} managementViewIcon={faUserCircle} managementViewTitle={"Registered Users"} managementViewLink={"/admin/registered-users"} />
      </DataNotFoundContainer>
    )
  }

  return (
    <DetailViewContainer
      breadcrumbDestination={"registeredUsersDetailView"}
      title={userData != null ? `Registered User Details [${userData.getData("email")}]` : undefined}
      titleIcon={faUserCircle}
      isLoading={isLoading}
      summaryPanel={<RegisteredUserSummary userData={userData}/>}
      detailPanel={<RegisteredUserDetailPanel setAnalyticsProfileData={setAnalyticsProfileData} analyticsProfileData={analyticsProfileData} userData={userData} setUserData={setUserData} />}
    />
  );
}

export default RegisteredUserDetailView;