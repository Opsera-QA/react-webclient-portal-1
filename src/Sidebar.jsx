import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faArchive,
  faColumns,
  faBox,
  faHome,
  faTools,
  faDraftingCompass,
  faLayerGroup,
  faCogs,
  faChartNetwork,
  faAnalytics,
  faEnvelope,
  faTasks,
} from "@fortawesome/pro-light-svg-icons";
import "css/general/sidebar.css";

const hiddenNav = () => {
  return <></>;
};

function Sidebar({ userData, hideSideBar }) {
  const contextType = useContext(AuthContext);
  const { setAccessRoles, featureFlagHideItemInProd, featureFlagHideItemInTest } = contextType;
  const [renderOutput, setRenderOutput] = useState(hiddenNav);

  useEffect(() => {
    loadAccessRoles(userData);
  }, [userData, hideSideBar]);

  const loadAccessRoles = async (user) => {
    const userAccessRoles = await setAccessRoles(user);

    if (hideSideBar) {
      setRenderOutput(hiddenNav);
    } else if (userData && userAccessRoles) {
      const renderFn = chooseRenderState(userAccessRoles);
      setRenderOutput(renderFn);
    }
  };

  const chooseRenderState = (accessRole) => {
    if (accessRole.OpseraAdministrator) {
      return (<OpseraAdminUserNav accessRole={accessRole}
                                  featureFlagHideItemInProd={featureFlagHideItemInProd()}
                                  featureFlagHideItemInTest={featureFlagHideItemInTest()}/>);

    } else if (accessRole.Type === "sass-user") {
      return (<SaasUserNav accessRole={accessRole}
                           featureFlagHideItemInProd={featureFlagHideItemInProd()}
                           featureFlagHideItemInTest={featureFlagHideItemInTest()}/>);

    } else { //drop into LDAP Org roles
      if (accessRole.Administrator) {
        return (<AccountAdminUserNav accessRole={accessRole}
                                     featureFlagHideItemInProd={featureFlagHideItemInProd()}
                                     featureFlagHideItemInTest={featureFlagHideItemInTest()}/>);

      } else if (accessRole.Role === "power_user") {
        return (<AccountPowerUserNav accessRole={accessRole}
                                     featureFlagHideItemInProd={featureFlagHideItemInProd()}
                                     featureFlagHideItemInTest={featureFlagHideItemInTest()}/>);

      } else {
        return (<DefaultUserNav accessRole={accessRole}
                                featureFlagHideItemInProd={featureFlagHideItemInProd()}
                                featureFlagHideItemInTest={featureFlagHideItemInTest()}/>);
      }
    }
  };

  return renderOutput;
}


function OpseraAdminUserNav({ accessRole, featureFlagHideItemInProd, featureFlagHideItemInTest }) {
  const [insights, setInsights] = useState(false);

  return (<>
    <div className="w-20 pt-1 d-block">
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-4">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <FontAwesomeIcon size="lg" icon={faTasks} fixedWidth/> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <FontAwesomeIcon size="lg" icon={faAnalytics} fixedWidth/> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <FontAwesomeIcon size="lg" icon={faEnvelope} fixedWidth/> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/admin">
            <FontAwesomeIcon size="lg" icon={faTools} fixedWidth/> <span
            className="menu-text">Admin Tools</span></NavLink>

        </div>
      </div>
    </div>
  </>);
}


function SaasUserNav({ accessRole, featureFlagHideItemInProd, featureFlagHideItemInTest }) {
  const [insights, setInsights] = useState(false);

  return (<>
    <div className="w-20 pt-1 d-block">

      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-4">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <FontAwesomeIcon size="lg" icon={faTasks} fixedWidth/> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <FontAwesomeIcon size="lg" icon={faAnalytics} fixedWidth/> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <FontAwesomeIcon size="lg" icon={faEnvelope} fixedWidth/> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>
        </div>
      </div>

    </div>
  </>);
}


function AccountAdminUserNav({ accessRole, featureFlagHideItemInProd, featureFlagHideItemInTest }) {
  const [insights, setInsights] = useState(false);

  return (<>
    <div className="w-20 pt-1 d-block">

      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-4">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <FontAwesomeIcon size="lg" icon={faTasks} fixedWidth/> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <FontAwesomeIcon size="lg" icon={faAnalytics} fixedWidth/> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <FontAwesomeIcon size="lg" icon={faEnvelope} fixedWidth/> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>
        </div>
      </div>
    </div>
  </>);
}


function AccountPowerUserNav({ accessRole, featureFlagHideItemInProd, featureFlagHideItemInTest }) {
  const [insights, setInsights] = useState(false);

  return (<>
    <div className="w-20 pt-1 d-block">

      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-4">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <FontAwesomeIcon size="lg" icon={faTasks} fixedWidth/> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <FontAwesomeIcon size="lg" icon={faAnalytics} fixedWidth/> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <FontAwesomeIcon size="lg" icon={faEnvelope} fixedWidth/> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>
        </div>
      </div>

    </div>
  </>);
}

//basic account users: nonadmin, nonpoweruser
function DefaultUserNav({ accessRole, featureFlagHideItemInProd, featureFlagHideItemInTest }) {
  const [insights, setInsights] = useState(false);

  return (<>
    <div className="w-20 pt-1 d-block">

      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-4">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <FontAwesomeIcon size="lg" icon={faTasks} fixedWidth/> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <FontAwesomeIcon size="lg" icon={faEnvelope} fixedWidth/> <span
            className="menu-text">Notifications</span></NavLink>

        </div>
      </div>
    </div>
  </>);
}


OpseraAdminUserNav.propTypes = {
  accessRole: PropTypes.object,
  featureFlagHideItemInProd: PropTypes.bool,
  featureFlagHideItemInTest: PropTypes.bool,
};

SaasUserNav.propTypes = {
  accessRole: PropTypes.object,
  featureFlagHideItemInProd: PropTypes.bool,
  featureFlagHideItemInTest: PropTypes.bool,
};

AccountAdminUserNav.propTypes = {
  accessRole: PropTypes.object,
  featureFlagHideItemInProd: PropTypes.bool,
  featureFlagHideItemInTest: PropTypes.bool,
};

AccountPowerUserNav.propTypes = {
  accessRole: PropTypes.object,
  featureFlagHideItemInProd: PropTypes.bool,
  featureFlagHideItemInTest: PropTypes.bool,
};

DefaultUserNav.propTypes = {
  accessRole: PropTypes.object,
  featureFlagHideItemInProd: PropTypes.bool,
  featureFlagHideItemInTest: PropTypes.bool,
};

Sidebar.propTypes = {
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};

export default Sidebar;
