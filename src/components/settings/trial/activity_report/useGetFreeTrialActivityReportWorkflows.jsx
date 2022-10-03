import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { workspaceActions } from "components/workspace/workspace.actions";

export default function useGetFreeTrialActivityReportWorkflows(handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(false);
  const [activityReportWorkflows, setActivityReportWorkflows] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getActiveSsoUsers();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveSsoUsers = async () => {
    const response = await workspaceActions.getFreeTrialUserActivityReport(
      getAccessToken,
      cancelTokenSource,
    );

    const workflows = DataParsingHelper.parseArray(response?.data?.data, []);

    if (workflows) {
      setActivityReportWorkflows([...workflows]);
    }
  };

  return ({
    activityReportWorkflows: activityReportWorkflows,
    setActivityReportWorkflows: setActivityReportWorkflows,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
