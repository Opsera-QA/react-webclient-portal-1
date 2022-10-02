import React from "react";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import FreeTrialRevokeUserSelectInput
  from "components/settings/trial/user_expiration/revocation/input/FreeTrialRevokeUserSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialUserExpirationRevokeUserAccessButton
  from "components/settings/trial/user_expiration/revocation/FreeTrialUserExpirationRevokeUserAccessButton";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import FreeTrialUserExpirationManagementSubNavigationBar
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetFreeTrialUserExpirationManagementModel
  from "components/settings/trial/user_expiration/useGetFreeTrialUserExpirationManagementModel";
import { useHistory } from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

export default function FreeTrialUserExpirationUserRevocationScreen() {
  const {
    accessRoleData,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    freeTrialUserExpirationModel,
    setFreeTrialUserExpirationModel,
  } = useGetFreeTrialUserExpirationManagementModel();
  const history = useHistory();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialUserExpirationManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={<FreeTrialUserExpirationManagementSubNavigationBar activeTab={"users"} />}
    >
      <div className={"m-3"}>
      <FreeTrialRevokeUserSelectInput
        model={freeTrialUserExpirationModel}
        setModel={setFreeTrialUserExpirationModel}
      />
      <ButtonContainerBase
        leftSideButtons={
          <BackButtonBase
            backButtonFunction={() => history.push("/settings/trial/user-expiration-management")}
          />
        }
      >
        <FreeTrialUserExpirationRevokeUserAccessButton
          userId={freeTrialUserExpirationModel?.getData("revokeUserId")}
        />
      </ButtonContainerBase>
    </div>
    </ScreenContainer>
  );
}

FreeTrialUserExpirationUserRevocationScreen.propTypes = {};