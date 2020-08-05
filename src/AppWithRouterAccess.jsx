import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import useAxios from "axios-hooks";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingDialog from "./components/common/loading";
import ErrorDialog from "components/common/error";

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
import Workflow from "./components/workflow/Workflow";
import SystemStatus from "./components/admin/status/SystemStatus";
import CustomerSystemStatus from "./components/admin/status/CustomerSystemStatus";
import Overview from "./components/landing/Overview";
import Registration from "./components/landing/Registration";
import ToolConfigurations from "./components/admin/tools/ToolConfigurations";
import TagEditor from "./components/admin/tags/TagManagement";
import TemplateEditor from "./components/admin/template_editor/TemplateEditor";
import OPBlueprintMain from "./components/blueprint/blueprint";
import LdapDashboard from "./components/accounts/LdapDashboard";
import LdapOrganizationsView from "./components/accounts/ldap_organizations/LdapOrganizationManagement";
import LdapOrganizationDetailView
  from "./components/accounts/ldap_organizations/organizations_detail_view/LdapOrganizationDetailView";
import LdapCustomerOnboardView from "./components/accounts/ldap_customer_onboard/LdapCustomerOnboard";
import FreeTrialRegistration from "./components/free_trial/Registration";
import FreeTrialLanding from "./components/free_trial/landing_page/Landing";
import ApiConnectionDemo from "./components/api_connector/ApiDemo";
import CommonTableDemo from "./components/common/samples/tableImplementation";
import TagDetailView from "./components/admin/tags/tags_detail_view/TagDetailView";
import LdapUserManagement from "./components/accounts/ldap_users/LdapUserManagement";
import LdapUserDetailView from "./components/accounts/ldap_users/users_detail_view/LdapUserDetailView";
import AccountSettingsView from "./components/user/AccountSettings";
import LdapGroupManagement from "./components/accounts/ldap_groups/LdapGroupManagement";
import LdapGroupDetails from "./components/accounts/ldap_groups/ldap_group_detail/LdapGroupDetails";

import axios from "axios";

const config = require("./config");

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  const OktaAuth = require("@okta/okta-auth-js");

  const OKTA_CONFIG = {
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
    pkce: true,
    disableHttpsCheck: false,
    onAuthRequired: onAuthRequired,
  };

  const authClient = new OktaAuth(OKTA_CONFIG);

  axios.interceptors.request.use(async (config) => {
      const tokenObject = await authClient.tokenManager.get("accessToken");
      if (tokenObject && tokenObject.accessToken) {
        config.headers["authorization"] = `Bearer ${tokenObject.accessToken}`;
        config.headers["cache-control"] = `no-cache`;
        console.log("CONFIG: ", config);
      }
      return config;
    },

    function(error) {
      return Promise.reject(error);
    },
  );

  const [{ data, loading, error }, refetch] = useAxios(
    config.apiServerUrl + "/users",
  );

  const [hideSideBar, setHideSideBar] = useState(false);

  useEffect(() => {
    enableSideBar(history.location.pathname);
  }, [data]);

  const enableSideBar = (path) => {
    if (path === "/" || path === "/login" || path === "/signup" || path === "/registration" || path === "/trial/registration") {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  };

  if (!data && loading) {
    return (<LoadingDialog/>);
    /*} else if (error) {
      console.log("ERROR: ", error);
      return (<ErrorDialog error={error}/>);*/
  } else {
    return (
      <Security {...OKTA_CONFIG}>
        <AuthContextProvider userData={data} refetchUserData={refetch}>
          <Navbar hideAuthComponents={hideSideBar}/>
          <div className="container-fluid">
            <div className="d-flex flex-row">
              <Sidebar userData={data} hideSideBar={hideSideBar}/>

              <div className="w-100 pt-4 pb-4">

                <Route path="/" exact component={Home}/>
                <SecureRoute path="/overview" exact component={Overview}/>

                <Route path='/login' render={() => <Login issuer={OKTA_CONFIG.issuer}/>}/>
                <Route path='/implicit/callback' component={LoginCallback}/>

                <Route path="/signup" exact component={Signup}/>
                <Route path="/about" exact component={About}/>
                <Route path="/about/pricing" component={Pricing}/>
                <Route path="/help" component={OnlineHelp}/>
                <Route path="/registration" exact component={Registration}/>

                <SecureRoute path="/profile" component={Profile}/>
                <SecureRoute path="/settings" component={AccountSettingsView}/>
                <SecureRoute path="/inventory/:view?/:id?" component={Inventory}/>
                <SecureRoute path="/dashboard" component={Dashboard}/>
                <SecureRoute path="/tools/:id?" component={ApiConnector}/>
                <SecureRoute path="/pipeline" component={Pipeline}/>
                <SecureRoute path="/workflow/:id?/:view?" component={Workflow}/>
                <SecureRoute path="/platform" component={Platform}/>
                <SecureRoute path="/analytics" exact component={Analytics}/>
                <SecureRoute path="/logs" exact component={Logs}/>
                <SecureRoute path="/blueprint" exact component={OPBlueprintMain}/>
                <SecureRoute path="/reports" exact component={Reports}/>
                <SecureRoute path="/update" component={Update}/>
                <SecureRoute path="/admin" exact component={AdminTools}/>
                <SecureRoute path="/admin/delete" component={DeleteTools}/>
                <SecureRoute path="/admin/manage_systems" component={ManageSystems}/>
                <SecureRoute path="/admin/registered_users" component={RegisteredUsers}/>
                <SecureRoute path="/admin/systemstatus" component={SystemStatus}/>
                <SecureRoute path="/admin/customerstatus" component={CustomerSystemStatus}/>
                <SecureRoute path="/admin/analytics/reports-registration" component={ReportsRegistration}/>
                <SecureRoute path="/admin/tool-configurations" component={ToolConfigurations}/>
                <SecureRoute path="/admin/tags" exact component={TagEditor}/>
                <SecureRoute path="/admin/tags/:id" exact component={TagDetailView}/>
                <SecureRoute path="/admin/template-editor" component={TemplateEditor}/>
                <SecureRoute path="/accounts" exact component={LdapDashboard}/>
                <SecureRoute path="/accounts/organizations" exact component={LdapOrganizationsView}/>
                <SecureRoute path="/accounts/organizations/detail/:id" exact component={LdapOrganizationDetailView}/>
                <SecureRoute path="/accounts/users" exact component={LdapUserManagement}/>
                <SecureRoute path="/accounts/users/:id" exact component={LdapUserDetailView}/>
                <SecureRoute path="/accounts/create" exact component={LdapCustomerOnboardView}/>

                <SecureRoute path="/accounts/groups" exact component={LdapGroupManagement}/>
                <SecureRoute path="/accounts/groups/:domain/:name" exact component={LdapGroupDetails}/>

                <SecureRoute path="/demo/api" component={ApiConnectionDemo}/>

                <SecureRoute path="/demo/table" component={CommonTableDemo}/>

                <Route path="/trial/registration" exact component={FreeTrialRegistration}/>
                <Route path="/trial/landing" exact component={FreeTrialLanding}/>
              </div>
            </div>
            <div className="row fixed-row-footer-bottom">
              <div className="col text-center m-1" style={{ padding: 0, margin: 0, fontSize: ".6em" }}>© OpsERA 2020
              </div>
            </div>
          </div>
        </AuthContextProvider>
      </Security>
    );
  }
};

export default AppWithRouterAccess;