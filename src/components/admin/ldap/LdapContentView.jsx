import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ErrorDialog from "../../common/error";
import LoadingDialog from "../../common/loading";
import { Link } from "react-router-dom";


function LdapContentView() {
  const { view } = useParams();
  const [administrator, setAdministrator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentView, setContentView] = useState("");
  const { getUserRecord } = useContext(AuthContext);

  useEffect(() => {
    isAdmin();

    if(view) { //captures the view value passed into the URL to determine what compotnent below to show
      setContentView(view);      
    }
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
              <Link to="/admin">Admin</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/ldap">LDAP</Link>
            </li>
            <li className="breadcrumb-item active upper-case-first">{contentView}</li> 
          </ol>
        </nav> 

        <div className="max-content-width ml-2 mt-1">
          <h5>LDAP Viewer</h5>
          <div>View organizations, accounts, groups and users from this dashboard.</div>
  

          <div className="ml-2 mt-4">
         TODO: This should provide multiple views into the LDAP data.  Starting from ORG and working down.  But it should support URL paramaters to default the view to: organization, account, user or group.
  
            <br />
        The filter paramater passed in, should be parsed and used to determine what view to support: (no value = organizations) account: show accounts, groups: groups, users, etc..
            <div>Current View: {contentView}</div>
          </div>
        </div>
      </>
    );
  }

  
}

export default LdapContentView;

