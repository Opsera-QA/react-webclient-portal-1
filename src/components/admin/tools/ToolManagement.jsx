import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import ToolTypeTable from "./tool_type/ToolTypeTable";

import ToolIdentifierTable from "./tool_identifier/ToolIdentifierTable";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import toolTypeActions from "./tool-management-actions";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {useParams} from "react-router-dom";
import {getLoadingErrorDialog} from "../../common/toasts/toasts";
import CustomTab from "../../common/tabs/CustomTab";
import {faServer, faToolbox, faTools, faWrench} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "../../common/tabs/CustomTabContainer";

function ToolManagement() {
  const {tabKey} = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolIdentifierList, setToolIdentifierList] = useState([]);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("types");

  useEffect(() => {
    loadData();
  }, []);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const loadData = async () => {
    setIsLoading(true);
    if (tabKey === "identifiers") {
      setActiveTab("identifiers");
    }

    await getRoles();
    setIsLoading(false);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess && userRoleAccess.OpseraAdministrator) {
      setAccessRoleData(userRoleAccess);
      await getToolTypes();
      await getToolIdentifiers();
    }
  };

  const getToolTypes = async () => {
    try {
      const tool_type = await toolTypeActions.getToolTypes(getAccessToken);
      setToolTypeList(tool_type.data);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  const getToolIdentifiers = async () => {
    try {
      const tool_identifier = await toolTypeActions.getToolIdentifiers(getAccessToken);
      setToolIdentifierList(tool_identifier.data);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {
    return (
      <div>
        <BreadcrumbTrail destination="toolManagement"/>
        {showToast && toast}
        <h5>Tool Management</h5>
        <CustomTabContainer styling="alternate-tabs">
          <CustomTab icon={faToolbox} tabName={"types"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Category"} />
          <CustomTab icon={faTools} tabName={"identifiers"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tools"} />
        </CustomTabContainer>
        <div className="content-block-collapse p-3">
          <ToolManagementTabView activeTab={activeTab} loadData={loadData} isLoading={isLoading} toolTypeList={toolTypeList} toolIdentifierList={toolIdentifierList} />
        </div>
      </div>
    );
  }
}

function ToolManagementTabView({ activeTab, loadData, isLoading, toolTypeList, toolIdentifierList }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);

  if (activeTab) {
    switch (activeTab) {
      case "types":
        return <ToolTypeTable loadData={loadData} isLoading={isLoading} data={toolTypeList}/>;
      case "identifiers":
        return <ToolIdentifierTable loadData={loadData} isLoading={isLoading} data={toolIdentifierList}/>;
      default:
        return null;
    }
  }
}


export default ToolManagement;