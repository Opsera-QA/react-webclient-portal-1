import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppWithRouterAccess from "./AppWithRouterAccess";

//import { createBrowserHistory } from "history";
//const config = require("./config");


const App = () => {
  return (
    <Router>
      <AppWithRouterAccess/>
    </Router>
  );
};






/* 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideSideBar: false,
      history: createBrowserHistory()
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

  enableSideBar(path) {
    if (path !== "/login" && 
    path !== "/signup" && 
    path !== "/registration") {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { hideSideBar, history } = this.state;
    return (
      <Router>
        <Security {...OKTA_CONFIG}>
          <AuthContextProvider>
            <Navbar />
            <div className="container-fluid">
              <div className="d-flex flex-row">

                {this.enableSideBar(history.location.pathname)  && <Sidebar hideView={hideSideBar} /> }

                <div className="w-100 pt-4 pb-4">
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/about" exact component={About} />
                  <Route path="/about/pricing" component={Pricing} />
                  <Route path="/about/solutions" component={Solutions} />
                  <Route path="/implicit/callback" component={ImplicitCallback} />
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
} */

export default App;