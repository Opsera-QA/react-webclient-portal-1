import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useToolIdentifierActions from "hooks/tool_identifiers/useToolIdentifierActions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export default function useGetExternalApiIntegratorEndpointById(
  endpointId,
  handleErrorFunction,
) {
  const [endpoint, setEndpoint] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const toolIdentifierActions = useToolIdentifierActions();

  useEffect(() => {
    setEndpoint(undefined);

    if (isMongoDbId(endpointId) === true && loadData) {
      loadData(getExternalApiIntegratorEndpointById, handleErrorFunction).catch(() => {});
    }
  }, [identifier]);

  const getExternalApiIntegratorEndpointById = async () => {
    if (hasStringValue(identifier) !== true) {
      return;
    }

    const response = await toolIdentifierActions.getToolIdentifierByIdentifier( identifier);
    setEndpoint(DataParsingHelper.parseNestedObject(response, "data.data"));
  };

  return ({
    endpoint: endpoint,
    setEndpoint: setEndpoint,
    loadData: () => loadData(getExternalApiIntegratorEndpointById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
