import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";
import Sidebar from "components/sidebar/Sidebar";
import Dashboard from "components/dashboard/DashboardHome";
import ApiConnector from "components/api_connector/ApiConnector";
import Update from "components/update/Update";
import OpseraFooter from "components/footer/OpseraFooter";
import AdminToolsRoutes from "routes/AdminToolsRoutes";
import ToolchainRoutes from "routes/ToolchainRoutes";
import PublicRoutes from "routes/PublicRoutes";
import ReportsRoutes from "routes/ReportsRoutes";
import RegistryRoutes from "routes/RegistryRoutes";
import InsightsRoutes from "routes/InsightsRoutes";
import SettingsRoutes from "routes/SettingsRoutes";
import PipelinesRoutes from "routes/PipelinesRoutes";
import TasksRoutes from "routes/TasksRoutes";
import NotificationsRoutes from "routes/NotificationsRoutes";
import LogsRoutes from "routes/LogsRoutes";
import UserProfileRoutes from "routes/UserProfileRoutes";
import BlueprintsRoutes from "routes/BlueprintsRoutes";
import FreeTrialSettingsRoutes from "routes/FreeTrialSettingsRoutes";
import FreeTrialAdminToolsRoutes from "routes/FreeTrialAdminToolsRoutes";

export default function AppRoutes(
  {
    authenticatedState,
    isPublicPathState,
    authClient,
  }) {
  useEffect(() => {
  }, [authenticatedState, isPublicPathState]);

  // Authenticated routes
  return (
    <div className={"w-100 px-3"}>
      <div className={"d-flex flex-row"}>
        <Sidebar />
        <div className={"w-100"}>
          <PublicRoutes
            authClient={authClient}
          />
          <UserProfileRoutes />
          <ToolchainRoutes />
          <PipelinesRoutes />
          <InsightsRoutes />
          <RegistryRoutes />
          <TasksRoutes />
          <LogsRoutes />
          <BlueprintsRoutes />
          <ReportsRoutes />
          <NotificationsRoutes />
          <SettingsRoutes />
          <FreeTrialSettingsRoutes />
          <AdminToolsRoutes />
          <FreeTrialAdminToolsRoutes />

          {/*TODO: These are legacy routes that should probably be removed*/}
          <SecureRoute path="/dashboard" component={Dashboard} />
          <SecureRoute path="/tools/:id?" component={ApiConnector} />
          <SecureRoute path="/update" component={Update} />
        </div>
      </div>
      <OpseraFooter />
    </div>
  );
}

AppRoutes.propTypes = {
  authenticatedState: PropTypes.bool,
  isPublicPathState: PropTypes.bool,
  authClient: PropTypes.object,
};
