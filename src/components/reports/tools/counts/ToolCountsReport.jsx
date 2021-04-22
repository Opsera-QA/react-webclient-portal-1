import React, { useContext, useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolCountTable from "components/reports/tools/counts/ToolCountTable";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faTags, faTools} from "@fortawesome/pro-light-svg-icons";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import {useHistory} from "react-router-dom";

function ToolCountsReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [toolCounts, setToolCounts] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      const toolCountResponse = await toolsActions.getToolCounts(getAccessToken);

      if (toolCountResponse?.data) {
        setToolCounts(toolCountResponse.data);
      }
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    history.push(`/reports/${tabSelection}`);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={"tools"} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} icon={faAnalytics} />
        <NavigationTab activeTab={"tools"} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"tools"} icon={faTools} />
        <NavigationTab activeTab={"tools"} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tags"} icon={faTags} />
        {/* <NavigationTab activeTab={"tools"} tabText={"Pipeline Reports"} handleTabClick={handleTabClick} tabName={"pipelines"} icon={faDraftingCompass} /> */}
      </NavigationTabContainer>
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"toolCountsReport"}
      pageDescription={"View Tool usage counts"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={getNavigationTabContainer()}
    >
      <ToolCountTable isLoading={isLoading} data={toolCounts} loadData={loadData} />
    </ScreenContainer>
  );
}

export default ToolCountsReport;

