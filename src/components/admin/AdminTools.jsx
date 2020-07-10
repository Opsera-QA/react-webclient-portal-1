import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHeartbeat, faTimes, faUserCircle, faLink, faChartBar, faWrench, faTags, faStream, faUsers } from "@fortawesome/free-solid-svg-icons";


function AdminTools(props) {
  const [administrator, setAdministrator] = useState(false);
  const { getUserRecord } = useContext(AuthContext);

  useEffect(() => {
    isAdmin();
  }, []);

  const isAdmin = async () => {
    const userInfo = await getUserRecord();
    console.log(userInfo);
    setAdministrator(userInfo.groups.includes("Admin"));
    if (!userInfo.groups.includes("Admin")) {
      //move out
      this.props.history.push("/");
    } else {
      //do nothing
    }
  };

  return (
    <>
      {
        administrator &&
          <div className="max-content-width">
            <h4>Administration Tools</h4>
            <div>Listed below are administration tools for the platform.</div>

            <Row className="ml-5 mt-5" style={{ fontSize:"1rem" }}>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/systemstatus"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> System Status</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/customerstatus"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> Customer System Status</Link>
              </Col>   
              {/* <Col xs={12} md={6} lg={4} className="p-2">
               <Link to="/admin/health"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> System Health Check</Link>
               </Col> */}                                    
           
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/reports"><FontAwesomeIcon icon={faLink} fixedWidth /> Reports</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/analytics/reports-registration"><FontAwesomeIcon icon={faChartBar} fixedWidth /> Reports Registration</Link>
              </Col>              

              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/manage_systems"><FontAwesomeIcon icon={faEdit} fixedWidth /> System Management</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/registered_users"><FontAwesomeIcon icon={faUserCircle} fixedWidth /> Registered Users</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/api_demo"><FontAwesomeIcon icon={faLink} fixedWidth /> API Test</Link>
              </Col>                          
              
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/tool-configurations"><FontAwesomeIcon icon={faWrench} fixedWidth /> Tool Configurations</Link>
              </Col>   
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/delete"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</Link>
              </Col>  
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/tags"><FontAwesomeIcon icon={faTags} fixedWidth /> Tags</Link>
              </Col> 
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/template-editor"><FontAwesomeIcon icon={faStream} fixedWidth /> Template Editor</Link>
              </Col>  
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/ldap"><FontAwesomeIcon icon={faUsers} fixedWidth /> LDAP</Link>
              </Col>                                                  
            </Row>
          </div>
      }
    </>
  );
}

AdminTools.propTypes = {

};


export default AdminTools;
