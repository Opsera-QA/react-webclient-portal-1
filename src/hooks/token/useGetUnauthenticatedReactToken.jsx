import {useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useAuthenticationActions from "hooks/token/useAuthenticationActions";
import routeTokenConstants from "@opsera/definitions/constants/routes/tokens/routeToken.constants";

export default function useGetUnauthenticatedReactToken(
  id = routeTokenConstants.UNAUTHENTICATED_ROUTE_MIDDLEWARE_TOKEN_KEYS.GENERIC_KEY,
  handleErrorFunction,
) {
  const [reactToken, setReactToken] = useState(undefined);
  const authenticationActions = useAuthenticationActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setReactToken(undefined);
    loadData(getReactToken, handleErrorFunction).catch(() => {
    });
  }, [id]);

  const getReactToken = async () => {
    setReactToken(undefined);

    const response = await authenticationActions.getReactAuthenticationToken();
    const temporaryToken = DataParsingHelper.parseNestedString(response, "data.data");

    if (temporaryToken) {
      setReactToken({...temporaryToken});
    }
  };

  return ({
    reactToken: reactToken,
    setReactToken: setReactToken,
    loadData: () => loadData(getReactToken, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
