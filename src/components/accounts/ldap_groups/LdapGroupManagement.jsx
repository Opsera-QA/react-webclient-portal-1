import React, {useState, useEffect, useContext} from "react";
import {Button} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import NewLdapGroupModal from "./NewLdapGroupModal";
import DropdownList from "react-widgets/lib/DropdownList";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import {
  getOrganizationByDomain,
  getOrganizationByEmail,
  getOrganizationList
} from "../ldap_organizations/organization-functions";


function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [pageLoading, setPageLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [currentOrganizationDomain, setCurrentOrganizationDomain] = useState("");
  const [organizationList, setOrganizationList] = useState(undefined);
  const [ldapOrganizationData, setLdapOrganizationData] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setPageLoading(true);
    await getRoles();
    setPageLoading(false);
  }

  const getGroupsByEmail = async (email) => {
    let organization = await getOrganizationByEmail(email, getAccessToken);
    setLdapOrganizationData(organization);
    setGroupList(organization["groups"]);
  };

  const getGroupsByDomain = async (ldapDomain) => {
    if (ldapDomain != null) {
      let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
      setLdapOrganizationData(organization);
      setGroupList(organization["groups"]);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap, groups} = user;
    setCurrentUserEmail(user.email);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (orgDomain != null && userRoleAccess.OpseraAdministrator) {
        setCurrentOrganizationDomain(orgDomain);
        await getGroupsByDomain(orgDomain);
      } else if (userRoleAccess.Administrator === true && ldap.domain != null) {
        history.push(`/accounts/${ldap.domain}/groups`);
        setCurrentOrganizationDomain(ldap.domain);
        await getGroupsByDomain(ldap.domain);
      }

      if (userRoleAccess.OpseraAdministrator) {
        const organizationList = await getOrganizationList(getAccessToken);
        setOrganizationList(organizationList);
      }
    }

  };

  const createGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleOrganizationChange = async (selectedOption) => {
    setPageLoading(true)
    history.push(`/accounts/${selectedOption.id}/groups`);
    setCurrentOrganizationDomain(selectedOption.id);
    await getGroupsByDomain(selectedOption.id);
    setPageLoading(false)
  };

  if (!accessRoleData || pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {
    return (
      <div>
        {!pageLoading &&
        <>
          <BreadcrumbTrail destination={"ldapGroupManagement"} />
          <div className="justify-content-between mb-1 d-flex">
            <h5>Groups Management</h5>
            <div className="d-flex">
              <div className="tableDropdown mr-2">
                {accessRoleData.OpseraAdministrator && organizationList && <DropdownList
                  data={organizationList}
                  value={currentOrganizationDomain}
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
            {groupList && <LdapGroupsTable groupData={groupList} orgDomain={orgDomain}/>}
          </div>

          <NewLdapGroupModal loadData={loadData} ldapOrganizationData={ldapOrganizationData} showModal={showCreateGroupModal} currentUserEmail={currentUserEmail} setShowModal={setShowCreateGroupModal}/>
        </>}
      </div>
    );
  }

}


export default LdapGroupManagement;