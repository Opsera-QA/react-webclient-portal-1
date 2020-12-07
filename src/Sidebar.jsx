import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faChartBar,
  faArchive,
  faColumns,
  faLink,
  faBox,
  faDownload,
  faHome,
  faTools,
  faAddressBook,
  faDraftingCompass,
  faLayerGroup,
  faLifeRing,
  faCogs,
  faChartNetwork,
  faCaretSquareDown,
  faCaretSquareUp, faAnalytics,
} from "@fortawesome/pro-light-svg-icons";

import "./sidebar.css";

const hiddenNav = () => {
  return <></>;
};

function Sidebar({ userData, hideSideBar }) {
  const contextType = useContext(AuthContext);
  const { setAccessRoles, featureFlagHideItemInProd } = contextType;
  const [renderOutput, setRenderOutput] = useState(hiddenNav);

  /*const [insights, setInsights] = useState(false);
  const [pipelines, setPipelines] = useState(false);*/

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
    if (process.env.REACT_APP_STACK === "free-trial") {
      return (<FreeTrialNav accessRole={accessRole}/>);
    }

    if (accessRole.OpseraAdministrator) {
      //return funcOpseraAdminNav;
      return (<OpseraAdminUserNav accessRole={accessRole} featureFlagHideItemInProd={featureFlagHideItemInProd}/>);
    } else if (accessRole.Type === "sass-user") {
      return funcSassNav;
    } else { //drop into LDAP Org roles
      if (accessRole.Administrator) {
        return funcAccountAdminNav;
      } else if (accessRole.Role === "power_user") {
        return funcAccountPowerUserNav();
      } else {
        return funcDefaultNav;
      }
    }
  };

  return renderOutput;
}


/*const funcOpseraAdminNav = () => {
  return <>
    <div className={"w-20 pt-1 d-block pl-2"}>
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          {/!*<NavLink className="nav-link" activeClassName="chosen" to="/tools">
            <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span
            className="menu-text">API Tools</span></NavLink>*!/}
          <NavLink className="nav-link" activeClassName="chosen" to="/update">
            <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
            className="menu-text">Updates</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/admin">
            <FontAwesomeIcon size="lg" icon={faTools} fixedWidth/> <span
            className="menu-text">Admin Tools</span></NavLink>

        </div>
      </div>
    </div>
  </>;
};*/

const funcSassNav = () => {
  return (<>
    <div className={"w-20 pt-1 d-block"}>
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          {/*<NavLink className="nav-link" activeClassName="chosen" to="/tools">
            <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span
            className="menu-text">API Tools</span></NavLink>*/}
          <NavLink className="nav-link" activeClassName="chosen" to="/update">
            <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
            className="menu-text">Updates</span></NavLink>
          {/*<NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>*/}
        </div>
      </div>
    </div>
  </>);
};

const funcAccountPowerUserNav = () => {
  return <>
    <div className={"w-20 pt-1 d-block"}>
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          {/*<NavLink className="nav-link" activeClassName="chosen" to="/tools">
            <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span
            className="menu-text">API Tools</span></NavLink>*/}
          <NavLink className="nav-link" activeClassName="chosen" to="/update">
            <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
            className="menu-text">Updates</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>
        </div>
      </div>
    </div>
  </>;
};

const funcAccountAdminNav = () => {
  return <>
    <div className={"w-20 pt-1 d-block"}>
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          {/*<NavLink className="nav-link" activeClassName="chosen" to="/tools">
            <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span
            className="menu-text">API Tools</span></NavLink>*/}
          <NavLink className="nav-link" activeClassName="chosen" to="/update">
            <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
            className="menu-text">Updates</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
            className="menu-text">Settings</span></NavLink>

        </div>
      </div>
    </div>
  </>;
};
/*
const funcFreeTrialNav = (accessRole, insights, setInsights) => {

  return <>
    <div className="w-20 pt-1 d-block">
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/trial/landing">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>


          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/trial/landing/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Platforms</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>


          <NavLink className="nav-link" activeClassName="chosen" to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
            className="menu-text">Insights</span>
          </NavLink>
          <div className="text-right pointer" onClick={() => setInsights(insights => !insights)}>
            <FontAwesomeIcon size="sm" icon={faCaretSquareDown} fixedWidth/>
          </div>

          {insights && <>
            <NavLink className="nav-link" activeClassName="chosen" exact to="/analytics">
              <span className="menu-text-sub">Analytics</span>
            </NavLink>
          </>}


          <div className="mt-4 mb-2 sub-header">Resources</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/help">
            <FontAwesomeIcon size="lg" icon={faLifeRing} fixedWidth/> <span
            className="menu-text">Help</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/about">
            <FontAwesomeIcon size="lg" icon={faAddressBook} fixedWidth/> <span
            className="menu-text">Contact Us</span></NavLink>

          {accessRole.OpseraAdministrator && <>
            <div className="mt-4 mb-2 sub-header">Administration</div>
            <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
              <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
              className="menu-text">Tool Registry</span></NavLink>
            <NavLink className="nav-link" activeClassName="chosen" to="/logs">
              <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
            <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
              <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
              className="menu-text">Blueprints</span></NavLink>

            {/!*<NavLink className="nav-link" activeClassName="chosen" to="/tools">
              <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span
              className="menu-text">API Tools</span></NavLink>
            <NavLink className="nav-link" activeClassName="chosen" to="/update">
              <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
              className="menu-text">Updates</span></NavLink>*!/}
            <NavLink className="nav-link" activeClassName="chosen" to="/settings">
              <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
              className="menu-text">Settings</span></NavLink>
            <NavLink className="nav-link" activeClassName="chosen" to="/admin">
              <FontAwesomeIcon size="lg" icon={faTools} fixedWidth/> <span
              className="menu-text">Admin Tools</span></NavLink>

          </>}


        </div>
      </div>
    </div>
  </>;
};*/

const funcDefaultNav = () => {
  return <>
    {/*<div className="d-block d-md-none pt-1 mr-2">
      <Button variant="outline-primary" onClick={handleToggleMenuClick}>
              <span className="dark-blue-text"><i
                className="fas fa-bars fa-1x"></i></span>
      </Button>
    </div>*/}

    <div className="w-20 pt-1 d-block">
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartBar} fixedWidth/> <span
            className="menu-text">Analytics</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>
        </div>
      </div>
    </div>
  </>;
};


function FreeTrialNav({ accessRole }) {
  const [insights, setInsights] = useState(false);

  return (<>
    <div className="w-20 pt-1 d-block">
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/trial/landing">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>


          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/trial/landing/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>


          <div className="d-flex flex-row">
            <div>
              <NavLink className="nav-link" activeClassName="chosen" to="/dashboard"
                       onClick={() => setInsights(true)}>
                <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
                className="menu-text">Insights</span>
              </NavLink>
            </div>
            <div className="text-center pointer flex-grow-1 pr-2 pt-2"
                 onClick={() => setInsights(insights => !insights)}>
              {insights ?
                <FontAwesomeIcon size="sm" icon={faCaretSquareUp} fixedWidth/> :
                <FontAwesomeIcon size="sm" icon={faCaretSquareDown} fixedWidth/>}
            </div>
          </div>

          {insights && <>
            <NavLink className="nav-link" activeClassName="chosen" exact to="/analytics">
              <span className="menu-text-sub">Analytics</span>
            </NavLink>
          </>}


          <div className="mt-4 mb-2 sub-header">Resources</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/>
            <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/help">
            <FontAwesomeIcon size="lg" icon={faLifeRing} fixedWidth/> <span
            className="menu-text">Help</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/about">
            <FontAwesomeIcon size="lg" icon={faAddressBook} fixedWidth/> <span
            className="menu-text">Contact Us</span></NavLink>

          {accessRole.OpseraAdministrator && <>
            <div className="mt-4 mb-2 sub-header">Administration</div>
            <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
              <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
              className="menu-text">Tool Registry</span></NavLink>


            {/*<NavLink className="nav-link" activeClassName="chosen" to="/tools">
              <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span
              className="menu-text">API Tools</span></NavLink>
            <NavLink className="nav-link" activeClassName="chosen" to="/update">
              <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
              className="menu-text">Updates</span></NavLink>*/}
            <NavLink className="nav-link" activeClassName="chosen" to="/settings">
              <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span
              className="menu-text">Settings</span></NavLink>
            <NavLink className="nav-link" activeClassName="chosen" to="/admin">
              <FontAwesomeIcon size="lg" icon={faTools} fixedWidth/> <span
              className="menu-text">Admin Tools</span></NavLink>

          </>}


        </div>
      </div>
    </div>
  </>);
}


function OpseraAdminUserNav({ accessRole, featureFlagHideItemInProd }) {
  const [insights, setInsights] = useState(false);

  //get FeatureFlag

  return (<>
    <div className="w-20 pt-1 d-block">
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" exact to="/">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span
            className="menu-text">Overview</span></NavLink>


          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span
            className="menu-text">Toolchain</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>

          {!featureFlagHideItemInProd ?
            <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
              <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
              className="menu-text">Insights</span></NavLink>
            :
            <>
              <div className="d-flex flex-row">
                <div>
                  <NavLink className="nav-link" activeClassName="chosen" to="/insights/dashboards"
                           onClick={() => setInsights(true)}>
                    <FontAwesomeIcon size="lg" icon={faChartNetwork} fixedWidth/> <span
                    className="menu-text">Insights</span>
                  </NavLink>
                </div>
                <div className="text-center pointer flex-grow-1 pr-2 pt-2"
                     onClick={() => setInsights(insights => !insights)}>
                  {insights ?
                    <FontAwesomeIcon size="sm" icon={faCaretSquareUp} fixedWidth/> :
                    <FontAwesomeIcon size="sm" icon={faCaretSquareDown} fixedWidth/>}
                </div>
              </div>
            </>
          }

          {insights && <>
            <NavLink className="nav-link" activeClassName="chosen" exact to="/insights/marketplace">
              <span className="menu-text-sub">Marketplace</span>
            </NavLink>

            <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
              <span className="menu-text-sub">Legacy Analytics</span></NavLink>
            <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
              <span className="menu-text-sub">Legacy Dashboards</span>
            </NavLink>
          </>}


          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span
            className="menu-text">Tool Registry</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          {featureFlagHideItemInProd &&
            <NavLink className="nav-link" activeClassName="chosen" to="/reports">
              <FontAwesomeIcon size="lg" icon={faAnalytics} fixedWidth/> <span
              className="menu-text">Reports</span></NavLink>
          }

          <NavLink className="nav-link" activeClassName="chosen" to="/update">
            <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
            className="menu-text">Updates</span></NavLink>
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

FreeTrialNav.propTypes = {
  accessRole: PropTypes.object,
};

OpseraAdminUserNav.propTypes = {
  accessRole: PropTypes.object,
  featureFlagHideItemInProd: PropTypes.func,
};

Sidebar.propTypes = {
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};

export default Sidebar;
