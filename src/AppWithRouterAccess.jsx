import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";

import AuthContextProvider from "./contexts/AuthContext";

import Home from "./Home";
import Login from "./components/login/Login";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/DashboardHome";
import Profile from "./components/user/Profile";
import About from "./components/about/About";
import Pricing from "./components/about/Pricing";
import OnlineHelp from "./components/about/Help";
import Inventory from "./components/inventory/Inventory";
import Signup from "./components/user/Signup";
import ApiConnector from "./components/api_connector/ApiConnector";
import Pipeline from "./components/pipeline/index";
import Platform from "./components/platform/Platform";
import Reports from "./components/reports/Reports";
import Analytics from "./components/analytics/Analytics";
import Logs from "./components/logs/Logs";
import Update from "./components/update/Update";
import AdminTools from "./components/admin/AdminTools";
import DeleteTools from "./components/admin/delete_tools/DeleteTools";
import RegisteredUsers from "./components/admin/registered_users/RegisteredUsers";
import ManageSystems from "./components/admin/manage_systems/ManageSystems";
import ReportsRegistration from "./components/admin/analytics/ReportsRegistration";
import ApiConnectionDemo from "./components/api_connector/ApiDemo";
import Workflow from "./components/workflow/Workflow";
import SystemStatus from "./components/admin/status/SystemStatus";
import CustomerSystemStatus from "./components/admin/status/CustomerSystemStatus";
import Overview from "./components/landing/Overview";
import Registration from "./components/landing/Registration";
import ToolConfigurations from "./components/admin/tools/ToolConfigurations";
import TagEditor from "./components/admin/tags/TagsEditor";
import TemplateEditor from "./components/admin/template_editor/TemplateEditor";
import OPBlueprintMain from "./components/blueprint/blueprint";
import LdapDashboard from "./components/admin/ldap/LdapDashboard";
import LdapContentView from "./components/admin/ldap/LdapContentView";

import FreeTrialRegistration from "./components/freeTrial/Registration";
import FreeTrialLanding from "./components/freeTrial/Landing";

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };
  const OKTA_CONFIG = {
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
    pkce: true,
    disableHttpsCheck: false,
    onAuthRequired: onAuthRequired
  };
  const [hideSideBar, setHideSideBar] = useState(false);
  

  useEffect(() => {    
    enableSideBar(history.location.pathname);    
  }, []);
  
  const enableSideBar = (path) => {
    if (path === "/login" || path === "/signup" || path === "/registration" || path === "/trial/registration") {
      setHideSideBar(true);
      console.log("hide sidebar true");
    } else {
      setHideSideBar(false);
      console.log("hide sidebar false");
    }
  };

  return (
    <Security {...OKTA_CONFIG}>
      <AuthContextProvider>
        <Navbar hideAuthComponents={hideSideBar} />
        <div className="container-fluid">
          <div className="d-flex flex-row">      
            {!hideSideBar && <Sidebar hideView={false} /> }

            <div className="w-100 pt-4 pb-4">
              <Route path="/" exact component={Home} />
              {/* <Route path="/login" exact component={Login} /> */}
              <Route path='/login' render={() => <Login issuer={OKTA_CONFIG.issuer} />} />
              <Route path='/implicit/callback' component={LoginCallback} />

              <Route path="/signup" exact component={Signup} />
              <Route path="/about" exact component={About} />
              <Route path="/about/pricing" component={Pricing} />
              <Route path="/help" component={OnlineHelp} />
              {/* <Route path="/implicit/callback" component={ImplicitCallback} /> */}
              <Route path="/registration" exact component={Registration} />
              <SecureRoute path="/overview" exact component={Overview} />
              <SecureRoute path="/profile" component={Profile} />
              <SecureRoute path="/inventory/:view?/:id?" component={Inventory} />
              <SecureRoute path="/dashboard" component={Dashboard} />
              <SecureRoute path="/tools/:id?" component={ApiConnector} />
              <SecureRoute path="/pipeline" component={Pipeline} />
              <SecureRoute path="/workflow/:id?/:view?" component={Workflow} />
              <SecureRoute path="/platform" component={Platform} />
              <SecureRoute path="/analytics" exact component={Analytics} />
              <SecureRoute path="/logs" exact component={Logs} />
              <SecureRoute path="/blueprint" exact component={OPBlueprintMain} />
              <SecureRoute path="/reports" exact component={Reports} />
              <SecureRoute path="/update" component={Update} />
              <SecureRoute path="/admin" exact component={AdminTools} />
              <SecureRoute path="/admin/delete" component={DeleteTools} />
              <SecureRoute path="/admin/manage_systems" component={ManageSystems} />
              <SecureRoute path="/admin/registered_users" component={RegisteredUsers} />
              <SecureRoute path="/admin/systemstatus" component={SystemStatus} />
              <SecureRoute path="/admin/customerstatus" component={CustomerSystemStatus} />
              <SecureRoute path="/admin/analytics/reports-registration" component={ReportsRegistration} />
              <SecureRoute path="/admin/tool-configurations" component={ToolConfigurations} />
              <SecureRoute path="/admin/tags" component={TagEditor} />
              <SecureRoute path="/admin/template-editor" component={TemplateEditor} />
              <SecureRoute path="/admin/ldap" exact component={LdapDashboard} />
              <SecureRoute path="/admin/ldap/:view" component={LdapContentView} />
              <SecureRoute path="/api_demo" component={ApiConnectionDemo} />

              <Route path="/trial/registration" exact component={FreeTrialRegistration} />
              <Route path="/trial/landing" exact component={FreeTrialLanding} />
            </div>
          </div>
          <div className="row fixed-row-footer-bottom">
            <div className="col text-center m-1" style={{ padding: 0, margin: 0, fontSize: ".6em" }}>© OpsERA 2020</div>
          </div>
        </div>
      </AuthContextProvider>
    </Security>
  );
};

export default AppWithRouterAccess;