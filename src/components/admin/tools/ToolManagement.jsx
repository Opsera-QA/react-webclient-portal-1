import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import LoadingDialog from "components/common/status_notifications/loading";
import {useParams} from "react-router-dom";
import {faToolbox, faTools} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import ToolCategoryTable from "components/admin/tools/tool_category/ToolCategoryTable";
import ToolIdentifierTable from "components/admin/tools/tool_identifier/ToolIdentifierTable";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";

function ToolManagement() {
  const toastContext = useContext(DialogToastContext);
  const {tabKey} = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolIdentifierList, setToolIdentifierList] = useState([]);
  const [activeTab, setActiveTab] = useState(tabKey === "identifiers" ? "identifiers" : "types");

  useEffect(() => {
    loadData();
  }, []);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const loadData = async () => {
    setIsLoading(true);
    await getRoles();
    setIsLoading(false);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getToolTypes();
        await getToolIdentifiers();
      }
    }
  };

  const getToolTypes = async () => {
    try {
      const toolTypeResponse = await toolManagementActions.getToolTypes(getAccessToken);
      setToolTypeList(toolTypeResponse?.data);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
  };

  const getToolIdentifiers = async () => {
    try {
      const toolIdentifierResponse = await toolManagementActions.getToolIdentifiers(getAccessToken);
      setToolIdentifierList(toolIdentifierResponse?.data);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "types":
        return <ToolCategoryTable loadData={loadData} isLoading={isLoading} data={toolTypeList}/>;
      case "identifiers":
        return <ToolIdentifierTable loadData={loadData} isLoading={isLoading} data={toolIdentifierList}/>;
      default:
        return null;
    }
  }

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling="alternate-tabs">
        <CustomTab icon={faToolbox} tabName={"types"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Category"}/>
        <CustomTab icon={faTools} tabName={"identifiers"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Tools"}/>
      </CustomTabContainer>
    );
  }

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      accessDenied={!isLoading && !accessRoleData.OpseraAdministrator}
      isLoading={isLoading}
      breadcrumbDestination={"toolManagement"}
    >
      <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
    </ScreenContainer>
  );
}

export default ToolManagement;