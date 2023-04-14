import React, { useState, useEffect } from "react";
import RegisteredUserDetailPanel from "./RegisteredUserDetailPanel";
import { useParams } from "react-router-dom";
import analyticsProfileMetadata from "./analytics_profile/analytics-profile-form-fields";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import registeredUsersMetadata from "components/admin/registered_users/registeredUsers.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarShowDetailsButton from "components/common/actions/buttons/ActionBarShowDetailsButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import Model from "core/data_model/model";
import RegisteredUsersManagementSubNavigationBar
  from "components/admin/registered_users/RegisteredUsersManagementSubNavigationBar";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function RegisteredUserDetailView() {
  const { id } = useParams();
  const [analyticsProfileData, setAnalyticsProfileData] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpseraAdministrator,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (silent = false) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }

      if (isOpseraAdministrator === true) {
        getAnalyticsProfile().catch(() => {});
        await getUser();
      }
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
    const user = DataParsingHelper.parseNestedObject(response, "data");

    if (user) {
      if (user.active !== false) {
        user.active = true;
      }

      setUserData(new Model(response.data, registeredUsersMetadata, false));
    }
  };

  const getAnalyticsProfile = async () => {
    const response = await RegisteredUserActions.getAnalyticsProfile(id, getAccessToken);

    if (response?.data != null) {
      setAnalyticsProfileData(new Model(response.data, analyticsProfileMetadata, false));
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
      accessDenied={isOpseraAdministrator !== true}
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