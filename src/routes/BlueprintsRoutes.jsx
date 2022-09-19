import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Blueprint from "components/blueprint/Blueprint";

export default function BlueprintsRoutes() {
  return (
    <>
      <SecureRoute path="/blueprint/:id?/:run?" exact component={Blueprint} />
    </>
  );
}

BlueprintsRoutes.propTypes = {};

