import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link, useParams } from "react-router-dom";
import accountsActions from "../accounts-actions";
import LdapUsersTable from "./LdapUsersTable";
import NewLdapUserModal from "./NewLdapUserModal";
import DropdownList from "react-widgets/lib/DropdownList";
import { capitalizeFirstLetter } from "../../common/helpers/string-helpers";


function LdapUserManagement() {
  const { id } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ isOpseraUser, setOpseraUser] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ userList, setUserList ] = useState([]);
  const [ organizationList, setOrganizationList ] = useState(undefined);
  const [ organizationName, setOrganizationName ] = useState(id);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  useEffect(() => {  
    isAdmin();
    getUsers(id);
    getOrganizations(organizationName);
  }, [organizationName]);

  const getUsers = async (id) => {
    const response = await accountsActions.getOrganizationByName(id, getAccessToken);
    console.log("GetUser response: " + JSON.stringify(response.data));
    // TODO: Implement
    // setUserList(response.data["users"]);
  };

  const getOrganizations = async () => {
    const response = await accountsActions.getOrganizations(getAccessToken);
    // console.log(JSON.stringify(response.data));

    if (response.data)
    {
      let parsedOrganizationNames = [];
      response.data.map(organization =>
      {
        organization["orgAccounts"].map(orgAccount => {
          // TODO: Remove when getUsers call works
          // if (orgAccount["name"] === id) {
          // setUserList(organization["orgAccounts"]);
          console.log("orgAccounts: " + JSON.stringify(orgAccount));
          // }

          parsedOrganizationNames.push({ text: orgAccount["name"], groupId: organization["name"], id: orgAccount["name"] });
        });
      });
      console.log("Parsed Organization Names: " + JSON.stringify(parsedOrganizationNames));
      setOrganizationList(parsedOrganizationNames);
    }
  };

  const isAdmin = async () => {
    const userInfo = await getUserRecord();

    // TODO: Is there a better way to find if a user is Opsera?
    // console.log(JSON.stringify(userInfo.email));
    if (userInfo.email.endsWith("opsera.io")) {
      setOpseraUser(true);
      await getOrganizations();
    }

    if (!userInfo.groups.includes("Admin")) {
      //move out
      setAdminStatus(false);
    } else {
      //do nothing
      setAdminStatus(true);
    }
    setPageLoading(false);
  };

  const onModalClose = () => {
    getUsers();
    setShowCreateUserModal(false);
  };  

  const createUser = () => {
    setShowCreateUserModal(true);
  };

  const handleOrganizationChange = (selectedOption) => {
    console.log("Setting organization to: " + JSON.stringify(selectedOption));
    // TODO: Should we just history.push?
    setOrganizationName(selectedOption.id);
  };

  return (
    <div> 
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/accounts">Account Management</Link>
          </li>
          <li className="breadcrumb-item active">Users</li>
        </ol>
      </nav>
      {pageLoading ? <Loading size="sm" /> : null}
      {(!isAdminCheck && !pageLoading) && <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck &&
        <>
          <div className="justify-content-between mb-1 d-flex">
            <h5>Users Management</h5>
            <div className="d-flex">
              <div className="tableDropdown mr-2">
                {isOpseraUser && organizationList && <DropdownList
                  data={organizationList}
                  value={organizationName}
                  valueField='id'
                  textField='text'
                  placeholder="Select an Organization Account"
                  groupBy={org => org["groupId"]}
                  onChange={handleOrganizationChange}
                />}
              </div>
              <div className="mt-1">
                <Button variant="primary" size="sm"
                  onClick={() => { createUser(); }}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>New User
                </Button>
              </div>
              <br />
            </div>
          </div>

          <div className="full-height">
            {console.log("LdapUsersList: " + JSON.stringify(userList))}
            {userList && <LdapUsersTable data={userList} />}
          </div>

          {showCreateUserModal ? <NewLdapUserModal
            showModal={showCreateUserModal}
            onModalClose={onModalClose} /> : null }
        </>}
    </div>
  );
  

}


export default LdapUserManagement;