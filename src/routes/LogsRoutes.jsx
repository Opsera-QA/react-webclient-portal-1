import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Logs from "components/logs/Logs";

export default function LogsRoutes() {
  return (
    <>
      <SecureRoute path="/logs" exact component={Logs} />
    </>
  );
}

LogsRoutes.propTypes = {};

