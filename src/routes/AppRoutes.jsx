import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { SecureRoute } from "@okta/okta-react";
import Dashboard from "components/dashboard/DashboardHome";
import ApiConnector from "components/api_connector/ApiConnector";
import Update from "components/update/Update";
import OpseraFooter from "components/footer/OpseraFooter";
import FreeTrialWorkspace from "components/workspace/trial/FreeTrialWorkspace";
import OpseraFreeTrialSettingsManagement from "components/header/OpseraFreeTrialSettingsManagement";
import FreeTrialInsightsLanding from "components/trial/insights/FreeTrialInsightsLanding";
import AdminToolsRoutes from "routes/AdminToolsRoutes";
import ToolchainRoutes from "routes/ToolchainRoutes";
import PageNotFound from "components/not_found/PageNotFound";
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

const AppRoutes = ({ authenticatedState, isPublicPathState, authClient, userData, hideSideBar }) => {
  const history = useHistory();

  useEffect(() => {
  }, [userData, authenticatedState, isPublicPathState, hideSideBar]);

  // Authenticated routes
  return (
    <div className={"container-fluid m-0"}>
      <div className={"d-flex flex-row"}>
        {/*{getSideBar()}*/}
        <div className={"w-100 hide-x-overflow"}>
          {/*<Router history={history}>*/}
          {/*  <Switch>*/}
          <SecureRoute path="/trial/settings" exact component={OpseraFreeTrialSettingsManagement} />

          <SecureRoute path="/workspace" component={FreeTrialWorkspace} />
          <SecureRoute path="/unified-insights" component={FreeTrialInsightsLanding} />

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
          <AdminToolsRoutes />

          {/*TODO: These are legacy routes that should probably be removed*/}
          <SecureRoute path="/dashboard" component={Dashboard} />
          <SecureRoute path="/tools/:id?" component={ApiConnector} />
          <SecureRoute path="/update" component={Update} />

          {/*<Route*/}
          {/*  path={"*"}*/}
          {/*  component={PageNotFound}*/}
          {/*/>*/}
          {/*  </Switch>*/}
          {/*</Router>*/}
        </div>
      </div>
      <OpseraFooter />
    </div>
  );
};

AppRoutes.propTypes = {
  authenticatedState: PropTypes.bool,
  isPublicPathState: PropTypes.bool,
  authClient: PropTypes.object,
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};

export default AppRoutes;

