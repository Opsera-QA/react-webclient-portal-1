import React, {useContext, useState, useEffect, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ToolReports from "components/reports/tools/ToolReports";
import TagReports from "components/reports/tags/TagReports";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import UserReports from "components/reports/users/UserReports";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import ReportsHelpDocumentation from "../common/help/documentation/reports/ReportsHelpDocumentation";

function Reports() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

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
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getAllReports = () => {
    return (
      <div>
        <TagReports />
        <ToolReports />
        <UserReports />
        {/*TODO: Uncomment when Pipeline Report is added*/}
        {/*<PipelineReports />*/}
      </div>
    );
  };

  const getHelpComponent = () => {
      return (<ReportsHelpDocumentation/>);
  };

  return (
    <ScreenContainer
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"all"} />}
      breadcrumbDestination={"reports"}
      pageDescription={"View all Tool, Tag and User reports from this dashboard."}
      helpComponent={getHelpComponent()}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      isLoading={isLoading}
    >
      {getAllReports()}
    </ScreenContainer>
  );
}

export default Reports;

