import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useExternalApiIntegratorEndpointActions from "hooks/tools/external_api_integrator/endpoints/useExternalApiIntegratorEndpointActions";

export default function useGetExternalApiIntegratorEndpoints(
  toolId,
  handleErrorFunction,
) {
  const [endpoints, setEndpoints] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const externalApiIntegratorEndpointsActions = useExternalApiIntegratorEndpointActions();

  useEffect(() => {
    setEndpoints([]);

    if (
      DataParsingHelper.isMongoDbId(toolId) === true &&
      loadData
    ) {
      loadData(getExternalApiIntegratorEndpoints, handleErrorFunction).catch(() => {});
    }
  }, [toolId]);

  const getExternalApiIntegratorEndpoints = async () => {
    if (DataParsingHelper.isMongoDbId(toolId) !== true) {
      return;
    }

    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpoints(
      toolId,
    );
    setEndpoints(DataParsingHelper.parseNestedArray(response, "data.data"));
  };

  return ({
    endpoints: endpoints,
    setEndpoints: setEndpoints,
    loadData: () => loadData(getExternalApiIntegratorEndpoints, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
