
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
    <div className="d-flex flex-row flex-md-column sidebar">
      <div className="navbar-list">
        <NavLink className="nav-link" activeClassName="chosen" exact to="/"><FontAwesomeIcon icon={faHome} fixedWidth /> Home</NavLink>
        {state.authenticated &&
        <>
          <div className="mt-3 side-nav-header-text">Products</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> Inventory</NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/platform"><FontAwesomeIcon icon={faProjectDiagram} fixedWidth /> Platforms</NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/pipeline"><FontAwesomeIcon icon={faStream} fixedWidth /> Pipelines</NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/analytics"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Analytics</NavLink>
        
          <div className="mt-3 side-nav-header-text">Operations</div>
          <NavLink className="nav-link" activeClassName="chosen" to="/api_connector"><FontAwesomeIcon icon={faLink} fixedWidth /> Connectors</NavLink>
          <NavLink className="nav-link" activeClassName="chosen" to="/update"><FontAwesomeIcon icon={faDownload} fixedWidth /> Updates</NavLink>
          {state.administrator && <NavLink className="nav-link" activeClassName="chosen" to="/admin"><FontAwesomeIcon icon={faTools} fixedWidth /> Admin Tools</NavLink>}
        </>
        }
      </div>
    </div>
  );
}

export default Sidebar;
