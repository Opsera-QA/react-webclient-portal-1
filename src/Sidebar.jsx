
import React, { Component } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWrench, faChartLine, faClipboardList, faLink, faEnvelope, faDownload, faHome, faTools } from '@fortawesome/free-solid-svg-icons'
import './sidebar.css';


class Sidebar extends Component {
  static contextType = AuthContext;

  render() {
    const { authenticated, } = this.context;
    return (
      <div className="d-flex flex-row flex-md-column sidebar">
        <div className="navbar-list">
        <NavLink className="nav-link" activeClassName="chosen" exact to="/"><FontAwesomeIcon icon={faHome} fixedWidth /> Home</NavLink>
        {authenticated && <NavLink className="nav-link" activeClassName="chosen" to="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> Inventory</NavLink>}
        {authenticated && <NavLink className="nav-link" activeClassName="chosen" to="/pipeline"><FontAwesomeIcon icon={faWrench} fixedWidth /> Pipeline</NavLink>}
        {authenticated && <NavLink className="nav-link" activeClassName="chosen" to="/reports"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Analytics</NavLink>}
        {authenticated && <NavLink className="nav-link" activeClassName="chosen" to="/api_connector"><FontAwesomeIcon icon={faLink} fixedWidth /> Connectors</NavLink>}
        {authenticated && <NavLink className="nav-link" activeClassName="chosen" to="/update"><FontAwesomeIcon icon={faDownload} fixedWidth /> Updates</NavLink>}

        {authenticated && <NavLink className="nav-link" activeClassName="chosen" to="/admin"><FontAwesomeIcon icon={faTools} fixedWidth /> Admin Tools</NavLink>}
        {/* { authenticated && <Nav.Link className="nav-link-light" disabled href="/removal"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</Nav.Link>} */}
        {/* { authenticated && <Nav.Link className="nav-link-light" href="/platform"><FontAwesomeIcon icon={faPlus} fixedWidth /> Platform</Nav.Link>} */}
        </div>
      </div>
    );
  }
};

export default Sidebar;
