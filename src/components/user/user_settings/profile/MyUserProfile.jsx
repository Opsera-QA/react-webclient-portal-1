import React, {useEffect, useState} from "react";
import { Row } from "react-bootstrap";
import LdapSettingsPanel
  from "components/admin/registered_users/details/ldap_settings/LdapSettingsPanel";
import Model from "core/data_model/model";
import registeredUsersMetadata from "components/admin/registered_users/registeredUsers.metadata";
import RegisteredUserSummary from "components/admin/registered_users/details/RegisteredUserSummary";
import SiteRoleField from "components/common/fields/access/SiteRoleField";
import useComponentStateReference from "hooks/useComponentStateReference";
import SyncProfileButton from "components/user/user_settings/profile/SyncProfileButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Col from "react-bootstrap/Col";
import UserSettingsSubNavigationBar from "components/user/user_settings/UserSettingsSubNavigationBar";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";

export default function MyUserProfile() {
  const [userModel, setUserModel] = useState(undefined);
  const {
    userData,
    accessRoleData,
    isSaasUser,
  } = useComponentStateReference();

  useEffect(() => {
    setUserModel(undefined);

    if (userData) {
      setUserModel(new Model({ ...userData }, registeredUsersMetadata, false));
    }
  }, [userData]);

  const getOpseraUserInfo = () => {
    return (
      <Row>
        <Col xs={12}>
          <H5FieldSubHeader subheaderText={"Opsera User Information"} />
        </Col>
        <Col xs={12}>
          <RegisteredUserSummary
            userData={userModel}
            userAccess={accessRoleData}
          />
        </Col>
      </Row>
    );
  };

  const getLdapUserInfo = () => {
    if (isSaasUser === false) {
      return (
        <Row>
          <Col xs={12}>
            <H5FieldSubHeader subheaderText={"Organization & Account"} />
          </Col>
          <Col xs={12}>
            <LdapSettingsPanel userData={userModel} ldapData={userData?.ldap} />
          </Col>
        </Row>
      );
    }
  };

  // TODO: Style better
  const getUserInfo = () => {
    if (userData == null) {
      return <></>;
    }

    return (
      <div>
        {getOpseraUserInfo()}
        <hr />
        {getLdapUserInfo()}
        <hr />
      </div>
    );
  };

  const getSyncButton = () => {
    return (
      <div className={"justify-content-between d-flex"}>
        <SiteRoleField className={"mt-auto"} showDescription={true} />
        <SyncProfileButton />
      </div>
    );
  };

  return (
    <ScreenContainer
      navigationTabContainer={<UserSettingsSubNavigationBar activeTab={USER_SETTINGS_PAGES.MY_USER_PROFILE} />}
      breadcrumbDestination={USER_SETTINGS_PAGES.MY_USER_PROFILE}
      roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      accessRoleData={accessRoleData}
      isLoading={userModel == null}
    >
      <div className={"mx-3"}>
        {getSyncButton()}
        <hr />
        {getUserInfo()}
      </div>
    </ScreenContainer>
  );
}