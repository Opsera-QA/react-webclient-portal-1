import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link, useParams } from "react-router-dom";
import accountsActions from "components/accounts/accounts-actions.js";
import TextField from "components/common/form_fields/text-field";

import LdapGroupMembership from "./LdapGroupMembership.jsx";
import LdapGroupManage from "./LdapGroupManage.jsx";
import LdapGroupSettings from "./LdapGroupSettings.jsx";

function LdapGroupDetails() {
  const { name } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [isAdminCheck, setAdminStatus] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [groupData, setGroupData] = useState([]);
  const [organization, setOrganization] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await isAdmin();
  };

  const getGroup = async (organization) => {
    let payload = {
      domain: organization.orgDomain,
      groupName: name,
    };
    const response = await accountsActions.getGroup(payload, getAccessToken);
    console.log(response.data);
    setGroupData(response.data);
  };

  const getUsers = async (userEmail) => {
    if (userEmail != null) {
      const response = await accountsActions.getOrganizationByEmail({ email: userEmail }, getAccessToken);
      let organization = response.data;
      setOrganization(organization);
      await getGroup(organization);
    }
  };

  const isAdmin = async () => {
    const userInfo = await getUserRecord();

    // TODO: Is there a better way to find if a user is Opsera?
    await getUsers(userInfo.email);

    if (!userInfo.groups.includes("Admin")) {
      //move out
      setAdminStatus(false);
    } else {
      //do nothing
      setAdminStatus(true);
    }
    setPageLoading(false);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/accounts">Account Management</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/accounts/groups">Groups</Link>
          </li>
          <li className="breadcrumb-item active">Group Details</li>
        </ol>
      </nav>
      {pageLoading ? <Loading size="sm" /> : null}
      {!isAdminCheck && !pageLoading && <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck && (
        <>
          <div className="content-container content-card-1 max-content-width ml-2">
            <div className="pt-2 pl-2 content-block-header">
              <h5>Group Details [{groupData.name}]</h5>
            </div>

            <div>
              <div>
                <div className="scroll-y pt-3 px-3">
                  <div className="mb-3 flat-top-content-block p-3">
                    <div className="mb-2 text-muted">{/*TODO: Implement delete when needed*/}</div>

                    <div className="pt-1">
                      <hr />
                    </div>

                    <Row>
                      <Col>
                        <ul className="list-group my-1">
                          <li className="list-group-item">
                            <span className="pr-2 text-muted">Name: </span>
                            {groupData.name}
                          </li>
                          <li className="list-group-item">
                            <span className="pr-2 text-muted">External Sync Group: </span>
                            {groupData.externalSyncGroup}
                          </li>
                        </ul>
                      </Col>
                      <Col>
                        <ul className="list-group my-1">
                          <li className="list-group-item">
                            <span className="pr-2 text-muted">Config Group Type: </span>
                            {groupData.configGroupType}
                          </li>
                          <li className="list-group-item">
                            <span className="pr-1 text-muted">State: </span>
                            {groupData.isSync ? "Active" : "Disabled"}
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="default-custom-tabs p-3">
                  <Tabs defaultActiveKey="Membership" className="default-custom-tabs" id="uncontrolled-tab-example">
                    <Tab eventKey="Membership" title="Membership">
                      <div className="tabbed-content-block pt-4 pb-4">
                        <LdapGroupMembership groupData={groupData} organization={organization} />
                      </div>
                    </Tab>
                    <Tab eventKey="Manage" title="Manage">
                      <div className="tabbed-content-block pt-4 pb-4">
                        <LdapGroupManage groupData={groupData} organization={organization} />
                      </div>
                    </Tab>
                    <Tab eventKey="Settings" title="Settings">
                      <div className="tabbed-content-block pt-4 pb-4">
                        <LdapGroupSettings
                          groupData={groupData}
                          organization={organization}
                          onGroupUpdate={(data) => setGroupData(data)}
                        />
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="content-block-footer" />
          </div>
        </>
      )}
    </div>
  );
}

export default LdapGroupDetails;
