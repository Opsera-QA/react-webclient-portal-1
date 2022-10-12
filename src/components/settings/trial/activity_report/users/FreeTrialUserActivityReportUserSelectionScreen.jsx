import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import accountsActions from "components/admin/accounts/accounts-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import FreeTrialUserActivityReportUsersTable
  from "components/settings/trial/activity_report/users/FreeTrialUserActivityReportUsersTable";
import FreeTrialUserActivityReportSubNavigationBar
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportSubNavigationBar";

export default function FreeTrialUserActivityReportUserSelectionScreen() {
  const [freeTrialActivityReportUsers, setFreeTrialActivityReportUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setFreeTrialActivityReportUsers([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setFreeTrialActivityReportUsers([]);
      setIsLoading(true);
      await getFreeTrialUsers();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getFreeTrialUsers = async () => {
    const response = await accountsActions.getFreeTrialActivityReportUsers(
      getAccessToken,
      cancelTokenSource,
    );

    const users = DataParsingHelper.parseArray(response?.data?.data, []);

    if (isMounted?.current === true) {
      setFreeTrialActivityReportUsers([...users]);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialUserActivityReport"}
      navigationTabContainer={<FreeTrialUserActivityReportSubNavigationBar activeTab={"freeTrialUserActivityReport"} />}
    >
      <FreeTrialUserActivityReportUsersTable
        loadData={loadData}
        isLoading={isLoading}
        freeTrialUsers={freeTrialActivityReportUsers}
      />
    </ScreenContainer>
  );
}
