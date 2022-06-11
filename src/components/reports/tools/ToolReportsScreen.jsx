import React, {useContext, useState, useEffect, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import ToolReportPageLinkCards from "components/reports/tools/ToolReportPageLinkCards";

function ToolReportsScreen() {
  const { getAccessRoleData } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
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
    const userRoleAccess = await getAccessRoleData();
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"toolReports"} />}
      breadcrumbDestination={"toolReports"}
      pageDescription={"View reports from this dashboard."}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      isLoading={isLoading}
    >
      <ToolReportPageLinkCards accessRoleData={accessRoleData} />
    </ScreenContainer>
  );
}

export default ToolReportsScreen;

