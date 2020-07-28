import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import ErrorDialog from "../../common/error";
import LoadingDialog from "../../common/loading";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faUserPlus, faUserFriends, faUser } from "@fortawesome/free-solid-svg-icons";
import LdapCustomerOnboardEditorPanel from "./LdapCustomerOnboardEditorPanel";


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

        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header"><h5>New Customer Onboarding</h5></div>
          <div className="scroll-y p-3">
            <h6 className="text-center mb-3">Please complete the form below in order to create the LDAP data needed to support a new customer Organization and Account.</h6>
            <LdapCustomerOnboardEditorPanel />
          </div>
          <div className="content-block-footer" />
        </div>
      </>
    );
  }


}

export default LdapCustomerOnboard;