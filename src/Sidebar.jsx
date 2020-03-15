
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream, faHistory, faClipboardList, faLink, faBox, faDownload, faHome, faTools, faDraftingCompass } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

function Sidebar({ hideView }) {
  const contextType = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [administrator, setAdministrator] = useState(false);
  const [previewRole, setPreviewRole] = useState(false);
  const [hideSideBar, setHideSideBar] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    checkAuthentication();
    setHideSideBar(hideView);
  }, [hideView, contextType]); 

  const handleToggleMenuClick = () => {
    setHideSideBar(!hideSideBar);    
  };

  async function checkAuthentication ()  {
    setLoading(true);
    const { getUserInfo, authenticated } = contextType;
    try {
      const userInfoResponse = await getUserInfo();
      setAuthenticated(authenticated);
    
      if (userInfoResponse !== undefined && Object.keys(userInfoResponse).length > 0) {
        setUserInfo(userInfoResponse);
        setAdministrator(userInfoResponse.Groups.includes("Admin"));
        setPreviewRole(userInfoResponse.Groups.includes("Preview"));      
      }
    }
    catch (err) {
      console.log("Error occured getting user authentication status.", err);
    }
    setLoading(false);
  }


  return (
    <>
      {(!loading && userInfo !== undefined && authenticated) &&
        <>
          <div className="d-block d-md-none pt-1 mr-2">
            <Button variant="outline-primary" onClick={handleToggleMenuClick}>
              <span className="dark-blue-text"><i
                className="fas fa-bars fa-1x"></i></span>
            </Button>
          </div>

          <div className={"w-20 pt-1 " + (hideSideBar ? "d-none d-md-block" : "d-block")}>
            <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
              <div className="sidebar-menu">
      
                <div className="mt-3 mb-1 sub-header">Products</div>
                <NavLink className="nav-link" activeClassName="chosen" exact to="/"><FontAwesomeIcon icon={faHome} fixedWidth /> <span className="menu-text">Dashboard</span><div className="caret"></div></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> <span className="menu-text">Inventory</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/platform"><FontAwesomeIcon icon={faBox} fixedWidth /> <span className="menu-text">Platforms</span></NavLink>
                
                {previewRole &&
                  <NavLink className="nav-link" activeClassName="chosen" to="/workflow"><FontAwesomeIcon icon={faDraftingCompass} fixedWidth /> <span className="menu-text">Pipeline Beta</span></NavLink>
                }
                <NavLink className="nav-link" activeClassName="chosen" to="/pipeline"><FontAwesomeIcon icon={faStream} fixedWidth /> <span className="menu-text">Pipelines</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/analytics"><FontAwesomeIcon icon={faHistory} fixedWidth /> <span className="menu-text">Analytics</span></NavLink>
        
                <div className="mt-3 mb-1 sub-header">Operations</div>
                <NavLink className="nav-link" activeClassName="chosen" to="/tools"><FontAwesomeIcon icon={faLink} fixedWidth /> <span className="menu-text">Tools</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/update"><FontAwesomeIcon icon={faDownload} fixedWidth /> <span className="menu-text">Updates</span></NavLink>
                {administrator && <NavLink className="nav-link" activeClassName="chosen" to="/admin"><FontAwesomeIcon icon={faTools} fixedWidth /> <span className="menu-text">Admin Tools</span></NavLink>}
              </div>
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
