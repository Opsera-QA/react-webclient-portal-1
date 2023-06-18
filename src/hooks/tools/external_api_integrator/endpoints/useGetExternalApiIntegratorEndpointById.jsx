import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useToolIdentifierActions from "hooks/tool_identifiers/useToolIdentifierActions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useExternalApiIntegratorEndpointActions
  from "hooks/tools/external_api_integrator/endpoints/useExternalApiIntegratorEndpointActions";

export default function useGetExternalApiIntegratorEndpointById(
  toolId,
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
  const externalApiIntegratorEndpointsActions = useExternalApiIntegratorEndpointActions();

  useEffect(() => {
    setEndpoint(undefined);

    if (
      DataParsingHelper.isMongoDbId(endpointId) === true &&
      DataParsingHelper.isMongoDbId(toolId) === true &&
      loadData
    ) {
      loadData(getExternalApiIntegratorEndpointById, handleErrorFunction).catch(() => {});
    }
  }, [toolId, endpointId]);

  const getExternalApiIntegratorEndpointById = async () => {
    if (
      DataParsingHelper.isMongoDbId(endpointId) !== true ||
      DataParsingHelper.isMongoDbId(toolId) !== true
    ) {
      return;
    }

    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointById(
      toolId,
      endpointId,
    );
    const newEndpoint = DataParsingHelper.parseNestedObject(response, "data.data");
    setEndpoint(newEndpoint);
  };

  return ({
    endpoint: endpoint,
    setEndpoint: setEndpoint,
    queryParameterFields: DataParsingHelper.parseNestedArray(endpoint, "queryParameterFields", []),
    requestBodyFields: DataParsingHelper.parseNestedArray(endpoint, "requestBodyFields", []),
    responseBodyFields: DataParsingHelper.parseNestedArray(endpoint, "responseBodyFields", []),
    loadData: () => loadData(getExternalApiIntegratorEndpointById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
