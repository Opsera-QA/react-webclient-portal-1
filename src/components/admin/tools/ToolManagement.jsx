import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";

import ToolTypeTable from "./tool_type/ToolTypeTable";

import ToolIdentifierTable from "./tool_identifier/ToolIdentifierTable";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import toolTypeActions from "./tool-management-actions";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {useParams} from "react-router-dom";

function ToolManagement() {
  const {tabKey} = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolIdentifierList, setToolIdentifierList] = useState([]);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await getRoles();
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess.OpseraAdministrator) {
      setAccessRoleData(userRoleAccess);
      await getToolTypes();
      await getToolIdentifiers();
    }
    setPageLoading(false);
  };

  const getToolTypes = async () => {
    setPageLoading(true)
    try {
      const tool_type = await toolTypeActions.getToolTypes(getAccessToken);
      setToolTypeList(tool_type.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getToolIdentifiers = async () => {
    try {
      const tool_identifier = await toolTypeActions.getToolIdentifiers(getAccessToken);
      setToolIdentifierList(tool_identifier.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!accessRoleData || pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {
    return (
      <div>
        <BreadcrumbTrail destination="toolManagement"/>

        <h5>Tool Management</h5>

        <div className="default-custom-tabs">
          <Tabs defaultActiveKey={tabKey != null && tabKey === "identifiers" ? tabKey : "types"} className="default-custom-tabs" id="uncontrolled-tab-example">
            <Tab eventKey="types" title="Tool Type">
              <div className="tabbed-content-block p-3">
                <ToolTypeTable loadData={loadData} data={toolTypeList}/>
              </div>
            </Tab>

            <Tab eventKey="identifiers" title="Tool Identifier">
              <div className="tabbed-content-block">
                  <ToolIdentifierTable loadData={loadData} data={toolIdentifierList}/>
              </div>
            </Tab>
          </Tabs>
        </div>

      </div>
    );
  }

}


export default ToolManagement;