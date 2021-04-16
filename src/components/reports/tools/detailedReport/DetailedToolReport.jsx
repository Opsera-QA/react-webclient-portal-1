import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import DetailedToolReportTable from "components/reports/tools/detailedReport/DetailedToolReportTable";
import WideScreenContainer from "components/common/panels/general/WideScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {useHistory} from "react-router-dom";
import {faAnalytics, faDraftingCompass, faTags, faTools} from "@fortawesome/pro-light-svg-icons";


function DetailedToolReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [fullToolRegistryList, setFullToolRegistryList] = useState(undefined);
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

      const toolResponse = await toolsActions.getFullRoleLimitedToolRegistryList(getAccessToken);
      const tools = toolResponse?.data?.data;

      if (Array.isArray(tools) && tools.length > 0) {
        setFullToolRegistryList(tools);
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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <WideScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"detailedToolReport"}
      navigationTabContainer={getNavigationTabContainer()}
      pageDescription={"View a detailed report of all tools used"}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator}
    >
      <DetailedToolReportTable isLoading={isLoading} data={fullToolRegistryList} />
    </WideScreenContainer>
  );
}

export default DetailedToolReport;

