import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Platform from "components/platform/Platform";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToolchainRoutes() {
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isPowerUser !== true
  ) {
    return null;
  }

  return (
    <>
      <SecureRoute
        path="/platform"
        component={Platform}
      />
    </>
  );
}

ToolchainRoutes.propTypes = {};

