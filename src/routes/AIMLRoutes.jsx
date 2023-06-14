import React, { useEffect } from "react";
import { SecureRoute } from "@okta/okta-react";
import useComponentStateReference from "hooks/useComponentStateReference";
import AITools from "../components/ai_ml/AITools";

export default function ALMLRoutes() {
  const { isOpseraAdministrator } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return <></>;
  }

  return (
    <>
      <SecureRoute
        path="/ai"
        exact
        component={AITools}
      />
    </>
  );
}

ALMLRoutes.propTypes = {};
