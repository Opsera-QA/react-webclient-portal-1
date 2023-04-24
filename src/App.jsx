import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithRouterAccess from "./AppWithRouterAccess";
import "@fortawesome/fontawesome-pro/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@opsera/dhx-suite-package/codebase/suite.css";
import "react-widgets/styles.css";
import "css/general/navbar.css";
import "css/general/theme.css";
import "css/general/field.css";
import "css/general/container.css";
import "css/general/index.css";
import "css/general/freetrial.css";
import "css/analytics/analytics.css";
import "css/pipelines/workflows.css";
import "css/general/sidebar.css";
import "css/table/table.css";
import "css/inputs/rich-text-input.css";
import "temp-library-components/scss/opsera-theme.scss";
import "temp-library-components/scss/sub-menu.scss";
import "assets/scss/fonts.scss";

const App = () => {
  return (
    <Router>
      <AppWithRouterAccess/>
    </Router>
  );
};

export default App;