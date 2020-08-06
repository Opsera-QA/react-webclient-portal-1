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
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import LoadingDialog from "components/common/loading";
import AccessDeniedDialog from "../../common/accessDeniedInfo";


function LdapUserManagement() {
  const { id } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ isOpseraUser, setOpseraUser] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ userList, setUserList ] = useState([]);
  const [ currentOrganizationEmail, setCurrentOrganizationEmail ] = useState("");
  const [ organizationList, setOrganizationList ] = useState(undefined);
  const [ organization, setOrganization ] = useState();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  useEffect(() => {  
    loadData();
  }, []);

  const loadData = async () => {
    await getRoles();
    // await getOrganizations();
    // await getUsers(userEmail);
  };

  const getUsers = async (userEmail) => {
    if (userEmail != null) {
      const response = await accountsActions.getOrganizationByEmail({ email: userEmail }, getAccessToken);

      let organization = response.data;
      // console.log("Organization name: " + organization.name);
      setOrganization(organization);
      // console.log("GetUser response: " + JSON.stringify(response.data));

      if (organization != null) {
        setUserList(organization["users"]);
      }
      else {
        setUserList([]);
      }
    }
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
          parsedOrganizationNames.push({ text: orgAccount["name"], groupId: organization["name"], id: organization["orgOwnerEmail"] });
        });
      });
      // console.log("Parsed Organization Names: " + JSON.stringify(parsedOrganizationNames));
      setOrganizationList(parsedOrganizationNames);
    }
  };

  const getRoles = async () => {
    setPageLoading(true)
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }

    setCurrentOrganizationEmail(user.email);
    await getUsers(user.email);

    if (userRoleAccess.OpseraAdministrator) {
      await getOrganizations();
    }
    setPageLoading(false)
  };

  /*
    const isAdmin = async () => {
      const userInfo = await getUserRecord();

      // TODO: Is there a better way to find if a user is Opsera?
      // console.log(JSON.stringify(userInfo.email));
      // setUserEmail(userInfo.email);
      await getUsers(userInfo.email);
      setCurrentOrganizationEmail(userInfo.email);

      console.log(userInfo);

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
    };*/

  const onModalClose = () => {
    getUsers(currentOrganizationEmail);
    setShowCreateUserModal(false);
  };  

  const createUser = () => {
    setShowCreateUserModal(true);
  };

  const handleOrganizationChange = (selectedOption) => {
    console.log("Setting organization to: " + JSON.stringify(selectedOption));
    setCurrentOrganizationEmail(selectedOption.id);
    getUsers(selectedOption.id);
  };

  if (!accessRoleData || pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <div>
        <BreadcrumbTrail destination="ldapUserManagement"/>

        <div className="justify-content-between mb-1 d-flex">
          <h5>Users Management</h5>
          <div className="d-flex">
            <div className="tableDropdown mr-2">
              {accessRoleData.OpseraAdministrator && organizationList && <DropdownList
                data={organizationList}
                value={currentOrganizationEmail}
                filter="contains"
                valueField='id'
                textField='text'
                placeholder="Select an Organization Account"
                groupBy={org => org["groupId"]}
                onChange={handleOrganizationChange}
              />}
            </div>
            <div className="mt-1">
              <Button variant="primary" size="sm"
                      onClick={() => {
                        createUser();
                      }}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/>New User
              </Button>
            </div>
            <br/>
          </div>
        </div>

        <div className="full-height">
          {console.log("LdapUsersList: " + JSON.stringify(userList))}
          {userList && <LdapUsersTable data={userList}/>}
        </div>

        {showCreateUserModal ? <NewLdapUserModal
          organizationName={organization.name}
          showModal={showCreateUserModal}
          onModalClose={onModalClose}/> : null}
      </div>
    );
  }

}


export default LdapUserManagement;