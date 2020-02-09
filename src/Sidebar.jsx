
import React, { useContext, useReducer, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream, faChartLine, faClipboardList, faLink, faProjectDiagram, faDownload, faHome, faTools } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

function Sidebar() {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { authenticated: false, administrator: false }
  );

  useEffect(() => {
    const { authenticated, userInfo } = contextType;
    setState({ authenticated: authenticated });
    if (userInfo) {
      setState({ administrator: userInfo.Groups.includes("Admin") });
    }
    
  }, [contextType]); 

  return (
    <div className="sidebar-container sticky-top pb-5 pt-1 pl-1">
      <div className="sidebar-menu">
        {state.authenticated &&
        <>
          <div className="mt-3 sub-header">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" exact to="/"><FontAwesomeIcon icon={faHome} fixedWidth /> <span className="menu-text">Dashboard</span><div className="caret"></div></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> <span className="menu-text">Inventory</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform"><FontAwesomeIcon icon={faProjectDiagram} fixedWidth /> <span className="menu-text">Platforms</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/pipeline"><FontAwesomeIcon icon={faStream} fixedWidth /> <span className="menu-text">Pipelines</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics"><FontAwesomeIcon icon={faChartLine} fixedWidth /> <span className="menu-text">Analytics</span></NavLink>
        
          <div className="mt-3 sub-header">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/api_connector"><FontAwesomeIcon icon={faLink} fixedWidth /> <span className="menu-text">Connectors</span></NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/update"><FontAwesomeIcon icon={faDownload} fixedWidth /> <span className="menu-text">Updates</span></NavLink>
          {state.administrator && <NavLink className="nav-link" activeClassName="chosen" to="/admin"><FontAwesomeIcon icon={faTools} fixedWidth /> <span className="menu-text">Admin Tools</span></NavLink>}
        </>
        }
      </div>
    </div>
  );
}

export default Sidebar;
