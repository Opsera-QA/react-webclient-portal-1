import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useAuthenticationActions from "hooks/token/useAuthenticationActions";
import {decodeToken, isExpired} from "react-jwt";

export default function useApiTokenHandlerActions() {
  const authenticationActions = useAuthenticationActions();
  const apiTokenHandlerActions = {};

  apiTokenHandlerActions.generateApiCallToken = async (id) => {
    const response = await authenticationActions.getReactAuthenticationToken(id);
    return DataParsingHelper.parseNestedString(response, "data.data");
  };

  apiTokenHandlerActions.decodeToken = (token) => {
    return decodeToken(token);
  };

  apiTokenHandlerActions.isTokenExpired = (token) => {
    return isExpired(token);
  };
  
  return apiTokenHandlerActions;
}
