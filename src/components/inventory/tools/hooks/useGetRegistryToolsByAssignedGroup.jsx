import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useGetRegistryToolsByAssignedGroup(
  group,
  onErrorFunction,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const [error, setError] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setTools([]);
    setError(undefined);

    if (hasStringValue(group) === true) {
      loadData().catch(() => {});
    }
  }, [group]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getGroupRoleAssignedTools();
    } catch (error) {
      setError(error);

      if (onErrorFunction) {
        onErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getGroupRoleAssignedTools = async () => {
    const response = await toolsActions.getToolsWithGroupAssigned(
      getAccessToken,
      cancelTokenSource,
      group,
    );

    const assignedTools = DataParsingHelper.parseArray(response?.data?.data, []);
    setTools([...assignedTools]);
  };

  return ({
    tools: tools,
    setTools: setTools,
    error: error,
    loadData: loadData,
    isLoading: isLoading,
  });
}
