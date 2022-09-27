import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { toolIdentifierActions } from "components/admin/tools/identifiers/toolIdentifier.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useGetToolIdentifiers(
  status,
  enabledInToolRegistry
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setToolIdentifiers([]);
    loadData().catch(() => {});
  }, [status, enabledInToolRegistry]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getToolIdentifiers();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getToolIdentifiers = async () => {
    const response = await toolIdentifierActions.getToolIdentifiersV2(
      getAccessToken,
      cancelTokenSource,
      status,
      enabledInToolRegistry,
    );

    const identifiers = DataParsingHelper.parseArray(response?.data?.data, []);

    if (identifiers) {
      setToolIdentifiers([...identifiers]);
    }
  };

  return ({
    isLoading: isLoading,
    error: error,
    loadData: loadData,
    toolIdentifiers: toolIdentifiers,
    setToolIdentifiers: setToolIdentifiers,
  });
}
