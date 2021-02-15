import React, {useState, useEffect, useContext, useRef} from "react";
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
import axios from "axios";

function ToolManagement() {
  const toastContext = useContext(DialogToastContext);
  const {tabKey} = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolIdentifierList, setToolIdentifierList] = useState([]);
  const [activeTab, setActiveTab] = useState(tabKey === "identifiers" ? "identifiers" : "types");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const loadData = async (cancelSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    finally {
     if (isMounted?.current === true) {
       setIsLoading(false);
     }
    }
  };

  const getRoles = async (cancelSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getToolTypes(cancelSource);
        await getToolIdentifiers(cancelSource);
      }
    }
  };

  const getToolTypes = async (cancelSource) => {
    try {
      const toolTypeResponse = await toolManagementActions.getToolTypesV2(getAccessToken, cancelSource);

      if (isMounted?.current === true) {
        setToolTypeList(toolTypeResponse?.data);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const getToolIdentifiers = async (cancelSource) => {
    try {
      const toolIdentifierResponse = await toolManagementActions.getToolIdentifiersV2(getAccessToken, cancelSource);

      if (isMounted?.current === true) {
        setToolIdentifierList(toolIdentifierResponse?.data);
      }
    } catch (error) {

      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
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