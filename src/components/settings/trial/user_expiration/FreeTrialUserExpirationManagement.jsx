import React, { useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialUserExpirationManagementSubNavigationBar
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementSubNavigationBar";
import FreeTrialUserExpirationOptionSelectionScreen
  from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationOptionSelectionScreen";

export const FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS = {
  OPTION_SELECTION_SCREEN: "option_selection_screen",
  EXTEND_USER_EXPIRATION_SCREEN: "extend_user_expiration_screen",
  REVOKE_USER_ACCESS_SCREEN: "revoke_user_access_screen",
  REINSTATE_USER_ACCESS_SCREEN: "reinstate_user_access_screen",
};

export default function FreeTrialUserExpirationManagement() {
  const [currentScreen, setCurrentScreen] = useState(FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.OPTION_SELECTION_SCREEN);
  const {
    accessRoleData,
    isOpseraAdministrator,
  } = useComponentStateReference();

  const getBody = () => {
    switch (currentScreen) {
      case FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.OPTION_SELECTION_SCREEN:
        return (
          <FreeTrialUserExpirationOptionSelectionScreen
            setCurrentScreen={setCurrentScreen}
          />
        );
      case FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.EXTEND_USER_EXPIRATION_SCREEN:
      case FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.REVOKE_USER_ACCESS_SCREEN:
      case FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.REINSTATE_USER_ACCESS_SCREEN:
      default:
        return null;
    }
  };

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
      {getBody()}
    </ScreenContainer>
  );
}