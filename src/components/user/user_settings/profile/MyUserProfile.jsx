import React, {useEffect, useState} from "react";
import { Row } from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapSettingsPanel
  from "components/admin/registered_users/details/ldap_settings/LdapSettingsPanel";
import Model from "core/data_model/model";
import registeredUsersMetadata from "components/admin/registered_users/registeredUsers.metadata";
import RegisteredUserSummary from "components/admin/registered_users/details/RegisteredUserSummary";
import AccessRoleField from "components/common/fields/access/AccessRoleField";
import useComponentStateReference from "hooks/useComponentStateReference";
import SyncProfileButton from "components/user/user_settings/profile/SyncProfileButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Col from "react-bootstrap/Col";

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
      <div className="pt-2">
        {getOpseraUserInfo()}
        <hr />
        {getLdapUserInfo()}
        <hr />
      </div>
    );
  };

  const getSyncButton = () => {
    return (
      <div className="justify-content-between d-flex">
        <AccessRoleField className={"mt-auto"} accessRole={accessRoleData} />
        <SyncProfileButton />
      </div>
    );
  };

  if (userModel == null) {
    return (<LoadingDialog size={"sm"} message="Loading User Profile" />);
  }

  return (
    <div className={"mx-3"}>
      {getSyncButton()}
      <hr />
      {getUserInfo()}
    </div>
  );
}