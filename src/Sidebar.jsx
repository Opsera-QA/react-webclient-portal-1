
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faChartBar, faArchive, faColumns, faLink, faBox, faDownload, faHome, faTools, faDraftingCompass, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import LoadingDialog from "./components/common/loading";
import "./sidebar.css";

function Sidebar({ hideView }) {
  const contextType = useContext(AuthContext); 
  const { userRecord, authenticated, loading } = contextType;
  const [administrator, setAdministrator] = useState(false);
  const [hideSideBar, setHideSideBar] = useState(false);
  

  useEffect(() => {    
    checkAuthentication(userRecord);    
  }, [hideView, userRecord, loading]);

  const handleToggleMenuClick = () => {
    setHideSideBar(!hideSideBar);    
  };

  async function checkAuthentication (user)  {
    if (user) {
      console.log("userRecord ", userRecord);
      console.log("authenticated ", authenticated);
      if (authenticated && userRecord && userRecord.groups) {
        setAdministrator(userRecord.groups.includes("Admin"));
      }
    }     
  }


  return (
    <>
      { loading && <LoadingDialog  />}
      {(authenticated) ?
        <>
          <div className="d-block d-md-none pt-1 mr-2">
            <Button variant="outline-primary" onClick={handleToggleMenuClick}>
              <span className="dark-blue-text"><i
                className="fas fa-bars fa-1x"></i></span>
            </Button>
          </div>

          <div className={"w-20 pt-1 " + (hideSideBar ? "d-none d-md-block" : "d-block")}>
            <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
              <div className="sidebar-menu pt-3">
                <NavLink className="nav-link" activeClassName="chosen" to="/overview"><FontAwesomeIcon size="lg" icon={faHome} fixedWidth /> <span className="menu-text">Overview</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" exact to="/dashboard"><FontAwesomeIcon size="lg" icon={faColumns} fixedWidth /> <span className="menu-text">Dashboards</span><div className="caret"></div></NavLink>                

                <div className="mt-3 mb-1 sub-header">Products</div>
                <NavLink className="nav-link" activeClassName="chosen" to="/platform"><FontAwesomeIcon size="lg" icon={faBox} fixedWidth /> <span className="menu-text">Platforms</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/workflow"><FontAwesomeIcon size="lg" icon={faDraftingCompass} fixedWidth /> <span className="menu-text">Pipelines</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/analytics"><FontAwesomeIcon size="lg" icon={faChartBar} fixedWidth /> <span className="menu-text">Analytics</span></NavLink>                
                                
                <div className="mt-3 mb-1 sub-header">Operations</div>
                <NavLink className="nav-link" activeClassName="chosen" to="/inventory"><FontAwesomeIcon size="lg" icon={faClipboardList} fixedWidth /> <span className="menu-text">Inventory</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/logs"><FontAwesomeIcon size="lg" icon={faArchive} fixedWidth /> <span className="menu-text">Logs</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/blueprint"><FontAwesomeIcon size="lg" icon={faLayerGroup} fixedWidth /> <span className="menu-text">Blueprints</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/tools"><FontAwesomeIcon size="lg" icon={faLink} fixedWidth /> <span className="menu-text">API Tools</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/update"><FontAwesomeIcon size="lg" icon={faDownload} fixedWidth /> <span className="menu-text">Updates</span></NavLink>
                {administrator && <NavLink className="nav-link" activeClassName="chosen" to="/admin"><FontAwesomeIcon size="lg" icon={faTools} fixedWidth /> <span className="menu-text">Admin Tools</span></NavLink>}
              </div>
            </div>
          </div>
        </> :
        <>
          <div className={"w-20 pt-1 " + (hideSideBar ? "d-none d-md-block" : "d-block")}>
            <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
              <div className="sidebar-menu"></div>
            </div>
          </div>
        </>
      }
    </>);
}


Sidebar.propTypes = {
  hideView: PropTypes.bool
};

export default Sidebar;
