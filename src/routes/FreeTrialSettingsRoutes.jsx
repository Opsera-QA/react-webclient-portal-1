import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialUserExpirationManagement
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import FreeTrialUserExpirationUserRevocationScreen
  from "components/settings/trial/user_expiration/revocation/FreeTrialUserExpirationUserRevocationScreen";
import FreeTrialUserExpirationUserReinstatementScreen
  from "components/settings/trial/user_expiration/reinstatement/FreeTrialUserExpirationUserReinstatementScreen";
import FreeTrialUserExpirationExtendUserAccessScreen
  from "components/settings/trial/user_expiration/extension/FreeTrialUserExpirationExtendUserAccessScreen";
import FreeTrialUserActivityReportUserActivityViewer from "components/settings/trial/activity_report/user_activity/FreeTrialUserActivityReportUserActivityViewer";
import FreeTrialUserActivityReport
  from "components/settings/trial/activity_report/users/FreeTrialUserActivityReport";

export default function FreeTrialSettingsRoutes() {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    || isFreeTrial !== true
  ) {
    return null;
  }

  return (
    <>
      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management"}
        exact={true}
        component={FreeTrialUserExpirationManagement}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management/revocation"}
        exact={true}
        component={FreeTrialUserExpirationUserRevocationScreen}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management/reinstatement"}
        exact={true}
        component={FreeTrialUserExpirationUserReinstatementScreen}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management/extension"}
        exact={true}
        component={FreeTrialUserExpirationExtendUserAccessScreen}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />

      <RoleRestrictedRoute
        path={"/settings/trial/user/activity-report/users/:userId?"}
        exact={true}
        component={FreeTrialUserActivityReportUserActivityViewer}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user/activity-report/"}
        exact={true}
        component={FreeTrialUserActivityReport}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
    </>
  );
}

FreeTrialSettingsRoutes.propTypes = {};

