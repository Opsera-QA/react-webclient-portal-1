import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import AuthContextProvider from "./contexts/AuthContext";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/DashboardHome";
import Profile from "./components/user/Profile";
import About from "./components/about/About";
import Pricing from "./components/about/Pricing";
import Solutions from "./components/about/Solutions";
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
import RegisteredUsers from "./components/admin/RegisteredUsers";
import ManageSystems from "./components/admin/manage_systems/ManageSystems";
import ReportsRegistration from "./components/admin/analytics/ReportsRegistration";
import ApiConnectionDemo from "./components/api_connector/ApiDemo";
import Workflow from "./components/workflow/Workflow";
import SystemStatus from "./components/admin/status/SystemStatus";
import CustomerSystemStatus from "./components/admin/status/CustomerSystemStatus";
import Overview from "./components/landing/Overview";
import Registration from "./components/landing/Registration";
import ToolConfigurations from "./components/admin/tools/ToolConfigurations";

const config = require("./config");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideSideBar: false
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (window.innerWidth < 770) {
      this.setState({ hideSideBar: true });
    }
  }

  render() {
    const { hideSideBar } = this.state;
    return (
      <Router>
        <Security {...config.okta_config}>
          <AuthContextProvider>
            <Navbar />
            <div className="container-fluid">
              <div className="d-flex flex-row">

                <Sidebar hideView={hideSideBar} />

                <div className="w-100 pt-4 pb-4">
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/overview" exact component={Overview} />
                  <Route path="/about" exact component={About} />
                  <Route path="/about/pricing" component={Pricing} />
                  <Route path="/about/solutions" component={Solutions} />
                  <Route path="/implicit/callback" component={ImplicitCallback} />
                  <Route path="/registration" exact component={Registration} />
                  <SecureRoute path="/profile" component={Profile} />
                  <SecureRoute path="/inventory/:view?/:id?" component={Inventory} />
                  <SecureRoute path="/dashboard" component={Dashboard} />
                  <SecureRoute path="/tools/:id?" component={ApiConnector} />
                  <SecureRoute path="/pipeline" component={Pipeline} />
                  <SecureRoute path="/workflow/:id?/:view?" component={Workflow} />
                  <SecureRoute path="/platform" component={Platform} />
                  <SecureRoute path="/analytics" exact component={Analytics} />
                  <SecureRoute path="/logs" exact component={Logs} />
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
                  <SecureRoute path="/api_demo" component={ApiConnectionDemo} />
                </div>
              </div>
              <div className="row fixed-row-footer-bottom">
                <div className="col text-center m-1" style={{ padding: 0, margin: 0, fontSize: ".6em" }}>© OpsERA 2020</div>
              </div>
            </div>
          </AuthContextProvider>
        </Security>
      </Router>
    );
  }
}

export default App;