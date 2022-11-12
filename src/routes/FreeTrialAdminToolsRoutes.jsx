import React from "react";
import { SecureRoute } from "@okta/okta-react";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialCustomerWorkspaceManagement
  from "components/admin/customer/workspace/free_trial/FreeTrialCustomerWorkspaceManagement";
import FreeTrialCustomerWorkspaceView
  from "components/admin/customer/workspace/free_trial/FreeTrialCustomerWorkspaceView";

export default function FreeTrialAdminToolsRoutes() {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  if (isOpseraAdministrator !== true || isFreeTrial !== true) {
    return <></>;
  }

  return (
    <>
      <SecureRoute path="/admin/customer/workspaces" exact component={FreeTrialCustomerWorkspaceManagement} />
      <SecureRoute path="/admin/customer/workspaces/user/:userId" exact component={FreeTrialCustomerWorkspaceView} />
    </>
  );
}

FreeTrialAdminToolsRoutes.propTypes = {};

