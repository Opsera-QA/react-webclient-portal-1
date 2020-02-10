
import React, { useContext, useReducer, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream, faChartLine, faClipboardList, faLink, faProjectDiagram, faDownload, faHome, faTools } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

function Sidebar({ hideView }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { authenticated: false, administrator: false, hideSideBar: hideView }
  );

  useEffect(() => {
    const { authenticated, userInfo } = contextType;
    setState({ authenticated: authenticated });
    if (userInfo) {
      setState({ administrator: userInfo.Groups.includes("Admin") });
    }
    setState({
      hideSideBar: hideView
    });

  }, [contextType, hideView]); 

  const handleToggleMenuClick = () => {
    setState({
      hideSideBar: !state.hideSideBar
    });
  };


  return (
    <>
      {state.authenticated &&
        <>
          <div className="d-block d-md-none pt-1 mr-2">
            <Button variant="outline-primary" onClick={handleToggleMenuClick}>
              <span className="dark-blue-text"><i
                className="fas fa-bars fa-1x"></i></span>
            </Button>
          </div>

          <div className={"w-20 pt-1 " + (state.hideSideBar ? "d-none d-md-block" : "d-block")}>
            <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
              <div className="sidebar-menu">
      
                <div className="mt-3 mb-1 sub-header">Products</div>
                <NavLink className="nav-link" activeClassName="chosen" exact to="/"><FontAwesomeIcon icon={faHome} fixedWidth /> <span className="menu-text">Dashboard</span><div className="caret"></div></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> <span className="menu-text">Inventory</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/platform"><FontAwesomeIcon icon={faProjectDiagram} fixedWidth /> <span className="menu-text">Platforms</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/pipeline"><FontAwesomeIcon icon={faStream} fixedWidth /> <span className="menu-text">Pipelines</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/analytics"><FontAwesomeIcon icon={faChartLine} fixedWidth /> <span className="menu-text">Analytics</span></NavLink>
        
                <div className="mt-3 mb-1 sub-header">Operations</div>
                <NavLink className="nav-link" activeClassName="chosen" to="/api_connector"><FontAwesomeIcon icon={faLink} fixedWidth /> <span className="menu-text">Connectors</span></NavLink>
                <NavLink className="nav-link" activeClassName="chosen" to="/update"><FontAwesomeIcon icon={faDownload} fixedWidth /> <span className="menu-text">Updates</span></NavLink>
                {state.administrator && <NavLink className="nav-link" activeClassName="chosen" to="/admin"><FontAwesomeIcon icon={faTools} fixedWidth /> <span className="menu-text">Admin Tools</span></NavLink>}
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
