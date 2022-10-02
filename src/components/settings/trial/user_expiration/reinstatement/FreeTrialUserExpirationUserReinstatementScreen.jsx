import React from "react";
import PropTypes from "prop-types";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS
} from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";
import RevokedSsoUserSelectInput
  from "components/common/list_of_values_input/users/sso/revoked/RevokedSsoUserSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialUserExpirationReinstateUserAccessButton
  from "components/settings/trial/user_expiration/reinstatement/FreeTrialUserExpirationReinstateUserAccessButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetFreeTrialUserExpirationManagementModel
  from "components/settings/trial/user_expiration/useGetFreeTrialUserExpirationManagementModel";
import { useHistory } from "react-router-dom";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import FreeTrialUserExpirationManagementSubNavigationBar
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementSubNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

export default function FreeTrialUserExpirationUserReinstatementScreen() {
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
        <RevokedSsoUserSelectInput
          model={freeTrialUserExpirationModel}
          setModel={setFreeTrialUserExpirationModel}
          fieldName={"activeUserId"}
        />
        <ButtonContainerBase
          leftSideButtons={
            <BackButtonBase
              backButtonFunction={() => history.push("/settings/trial/user-expiration-management")}
            />
          }
        >
          <FreeTrialUserExpirationReinstateUserAccessButton
            userId={freeTrialUserExpirationModel?.getData("activeUserId")}
          />
        </ButtonContainerBase>
    </div>
    </ScreenContainer>
  );
}

FreeTrialUserExpirationUserReinstatementScreen.propTypes = {};