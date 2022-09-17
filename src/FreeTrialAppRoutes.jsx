import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./components/login/LoginForm";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./Home";
import Logout from "./components/login/Logout";
import About from "./components/about/About";
import Pricing from "./components/about/Pricing";
import OnlineHelp from "./components/about/Help";
import ToolDetailView from "./components/inventory/tools/tool_details/ToolDetailView";
import PipelineDetailView from "./components/workflow/pipelines/pipeline_details/PipelineDetailView";
import TaskDetailView from "components/tasks/details/TaskDetailView";
import Faq from "components/about/faq/Faq";
import HelpDocumentationScreen from "components/about/help_documentation/HelpDocumentationScreen";
import FreeTrialRegistration from "components/trial/registration/FreeTrialRegistration";
import OpseraFooter from "components/footer/OpseraFooter";
import FreeTrialWorkspace from "components/workspace/trial/FreeTrialWorkspace";
import FreeTrialInsightsLanding from "components/trial/insights/FreeTrialInsightsLanding";
import PageNotFound from "components/not_found/PageNotFound";

export default function FreeTrialAppRoutes({ authClient, OKTA_CONFIG }) {
  const history = useHistory();

  return (
    <div className={"container-fluid m-0"}>
      <div className={"d-flex flex-row"}>
        {/*{getSideBar()}*/}
        <div className={"w-100 hide-x-overflow"}>
          <Router history={history}>
            <Switch>
              <Route path="/login" render={() => <LoginForm issuer={OKTA_CONFIG.issuer} authClient={authClient} />} />
              <Route path="/implicit/callback" component={LoginCallback} />
              <Route path="/logout" exact component={Logout} />

              <Route path="/trial/registration" exact component={FreeTrialRegistration} />
              {/*<Route path="/signup" exact component={Signup} />*/}
              <Route path="/faq" exact component={Faq} />
              <Route path="/help-documentation" exact component={HelpDocumentationScreen} />
              <Route path="/about" exact component={About} />
              <Route path="/about/pricing" component={Pricing} />
              <Route path="/help" component={OnlineHelp} />

              <Route path="/" exact component={Home} />

              <SecureRoute path="/inventory/tools/details/:id/:tab?" exact component={ToolDetailView} />
              <SecureRoute path="/task/details/:id" exact component={TaskDetailView} />
              <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView} />
              <SecureRoute path="/workspace" component={FreeTrialWorkspace} />
              <SecureRoute path="/unified-insights" component={FreeTrialInsightsLanding} />
              <Route
                path={"*"}
                component={PageNotFound}
              />
            </Switch>
          </Router>
        </div>
      </div>
      <OpseraFooter />
    </div>
  );
}

FreeTrialAppRoutes.propTypes = {
  authClient: PropTypes.object,
  OKTA_CONFIG: PropTypes.object,
};

