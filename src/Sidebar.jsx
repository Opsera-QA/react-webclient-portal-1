import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
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
import IconBase from "components/common/icons/IconBase";

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
            <IconBase iconSize={"lg"} icon={faHome} /> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <IconBase iconSize={"lg"} icon={faBox} /> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <IconBase iconSize={"lg"} icon={faDraftingCompass} /> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <IconBase iconSize={"lg"} icon={faChartNetwork} /> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <IconBase iconSize={"lg"} icon={faClipboardList} /> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <IconBase iconSize={"lg"} icon={faTasks} /> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <IconBase iconSize={"lg"} icon={faArchive} /> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <IconBase iconSize={"lg"} icon={faLayerGroup} /> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <IconBase iconSize={"lg"} icon={faAnalytics} /> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <IconBase iconSize={"lg"} icon={faEnvelope} /> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <IconBase iconSize={"lg"} icon={faCogs} /> <span
            className="menu-text">Settings</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/admin">
            <IconBase iconSize={"lg"} icon={faTools} /> <span
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
            <IconBase iconSize={"lg"} icon={faHome} /> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <IconBase iconSize={"lg"} icon={faBox} /> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <IconBase iconSize={"lg"} icon={faDraftingCompass} /> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <IconBase iconSize={"lg"} icon={faChartNetwork} /> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <IconBase iconSize={"lg"} icon={faClipboardList} /> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <IconBase iconSize={"lg"} icon={faTasks} /> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <IconBase iconSize={"lg"} icon={faArchive} /> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <IconBase iconSize={"lg"} icon={faLayerGroup} /> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <IconBase iconSize={"lg"} icon={faAnalytics} /> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <IconBase iconSize={"lg"} icon={faEnvelope} /> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <IconBase iconSize={"lg"} icon={faCogs} /> <span
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
            <IconBase iconSize={"lg"} icon={faHome} /> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <IconBase iconSize={"lg"} icon={faBox} /> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <IconBase iconSize={"lg"} icon={faDraftingCompass} /> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <IconBase iconSize={"lg"} icon={faChartNetwork} /> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <IconBase iconSize={"lg"} icon={faClipboardList} /> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <IconBase iconSize={"lg"} icon={faTasks} /> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <IconBase iconSize={"lg"} icon={faArchive} /> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <IconBase iconSize={"lg"} icon={faLayerGroup} /> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <IconBase iconSize={"lg"} icon={faAnalytics} /> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <IconBase iconSize={"lg"} icon={faEnvelope} /> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <IconBase iconSize={"lg"} icon={faCogs} /> <span
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
            <IconBase iconSize={"lg"} icon={faHome} /> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <IconBase iconSize={"lg"} icon={faBox} /> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <IconBase iconSize={"lg"} icon={faDraftingCompass} /> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <IconBase iconSize={"lg"} icon={faChartNetwork} /> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <IconBase iconSize={"lg"} icon={faClipboardList} /> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <IconBase iconSize={"lg"} icon={faTasks} /> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <IconBase iconSize={"lg"} icon={faArchive} /> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <IconBase iconSize={"lg"} icon={faLayerGroup} /> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/reports">
            <IconBase iconSize={"lg"} icon={faAnalytics} /> <span
            className="menu-text">Reports</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <IconBase iconSize={"lg"} icon={faEnvelope} /> <span
            className="menu-text">Notifications</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <IconBase iconSize={"lg"} icon={faCogs} /> <span
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
            <IconBase iconSize={"lg"} icon={faHome} /> <span
            className="menu-text">Home</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Products</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <IconBase iconSize={"lg"} icon={faBox} /> <span
            className="menu-text">Toolchain</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <IconBase iconSize={"lg"} icon={faDraftingCompass} /> <span
            className="menu-text">Pipelines</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/insights">
            <IconBase iconSize={"lg"} icon={faChartNetwork} /> <span
            className="menu-text">Insights</span></NavLink>


          <div className="mt-3 mb-2 sub-header">Operations</div>

          <NavLink className="nav-link" activeClassName="chosen" to="/inventory">
            <IconBase iconSize={"lg"} icon={faClipboardList} /> <span
            className="menu-text">Tool Registry</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/task">
            <IconBase iconSize={"lg"} icon={faTasks} /> <span
            className="menu-text">Tasks</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <IconBase iconSize={"lg"} icon={faArchive} /> <span
            className="menu-text">Logs</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <IconBase iconSize={"lg"} icon={faLayerGroup} /> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/notifications">
            <IconBase iconSize={"lg"} icon={faEnvelope} /> <span
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
