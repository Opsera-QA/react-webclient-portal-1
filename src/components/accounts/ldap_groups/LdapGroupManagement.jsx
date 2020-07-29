import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link, useParams } from "react-router-dom";
import accountsActions from "components/accounts/accounts-actions.js";
import LdapGroupsTable from "./LdapGroupsTable";
import NewLdapGroupModal from "./NewLdapGroupModal";
import DropdownList from "react-widgets/lib/DropdownList";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";


function LdapGroupManagement() {
  const { id } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ isOpseraUser, setOpseraUser] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ groupList, setGroupList ] = useState([]);
  const [ currentOrganizationEmail, setCurrentOrganizationEmail ] = useState("");
  const [ organizationList, setOrganizationList ] = useState(undefined);
  const [ organization, setOrganization ] = useState();
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {  
    loadData();
  }, []);

  const loadData = async () => {
    await isAdmin();
    // await getOrganizations();
    // await getUsers(userEmail);
  };

  const getUsers = async (userEmail) => {
    if (userEmail != null) {
      const response = await accountsActions.getOrganizationByEmail({ email: userEmail }, getAccessToken);
      console.log(response);
      let organization = response.data;
      setOrganization(organization);
      if (organization != null) {
        setGroupList(organization["groups"]);
      }
    }
  };

  const getOrganizations = async () => {
    const response = await accountsActions.getOrganizations(getAccessToken);
    console.log(response.data);

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

  const isAdmin = async () => {
    const userInfo = await getUserRecord();

    // TODO: Is there a better way to find if a user is Opsera?
    // console.log(JSON.stringify(userInfo.email));
    // setUserEmail(userInfo.email);
    await getUsers(userInfo.email);
    setCurrentOrganizationEmail(userInfo.email);

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
    getUsers(currentOrganizationEmail);
    setShowCreateGroupModal(false);
  };  

  const createUser = () => {
    setShowCreateGroupModal(true);
  };

  const handleOrganizationChange = (selectedOption) => {
    console.log("Setting organization to: " + JSON.stringify(selectedOption));
    setCurrentOrganizationEmail(selectedOption.id);
    getUsers(selectedOption.id);
  };

  return (
    <div> 
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/accounts">Account Management</Link>
          </li>
          <li className="breadcrumb-item active">Groups</li>
        </ol>
      </nav>
      {pageLoading ? <Loading size="sm" /> : null}
      {(!isAdminCheck && !pageLoading) && <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck &&
        <>
          <div className="justify-content-between mb-1 d-flex">
            <h5>Groups Management</h5>
            <div className="d-flex">
              <div className="tableDropdown mr-2">
                {isOpseraUser && organizationList && <DropdownList
                  data={organizationList}
                  value={currentOrganizationEmail}
                  valueField='id'
                  textField='text'
                  placeholder="Select an Organization Account"
                  groupBy={org => org["groupId"]}
                  onChange={handleOrganizationChange}
                />}
              </div>
              <div className="">
                <Button variant="primary" size="sm"
                  onClick={() => { createUser(); }}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Group
                </Button>
              </div>
              <br />
              <br />
            </div>
          </div>

          <div className="full-height">
            {groupList && <LdapGroupsTable data={groupList} />}
          </div>

          {showCreateGroupModal ? <NewLdapGroupModal
            organization={organization}
            showModal={showCreateGroupModal}
            onModalClose={onModalClose} /> : null }
        </>}
    </div>
  );
  

}


export default LdapGroupManagement;