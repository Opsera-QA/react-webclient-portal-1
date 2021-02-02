import React, { useContext, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import {AuthContext} from "../../contexts/AuthContext";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import ScreenContainer from "../common/panels/general/ScreenContainer";
import BreadcrumbPageLink from "../common/links/BreadcrumbPageLink";
import NavigationTabContainer from "../common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "../common/tabs/navigation/NavigationTab";

function Reports() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

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
      setIsLoading(false)
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };
  //
  // const getNavigationTabContainer = () => {
  //   return (
  //     <NavigationTabContainer>
  //       <NavigationTab activeTab={activeTab} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} />
  //       <NavigationTab activeTab={activeTab} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"tool"} />
  //       <NavigationTab activeTab={activeTab} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tag"} />
  //       <NavigationTab activeTab={activeTab} tabText={"Pipeline Reports"} handleTabClick={handleTabClick} tabName={"pipeline"} />
  //     </NavigationTabContainer>
  //   );
  // };

  return (
    <ScreenContainer
      // navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"reports"}
      pageDescription={"View reports from this dashboard."}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator}
      isLoading={isLoading}
    >
      <Row className="ml-3">
        <BreadcrumbPageLink breadcrumbDestination={"toolReports"}/>
        <BreadcrumbPageLink breadcrumbDestination={"tagReports"}/>
        <BreadcrumbPageLink breadcrumbDestination={"pipelineReports"}/>
      </Row>
    </ScreenContainer>
  );
}

export default Reports;

