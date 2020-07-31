import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faUserPlus, faUserFriends, faUser } from "@fortawesome/free-solid-svg-icons";


function LdapDashboard() {
  const [administrator, setAdministrator] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getUserRecord } = useContext(AuthContext);

  useEffect(() => {
    isAdmin();
  }, []);


  const isAdmin = async () => {
    setLoading(true);
    const userInfo = await getUserRecord();
    setAdministrator(userInfo.groups.includes("Admin"));    
    setLoading(false);
  };

  if (loading) {
    return (<LoadingDialog />);
  } else if (!administrator) {
    return (<ErrorDialog align="center" error="Access Denied!  Your account does not have privileges to access this tool."/>);
  } else {
    return (
      <>
        
        <div className="max-content-width ml-2 mt-1">
          <h5>User and Account Management</h5>
          <div>Manger organizations, accounts, groups and users from this dashboard.</div>
  
          <Row className="ml-5 mt-5" style={{ fontSize:"1rem" }}>
            <Col xs={12} md={6} lg={4} className="p-2">
              <Link to="/accounts/organizations"><FontAwesomeIcon icon={faSitemap} fixedWidth /> Organizations & Accounts</Link>
            </Col>
            <Col xs={12} md={6} lg={4} className="p-2">
              <Link to="/accounts/groups"><FontAwesomeIcon icon={faUserFriends} fixedWidth /> Groups</Link>
            </Col>   
            <Col xs={12} md={6} lg={4} className="p-2">
              <Link to="/accounts/users"><FontAwesomeIcon icon={faUser} fixedWidth /> Users</Link>
            </Col>
            <Col xs={12} md={6} lg={4} className="p-2">
              <Link to="/accounts/create"><FontAwesomeIcon icon={faUserPlus} fixedWidth /> Customer Onboarding</Link>
            </Col>
          </Row>

        </div>
      </>
    );
  }

  
}

export default LdapDashboard;

