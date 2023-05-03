import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Dashboard from "components/dashboard/DashboardHome";
import ApiConnector from "components/api_connector/ApiConnector";
import Update from "components/update/Update";
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
import WorkspaceRoutes from "routes/WorkspaceRoutes";

export default function AppRoutes() {
  return (
    <>
      <PublicRoutes/>
      <UserProfileRoutes/>
      <ToolchainRoutes/>
      <PipelinesRoutes/>
      <InsightsRoutes/>
      <RegistryRoutes/>
      <TasksRoutes/>
      <LogsRoutes/>
      <BlueprintsRoutes/>
      <ReportsRoutes/>
      <NotificationsRoutes/>
      <SettingsRoutes/>
      <FreeTrialSettingsRoutes/>
      <AdminToolsRoutes/>
      <FreeTrialAdminToolsRoutes/>
      <WorkspaceRoutes/>

      {/*TODO: These are legacy routes that should probably be removed*/}
      <SecureRoute path="/dashboard" component={Dashboard}/>
      <SecureRoute path="/tools/:id?" component={ApiConnector}/>
      <SecureRoute path="/update" component={Update}/>
    </>
  );
}

AppRoutes.propTypes = {};
