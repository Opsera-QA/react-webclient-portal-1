import React, { useState, useEffect, useContext } from "react";
import RegisteredUserSummary from "./RegisteredUserSummary";
import RegisteredUserDetailPanel from "./RegisteredUserDetailPanel";
import { Link, useParams } from "react-router-dom";
import RegisteredUserActions from "../registered-user-actions";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import analyticsProfileMetadata from "./analytics_profile/analytics-profile-form-fields";
import Model from "../../../../core/data_model/model";
import registeredUsersMetadata from "../registered-users-form-fields";

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
    setIsLoading(true);
    await getAnalyticsProfile();
    await getUser();
    await getRoles();
    setIsLoading(false);
  };

  const getUser = async () => {
    const response = await RegisteredUserActions.getUserRecord(id, getAccessToken);
    setUserData(new Model(response.data, registeredUsersMetadata, false));
  };

  const getAnalyticsProfile = async () => {
    const response = await RegisteredUserActions.getAnalyticsProfile(id, getAccessToken);
    setAnalyticsProfileData(new Model(response.data, analyticsProfileMetadata, false));
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData || isLoading || analyticsProfileData == null || userData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <>
      <BreadcrumbTrail destination={"registeredUsersDetailView"} />
      <div className="content-container content-card-1 max-content-width ml-2">
        {/*TODO: pull user name (or first/last) once wired up*/}
        <div className="pt-2 pl-2 content-block-header"><h5>Registered User Details [{userData.getData("email")}]</h5></div>
        <div>
          <div>
            <div>
              <RegisteredUserSummary userData={userData}/>
            </div>
            <div>
             <RegisteredUserDetailPanel setAnalyticsProfileData={setAnalyticsProfileData} analyticsProfileData={analyticsProfileData} userData={userData} setUserData={setUserData} />
            </div>
          </div>
        </div>
        <div className="content-block-footer" />
      </div>
    </>
  );
}

export default RegisteredUserDetailView;