import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import {useParams} from "react-router-dom";
import {faToolbox, faTools} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import ToolCategoryTable from "components/admin/tools/tool_category/ToolCategoryTable";
import ToolIdentifierTable from "components/admin/tools/tool_identifier/ToolIdentifierTable";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";

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

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faToolbox} tabName={"types"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Category"}/>
        <NavigationTab icon={faTools} tabName={"identifiers"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Tools"}/>
      </NavigationTabContainer>
    );
  }

  return (
    <ScreenContainer
      accessDenied={!accessRoleData?.OpseraAdministrator}
      isLoading={!accessRoleData}
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"toolManagement"}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}

export default ToolManagement;