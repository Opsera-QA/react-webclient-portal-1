import React, { useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialUserExpirationManagementSubNavigationBar
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementSubNavigationBar";
import FreeTrialUserExpirationOptionSelectionScreen
  from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationOptionSelectionScreen";

export default function FreeTrialUserExpirationManagement() {
  const {
    accessRoleData,
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialUserExpirationManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={<FreeTrialUserExpirationManagementSubNavigationBar activeTab={"freeTrialUserExpirationManagement"} />}
    >
      <FreeTrialUserExpirationOptionSelectionScreen
        className={"m-3"}
      />
    </ScreenContainer>
  );
}