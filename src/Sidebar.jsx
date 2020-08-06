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
} from "@fortawesome/free-solid-svg-icons";

import "./sidebar.css";

function Sidebar({ userData, hideSideBar }) {
  const contextType = useContext(AuthContext);
  const { setAccessRoles, featureFlagItemInProd } = contextType;
  const [hideInProdFF, setHideInProdFF] = useState(false);
  const [userAccessRoles, setuserAccessRoles] = useState({});

  useEffect(() => {
    const hideFeatureInProd = featureFlagItemInProd(); //returns true when in production
    setHideInProdFF(hideFeatureInProd);
    loadAccessRoles(userData)
  }, [userData]);


  const loadAccessRoles = async (user) => {
    console.log(user)
    const userAccess = await setAccessRoles(user);
    console.log(userAccess)
    setuserAccessRoles(userAccess);
  };


  if (hideSideBar) {
    return (<></>);
  } else if (userData && userAccessRoles) {

    //first check for OPsera admin level
    if (userAccessRoles.OpseraAdministrator) {
      //return Opsera Admin Component
      return funcOpseraAdminNav(hideInProdFF);
    } else {
      if (userAccessRoles.Administrator) {
        return funcAccountAdminNav(hideInProdFF);
      } else if (userAccessRoles.Role === "free_trial") {
        return funcFreeTrialNav();
      } else {
        return funcDefaultNav();
      }
    }
  } else {
    return (<></>);
  }

}


const funcOpseraAdminNav = (hideInProdFF) => {
  return <>
    {/*<div className="d-block d-md-none pt-1 mr-2">
      <Button variant="outline-primary" onClick={handleToggleMenuClick}>
              <span className="dark-blue-text"><i
                className="fas fa-bars fa-1x"></i></span>
      </Button>
    </div>*/}

    <div className={"w-20 pt-1 d-block"}>
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" to="/overview">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span className="menu-text">Platforms</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartBar} fixedWidth/> <span
            className="menu-text">Analytics</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span className="menu-text">Inventory</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/tools">
            <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span className="menu-text">API Tools</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/update">
            <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
            className="menu-text">Updates</span></NavLink>
          {(!hideInProdFF) && <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span className="menu-text">Settings</span></NavLink>}
          <NavLink className="nav-link" activeClassName="chosen" to="/admin">
            <FontAwesomeIcon size="lg" icon={faTools} fixedWidth/> <span
            className="menu-text">Admin Tools</span></NavLink>

        </div>
      </div>
    </div>
  </>;
};


const funcAccountAdminNav = (hideInProdFF) => {
  return <>
    {/*<div className="d-block d-md-none pt-1 mr-2">
      <Button variant="outline-primary" onClick={handleToggleMenuClick}>
              <span className="dark-blue-text"><i
                className="fas fa-bars fa-1x"></i></span>
      </Button>
    </div>*/}

    <div className={"w-20 pt-1 d-block"}>
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
        <div className="sidebar-menu pt-3">
          <NavLink className="nav-link" activeClassName="chosen" to="/overview">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span className="menu-text">Platforms</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartBar} fixedWidth/> <span
            className="menu-text">Analytics</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span className="menu-text">Inventory</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/logs">
            <FontAwesomeIcon size="lg" icon={faArchive} fixedWidth/> <span className="menu-text">Logs</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/blueprint">
            <FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth/> <span
            className="menu-text">Blueprints</span></NavLink>

          <NavLink className="nav-link" activeClassName="chosen" to="/tools">
            <FontAwesomeIcon size="lg" icon={faLink} fixedWidth/> <span className="menu-text">API Tools</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/update">
            <FontAwesomeIcon size="lg" icon={faDownload} fixedWidth/> <span
            className="menu-text">Updates</span></NavLink>
          {(!hideInProdFF) && <NavLink className="nav-link" activeClassName="chosen" to="/settings">
            <FontAwesomeIcon size="lg" icon={faCogs} fixedWidth/> <span className="menu-text">Settings</span></NavLink>}

        </div>
      </div>
    </div>
  </>;
};


const funcFreeTrialNav = () => {
  return <>
    <div className="w-20 pt-1 d-block">
      <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
      <div className="sidebar-menu pt-3">
        <NavLink className="nav-link" activeClassName="chosen" to="/overview">
          <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span className="menu-text">Overview</span></NavLink>

        <div className="mt-4 mb-2 sub-header">Products</div>
        <NavLink className="nav-link" activeClassName="chosen" to="/platform">
          <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span className="menu-text">Platforms</span></NavLink>
        <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
          <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
          className="menu-text">Pipelines</span></NavLink>
        <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
          <FontAwesomeIcon size="lg" icon={faChartBar} fixedWidth/> <span
          className="menu-text">Analytics</span></NavLink>

        <div className="mt-4 mb-2 sub-header">Resources</div>
        <NavLink className="nav-link" activeClassName="chosen" to="/help">
          <FontAwesomeIcon size="lg" icon={faLifeRing} fixedWidth/> <span className="menu-text">Help</span></NavLink>
        <NavLink className="nav-link" activeClassName="chosen" to="/about">
          <FontAwesomeIcon size="lg" icon={faAddressBook} fixedWidth/> <span
          className="menu-text">Contact Us</span></NavLink>
      </div>
    </div>
    </div>
  </>;
};


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
          <NavLink className="nav-link" activeClassName="chosen" to="/overview">
            <FontAwesomeIcon size="lg" icon={faHome} fixedWidth/> <span className="menu-text">Overview</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard">
            <FontAwesomeIcon size="lg" icon={faColumns} fixedWidth/> <span className="menu-text">Dashboards</span>
            <div className="caret"></div>
          </NavLink>

          <div className="mt-4 mb-2 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform">
            <FontAwesomeIcon size="lg" icon={faBox} fixedWidth/> <span className="menu-text">Platforms</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/workflow">
            <FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth/> <span
            className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics">
            <FontAwesomeIcon size="lg" icon={faChartBar} fixedWidth/> <span
            className="menu-text">Analytics</span></NavLink>

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory/tools">
            <FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth/> <span className="menu-text">Inventory</span></NavLink>
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

Sidebar.propTypes = {
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};

export default Sidebar;
