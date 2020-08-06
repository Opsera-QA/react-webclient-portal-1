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
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";


function LdapGroupManagement() {
  const { id } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ isOpseraUser, setOpseraUser] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ groupList, setGroupList ] = useState([]);
  const [ currentOrganizationEmail, setCurrentOrganizationEmail ] = useState("");
  const [ organizationList, setOrganizationList ] = useState(undefined);
  const [ ldapOrganizationData, setLdapOrganizationData ] = useState();
  const [ orgDomain, setOrgDomain ] = useState("");
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {  
    loadData();
  }, []);

  const loadData = async () => {
    await isAdmin();
  };

  const getUsers = async (ldapDomain) => {
    if (ldapDomain != null) {
        const response = await accountsActions.getOrganizationByEmail({ domain: ldapDomain }, getAccessToken);
        let ldapOrganizationData = response.data;
        setLdapOrganizationData(ldapOrganizationData);

        if (ldapOrganizationData != null)
        {
          setGroupList(ldapOrganizationData["groups"]);
          setOrgDomain(ldapOrganizationData["orgDomain"]);
        }
      }
    };

  const getOrganizations = async () => {
    const response = await accountsActions.getOrganizations(getAccessToken);
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
    setCurrentOrganizationEmail(userInfo.email);

    const { ldap, groups } = userInfo;
    if (ldap && ldap.domain === "opsera.io" && groups.includes("Admin")) { //checking for OpsERA account domain
      setOpseraUser(true);
      setAdminStatus(true);
      await getUsers(ldap.domain);
      await getOrganizations();

    } else {
      setAdminStatus(false);
    }

    setPageLoading(false);
  };

  const onModalClose = () => {
    getUsers(orgDomain);
    setShowCreateGroupModal(false);
  };  

  const createGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleOrganizationChange = async (selectedOption) => {
    setPageLoading(true)
    setCurrentOrganizationEmail(selectedOption.id);
    await getUsers(selectedOption.id);
    setPageLoading(false)
  };

  if (pageLoading) {
    return (<Loading size="sm"/>);
  } else {
    return (
      <div>
        {(!isAdminCheck && !pageLoading) && <ErrorDialog error={"You do not have access to view this page!"}/>}
        {(isAdminCheck && !pageLoading) &&
        <>
          <BreadcrumbTrail destination="ldapGroupManagement" />
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
                        onClick={() => {
                          createGroup(ldapOrganizationData);
                        }}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Group
                </Button>
              </div>
              <br/>
              <br/>
            </div>
          </div>

          <div className="full-height">
            {groupList && <LdapGroupsTable data={groupList} domain={orgDomain}/>}
          </div>

          {showCreateGroupModal ? <NewLdapGroupModal
            ldapOrganizationData={ldapOrganizationData}
            showModal={showCreateGroupModal}
            onModalClose={onModalClose}/> : null}
        </>}
      </div>
    );
  }

}


export default LdapGroupManagement;