import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faUserPlus, faUserFriends, faUser } from "@fortawesome/free-solid-svg-icons";


function LdapCustomerOnboard() {
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
    return (<ErrorDialog align="center" error="Access Denied!  Your account does not have privileges to access this tool."></ErrorDialog>);
  } else {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className="breadcrumb-item">
              <Link to="/accounts">Account Management</Link>
            </li>
            <li className="breadcrumb-item active">New Account</li>
          </ol>
        </nav>


        <div className="max-content-width ml-2 mt-1">
          <h5>New Customer Onboarding</h5>
          <div>Please complete the form below in order to create the LDAP data needed to support a new customer Organization and Account.</div>

          <div className="mt-4">Form data here... OC-357</div>

        </div>
      </>
    );
  }


}

export default LdapCustomerOnboard;